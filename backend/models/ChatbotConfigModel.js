import mongoose from 'mongoose';

const chatbotConfigSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: true
  },
  botName: {
    type: String,
    default: 'Pixelix AI Assistant'
  },
  welcomeMessage: {
    type: String,
    default: 'Hello! Welcome to Pixelix. I can help you estimate construction costs, explore 3D virtual property tours, launch high-ROI digital ad campaigns, or connect with our founders.'
  },
  whatsappNumber: {
    type: String,
    default: '917056063863'
  },
  whatsappMessages: {
    calculator: {
      type: String,
      default: 'Hello Pixelix Team, I just calculated a construction estimate on your website and would like a detailed architectural quotation.'
    },
    virtual_tours: {
      type: String,
      default: 'Hello Pixelix Team, I am interested in creating interactive 3D Virtual Property Walkthroughs for my real estate project.'
    },
    digital_advertising: {
      type: String,
      default: 'Hello Pixelix Team, I want to discuss Digital Advertising and Real Estate Lead Generation campaigns for my business.'
    },
    lead_generation: {
      type: String,
      default: 'Hello Pixelix Team, I want to generate verified buyer inquiries for my real estate/business projects.'
    },
    general: {
      type: String,
      default: 'Hello Pixelix Team, I reviewed your website and would like to speak directly with the founders.'
    }
  },
  suggestedQuestions: [{
    type: String
  }],
  faqs: [{
    topic: { type: String, default: 'General' },
    keywords: [String],
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  aiProvider: {
    type: String,
    enum: ['none', 'gemini', 'openai', 'custom'],
    default: 'none'
  },
  aiModel: {
    type: String,
    default: 'gemini-1.5-flash'
  },
  systemPrompt: {
    type: String,
    default: 'You are the official AI Assistant for Pixelix (pixelix.co.in), a leading creative agency and growth systems company in India founded by Vikas Chauhan and Shubham Singh. You guide visitors on Website & App Dev, Real Estate Construction Cost Calculator, 3D Virtual Property Tours, Digital Marketing & Lead Generation. Be polite, professional, concise, and encourage visitors to submit their details or connect with founders on WhatsApp.'
  },
  enableLeadCapture: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const ChatbotConfig = mongoose.model('ChatbotConfig', chatbotConfigSchema);
export default ChatbotConfig;

