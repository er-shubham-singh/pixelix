import AdvertisingService from '../models/AdvertisingServiceModel.js';

/**
 * @desc Get Active Advertising Services & Packages
 * @route GET /api/advertising/services
 * @access Public
 */
export async function getAdvertisingServices(req, res) {
  try {
    const services = await AdvertisingService.find({ isActive: true }).sort({ order: 1 });
    return res.json({ success: true, count: services.length, services });
  } catch (error) {
    console.error('Fetch advertising services error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Get Advertising Service By Slug / ID
 * @route GET /api/advertising/services/:id
 * @access Public
 */
export async function getAdvertisingServiceById(req, res) {
  try {
    const service = await AdvertisingService.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
    });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Advertising service not found' });
    }
    return res.json({ success: true, service });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Create Advertising Service (Owner only)
 * @route POST /api/advertising/services
 * @access Private (Owner)
 */
export async function createAdvertisingService(req, res) {
  try {
    const service = await AdvertisingService.create(req.body);
    return res.status(201).json({ success: true, message: 'Advertising service created', service });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Update Advertising Service (Owner only)
 * @route PUT /api/advertising/services/:id
 * @access Private (Owner)
 */
export async function updateAdvertisingService(req, res) {
  try {
    const service = await AdvertisingService.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, message: 'Advertising service updated', service });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * @desc Delete Advertising Service (Owner only)
 * @route DELETE /api/advertising/services/:id
 * @access Private (Owner)
 */
export async function deleteAdvertisingService(req, res) {
  try {
    await AdvertisingService.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Advertising service removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

