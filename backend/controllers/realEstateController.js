import ConstructionConfig from '../models/ConstructionConfigModel.js';
import PropertyShowcase from '../models/PropertyShowcaseModel.js';

// Default fallback configuration if DB has not been seeded yet
const DEFAULT_CONSTRUCTION_CONFIG = {
  coveragePercentDefault: 70,
  contingencyPercent: 5,
  consumptionFactors: {
    bricksPerSqFt: 8,
    cementBagsPerSqFt: 0.4,
    steelKgPerSqFt: 3.5,
  },
  materialRates: {
    brickRatePerUnit: 9,
    cementRatePerBag: 380,
    steelRatePerKg: 72,
  },
  qualityTiers: {
    basic: {
      name: 'Basic / Economy',
      ratePerSqFt: 1350,
      materialMultiplier: 0.88,
      labourPerSqFt: 320,
      otherExpensesPerSqFt: 250,
      description: 'Standard red bricks, OPC 43 grade cement, Fe 415 TMT steel, basic ceramic tiles and fittings.',
    },
    standard: {
      name: 'Standard / Recommended',
      ratePerSqFt: 1750,
      materialMultiplier: 1.0,
      labourPerSqFt: 400,
      otherExpensesPerSqFt: 350,
      description: 'High-density clay/fly-ash bricks, PPC cement, Fe 500 TMT steel, vitrified tiles, branded fittings.',
    },
    premium: {
      name: 'Premium / Luxury',
      ratePerSqFt: 2450,
      materialMultiplier: 1.25,
      labourPerSqFt: 550,
      otherExpensesPerSqFt: 520,
      description: 'AAC blocks / machine bricks, premium PPC/OPC, Fe 550D TMT, Italian marble/granite, smart electricals.',
    },
  },
  disclaimerText:
    'These calculations are approximate estimates based on configurable material rates and construction assumptions. Actual costs may vary depending on location, design, structural requirements, material quality, and labour charges. Contact our team for a detailed quotation.',
  isActive: true,
};

/**
 * @desc Get Active Construction Calculator Configuration
 * @route GET /api/real-estate/calculator/config
 * @access Public
 */
export async function getCalculatorConfig(req, res) {
  try {
    let config = await ConstructionConfig.findOne({ isActive: true });
    if (!config) {
      config = await ConstructionConfig.create(DEFAULT_CONSTRUCTION_CONFIG);
    }
    return res.json({ success: true, config });
  } catch (error) {
    console.error('Error fetching calculator config:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch calculation configuration',
      fallback: DEFAULT_CONSTRUCTION_CONFIG,
    });
  }
}

/**
 * @desc Compute Exact Construction & Material Cost Estimate
 * @route POST /api/real-estate/calculator/calculate
 * @access Public
 */
