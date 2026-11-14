import ChatbotConfig from '../models/ChatbotConfigModel.js';
import { ENV } from '../config/env.js';

// Fallback canned responses if knowledge base match doesn't hit
const GENERAL_FALLBACK_REPLY = `Thank you for reaching out to CoreCodeX! We specialize in Full-Stack Web Development, E-Commerce Stores, Marketplace Product Listings (Amazon, Flipkart, Meesho), 3D Interactive Web Experiences, and High-ROI Digital Advertising.

Would you like to connect directly with Founders Sahil Prasad (+91 6354729042 · Vadodara) or Shubham Singh (+91 9559506650 · Haridwar) on WhatsApp to discuss your project?`;

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
      botName: config?.botName || 'CoreCodeX AI Advisor',
      welcomeMessage:
        config?.welcomeMessage ||
        'Namaste! Welcome to CoreCodeX. How can I assist your business with web development, marketplace listings, or digital growth today?',
      whatsappNumber: config?.whatsappNumber || ENV.WHATSAPP_DEFAULT_NUMBER || '916354729042',
      whatsappDefaultMessage:
        config?.whatsappDefaultMessage ||
        'Hello CoreCodeX! I visited your website and would like to discuss a project with Sahil Prasad & Shubham Singh.',
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
        const promptSystem = `You are the polite, authoritative, and concise AI Customer Assistant for "CoreCodeX", a premier Indian digital & tech agency founded by two friends, Sahil Prasad (+91 6354729042, Vadodara, Gujarat) and Shubham Singh (+91 9559506650, Haridwar, Uttarakhand) specializing in:
1. Full-Stack Web Development, Landing Pages (₹4,000), and E-Commerce Stores with Admin Panels (₹15,000).
2. Marketplace Product Listings & Operations for Amazon, Flipkart, Meesho (₹4,000).
3. Monthly Social Media Handling, Creatives & Ad Campaigns (₹4,000).
4. 3D Interactive Web Experiences & Virtual Walkthroughs.
5. 24/7 AI WhatsApp / Web Chatbots & Brand Identity Design.

Be helpful, professional, and friendly. Answer in 2-3 clear sentences. Always emphasize affordable Indian SMB pricing with superior quality. If the user wants a quotation or customized deal, recommend connecting directly with founders Sahil Prasad (+91 6354729042) or Shubham Singh (+91 9559506650) on WhatsApp.`;

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

