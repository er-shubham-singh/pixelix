import ChatbotConfig from '../models/ChatbotConfigModel.js';
import { ENV } from '../config/env.js';

// Fallback canned responses if knowledge base match doesn't hit
const GENERAL_FALLBACK_REPLY = `Thank you for reaching out to Pixelix! We specialize in High-Performance Web Architecture, 3D Real Estate Virtual Tours & Architectural Walkthroughs, Meta & Google Real Estate Lead Generation, and House Construction Cost Estimation.

Would you like to connect directly with our strategic team on WhatsApp or calculate an approximate project quote?`;

/**
 * @desc Get Chatbot Configuration & Quick Suggested Questions
 * @route GET /api/chatbot/config
 * @access Public
 */
export async function getChatbotConfig(req, res) {
  try {
    let config = await ChatbotConfig.findOne({ isActive: true });
    if (!config) {
      config = await ChatbotConfig.findOne();
    }
    const safeConfig = {
      botName: config?.botName || 'Pixelix AI Advisor',
      welcomeMessage:
        config?.welcomeMessage ||
        'Namaste! Welcome to Pixelix Creative & Digital Systems. How can I assist your business or property vision today?',
      whatsappNumber: config?.whatsappNumber || ENV.WHATSAPP_DEFAULT_NUMBER || '919876543210',
      whatsappDefaultMessage:
        config?.whatsappDefaultMessage ||
        'Hello Pixelix! I visited your website and would like to discuss a project with your team.',
      serviceSpecificMessages: config?.serviceSpecificMessages || {},
      suggestedQuestions: (config?.knowledgeBase || [])
        .filter((k) => k.category && k.question)
        .slice(0, 6)
        .map((k) => k.question),
      provider: config?.aiProvider || ENV.AI_PROVIDER || 'fallback',
    };
    return res.json({ success: true, config: safeConfig });
  } catch (error) {
    console.error('Fetch chatbot config error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Handle Incoming Chat Message (AI or FAQ Match)
 * @route POST /api/chatbot/message
 * @access Public
 */
export async function handleChatMessage(req, res) {
  try {
    const { message, history = [], currentService } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const trimmedMsg = message.trim().toLowerCase();
    const config = await ChatbotConfig.findOne({ isActive: true });
    const kb = config?.knowledgeBase || [];

    // 1. Check Knowledge Base for keyword / question matches
    let matchedKb = null;
    let maxMatchScore = 0;

    for (const item of kb) {
      let score = 0;
      const qLower = (item.question || '').toLowerCase();
      if (qLower === trimmedMsg) score += 10;
      else if (qLower.includes(trimmedMsg) || trimmedMsg.includes(qLower)) score += 6;

      if (item.keywords && Array.isArray(item.keywords)) {
        for (const kw of item.keywords) {
          const kwLower = kw.toLowerCase();
          if (trimmedMsg.includes(kwLower)) score += 3;
        }
      }
      if (score > maxMatchScore) {
        maxMatchScore = score;
        matchedKb = item;
      }
    }

    if (matchedKb && maxMatchScore >= 3) {
      return res.json({
        success: true,
        reply: matchedKb.answer,
        source: 'knowledge_base',
        action: matchedKb.action || null,
        whatsappHandoff: matchedKb.action === 'whatsapp' || maxMatchScore >= 6,
        whatsappNumber: config?.whatsappNumber || ENV.WHATSAPP_DEFAULT_NUMBER || '919876543210',
      });
    }

    // 2. Try Gemini API if API key configured
    if (ENV.GEMINI_API_KEY) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${ENV.GEMINI_API_KEY}`;
        const promptSystem = `You are the polite, authoritative, and concise AI Customer Assistant for "Pixelix Creative & Digital Systems" (Pixelix), a premier Indian agency specializing in:
1. Real Estate Construction Cost & Material Calculator (house estimation, bricks, cement, steel, labour).
2. 3D Virtual Property Tours, 360-degree Walkthroughs, and Architectural Visualizations.
3. High-ROI Digital Advertising (Meta / Instagram Lead Ads, Google Search/Display Ads, Real Estate Lead Generation).
4. Full-Stack Web Development, Three.js 3D Interactive Web Experiences, and E-Commerce Catalogs.

Be helpful, professional, and friendly. Answer in 2-3 clear sentences. If the user wants a quotation or customized deal, recommend connecting directly on WhatsApp.`;

        const geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${promptSystem}\n\nUser Question: ${message}` }],
              },
            ],
          }),
        });

        if (geminiRes.ok) {
          const gData = await geminiRes.json();
          const replyText = gData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return res.json({
              success: true,
              reply: replyText.trim(),
              source: 'gemini_ai',
              whatsappHandoff: true,
              whatsappNumber: config?.whatsappNumber || ENV.WHATSAPP_DEFAULT_NUMBER,
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini AI fallback triggered:', geminiErr.message);
      }
    }

    // 3. Fallback Reply
    return res.json({
      success: true,
      reply: GENERAL_FALLBACK_REPLY,
      source: 'fallback',
      whatsappHandoff: true,
      whatsappNumber: config?.whatsappNumber || ENV.WHATSAPP_DEFAULT_NUMBER || '919876543210',
    });
  } catch (error) {
    console.error('Chatbot handler error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Update Chatbot Configuration & Knowledge Base (Owner only)
 * @route PUT /api/chatbot/config
 * @access Private (Owner)
 */
export async function updateChatbotConfig(req, res) {
  try {
    let config = await ChatbotConfig.findOne();
    if (!config) {
      config = new ChatbotConfig(req.body);
    } else {
      Object.assign(config, req.body);
      config.updatedAt = new Date();
    }
    await config.save();
    return res.json({ success: true, message: 'Chatbot configuration saved', config });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