export async function calculateEstimate(req, res) {
  try {
    const {
      plotArea,
      unit = 'sq_ft', // 'sq_ft' | 'sq_yd'
      coveragePercent,
      floors = 1,
      quality = 'standard', // 'basic' | 'standard' | 'premium'
      customBuiltUpArea,
    } = req.body;

    const parsedPlot = parseFloat(plotArea);
    if (!parsedPlot || parsedPlot <= 0) {
      return res.status(400).json({ success: false, message: 'Please provide a valid plot area greater than 0.' });
    }

    let config = await ConstructionConfig.findOne({ isActive: true });
    if (!config) config = DEFAULT_CONSTRUCTION_CONFIG;

    // Unit conversion: 1 Square Yard = 9 Square Feet
    const plotAreaSqFt = unit === 'sq_yd' ? parsedPlot * 9 : parsedPlot;
    const effectiveCoverage = parseFloat(coveragePercent) || config.coveragePercentDefault || 70;
    const effectiveFloors = Math.max(1, parseInt(floors, 10) || 1);

    // Built-up Area = Plot Area (sq ft) * Coverage Percentage * Number of Floors
    let builtUpArea = customBuiltUpArea
      ? parseFloat(customBuiltUpArea)
      : Math.round(plotAreaSqFt * (effectiveCoverage / 100) * effectiveFloors);

    if (builtUpArea <= 0) builtUpArea = Math.round(plotAreaSqFt * 0.7);

    // Selected quality settings
    const tier = config.qualityTiers[quality] || config.qualityTiers.standard;
    const multiplier = tier.materialMultiplier || 1.0;

    // Consumption factors
    const { bricksPerSqFt, cementBagsPerSqFt, steelKgPerSqFt } = config.consumptionFactors;
    const { brickRatePerUnit, cementRatePerBag, steelRatePerKg } = config.materialRates;

    // Material Quantities
    const estimatedBricks = Math.round(builtUpArea * bricksPerSqFt * multiplier);
    const estimatedCementBags = Math.round(builtUpArea * cementBagsPerSqFt * multiplier);
    const estimatedSteelKg = Math.round(builtUpArea * steelKgPerSqFt * multiplier);

    // Component Costs
    const brickCost = Math.round(estimatedBricks * brickRatePerUnit);
    const cementCost = Math.round(estimatedCementBags * cementRatePerBag);
    const steelCost = Math.round(estimatedSteelKg * steelRatePerKg);
    const totalMaterialCost = brickCost + cementCost + steelCost;

    // Labour and Other Costs
    const labourCost = Math.round(builtUpArea * (tier.labourPerSqFt || 400));
    const otherExpenses = Math.round(builtUpArea * (tier.otherExpensesPerSqFt || 350));

    // Subtotal before contingency
    const subtotal = totalMaterialCost + labourCost + otherExpenses;
    const contingencyPercent = config.contingencyPercent || 5;
    const contingencyAmount = Math.round(subtotal * (contingencyPercent / 100));

    const totalEstimatedCost = subtotal + contingencyAmount;
    const costPerSqFt = Math.round(totalEstimatedCost / builtUpArea);

    return res.json({
      success: true,
      inputs: {
        rawPlotArea: parsedPlot,
        unit,
        plotAreaSqFt,
        coveragePercent: effectiveCoverage,
        floors: effectiveFloors,
        quality,
        qualityName: tier.name,
      },
      results: {
        builtUpArea,
        costPerSqFt,
        totalEstimatedCost,
        contingencyAmount,
        contingencyPercent,
        materials: {
          bricks: {
            quantity: estimatedBricks,
            unit: 'pieces',
            ratePerUnit: brickRatePerUnit,
            cost: brickCost,
          },
          cement: {
            quantity: estimatedCementBags,
            unit: 'bags (50kg)',
            ratePerBag: cementRatePerBag,
            cost: cementCost,
          },
          steel: {
            quantity: estimatedSteelKg,
            unit: 'kg',
            ratePerKg: steelRatePerKg,
            cost: steelCost,
          },
          totalMaterialCost,
        },
        labourCost,
        otherExpenses,
      },
      disclaimer: config.disclaimerText,
    });
  } catch (error) {
    console.error('Calculate estimate error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Update Construction Calculator Configuration (Owner only)
 * @route PUT /api/real-estate/calculator/config
 * @access Private (Owner)
 */
export async function updateCalculatorConfig(req, res) {
  try {
    let config = await ConstructionConfig.findOne();
    if (!config) {
      config = new ConstructionConfig(req.body);
    } else {
      Object.assign(config, req.body);
      config.updatedAt = new Date();
    }
    await config.save();
    return res.json({ success: true, message: 'Calculator rates updated successfully', config });
  } catch (error) {
    console.error('Update calculator config error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Get All Published 3D Property Showcases & Virtual Tours
 * @route GET /api/real-estate/showcases
 * @access Public
 */
export async function getShowcases(req, res) {
  try {
    const { category, featured } = req.query;
    const query = { isPublished: true };
    if (category && category !== 'all') query.category = category;
    if (featured === 'true') query.isFeatured = true;

    const showcases = await PropertyShowcase.find(query).sort({ isFeatured: -1, order: 1, createdAt: -1 });
    return res.json({ success: true, count: showcases.length, showcases });
  } catch (error) {
    console.error('Fetch showcases error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Get Showcase By Slug / ID
 * @route GET /api/real-estate/showcases/:id
 * @access Public
 */
export async function getShowcaseById(req, res) {
  try {
    const showcase = await PropertyShowcase.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
    });
    if (!showcase) {
      return res.status(404).json({ success: false, message: 'Showcase not found' });
    }
    return res.json({ success: true, showcase });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Create 3D Property Showcase (Owner only)
 * @route POST /api/real-estate/showcases
 * @access Private (Owner)
 */
export async function createShowcase(req, res) {
  try {
    const showcase = await PropertyShowcase.create(req.body);
    return res.status(201).json({ success: true, message: 'Showcase created', showcase });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Update 3D Property Showcase (Owner only)
 * @route PUT /api/real-estate/showcases/:id
 * @access Private (Owner)
 */
export async function updateShowcase(req, res) {
  try {
    const showcase = await PropertyShowcase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!showcase) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, message: 'Showcase updated', showcase });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Delete 3D Property Showcase (Owner only)
 * @route DELETE /api/real-estate/showcases/:id
 * @access Private (Owner)
 */
export async function deleteShowcase(req, res) {
  try {
    await PropertyShowcase.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Showcase deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

