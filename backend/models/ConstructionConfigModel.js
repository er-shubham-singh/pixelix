import mongoose from 'mongoose';

const constructionConfigSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: true
  },
  disclaimer: {
    type: String,
    default: 'These calculations are approximate estimates based on configurable material rates and construction assumptions. Actual costs may vary depending on location, design, structural requirements, material quality, and labour charges. Contact our team for a detailed quotation.'
  },
  coverageDefaultPercent: {
    type: Number,
    default: 70,
    min: 10,
    max: 100
  },
  contingencyPercentage: {
    type: Number,
    default: 5,
    min: 0,
    max: 30
  },
  consumptionFactors: {
    bricksPerSqFt: { type: Number, default: 19 },
    cementBagsPerSqFt: { type: Number, default: 0.42 },
    steelKgPerSqFt: { type: Number, default: 3.8 },
    sandCftPerSqFt: { type: Number, default: 1.8 },
    aggregateCftPerSqFt: { type: Number, default: 1.35 }
  },
  rates: {
    basic: {
      name: { type: String, default: 'Basic Standard' },
      description: { type: String, default: 'Standard red brick, grade 43 cement, Fe-500 steel, local sand, vitrified tiles, standard electrical/plumbing fittings.' },
      brickRate: { type: Number, default: 8.5 }, // ₹ per brick
      cementRate: { type: Number, default: 380 }, // ₹ per bag (50kg)
      steelRate: { type: Number, default: 68 }, // ₹ per kg
      labourRatePerSqFt: { type: Number, default: 320 }, // ₹ per sq ft
      otherExpensesPerSqFt: { type: Number, default: 180 }, // ₹ per sq ft (finishes, electrical, plumbing)
      estimatedRatePerSqFt: { type: Number, default: 1450 }
    },
    standard: {
      name: { type: String, default: 'Premium Standard' },
      description: { type: String, default: 'First-class fly ash / red bricks, branded grade 53 cement, Fe-550D TMT steel, river sand, designer porcelain tiles, concealed CPVC & branded brass fittings.' },
      brickRate: { type: Number, default: 10.5 },
      cementRate: { type: Number, default: 430 },
      steelRate: { type: Number, default: 76 },
      labourRatePerSqFt: { type: Number, default: 410 },
      otherExpensesPerSqFt: { type: Number, default: 280 },
      estimatedRatePerSqFt: { type: Number, default: 1950 }
    },
    premium: {
      name: { type: String, default: 'Luxury Architectural' },
      description: { type: String, default: 'AAC lightweight blocks / high-strength bricks, UltraTech/ACC Super cement, Tata Tiscon Fe-550D steel, Italian marble/granite finishes, premium modular electrics, branded bath fittings (Kohler/Jaquar).' },
      brickRate: { type: Number, default: 13.0 },
      cementRate: { type: Number, default: 490 },
      steelRate: { type: Number, default: 86 },
      labourRatePerSqFt: { type: Number, default: 550 },
      otherExpensesPerSqFt: { type: Number, default: 460 },
      estimatedRatePerSqFt: { type: Number, default: 2750 }
    }
  },
  lastUpdatedBy: {
    type: String,
    default: 'Admin'
  }
}, {
  timestamps: true
});

export const ConstructionConfig = mongoose.model('ConstructionConfig', constructionConfigSchema);
export default ConstructionConfig;

