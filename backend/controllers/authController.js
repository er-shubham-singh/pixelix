import User from '../models/UserModel.js';
import { generateToken } from '../middleware/authMiddleware.js';

/**
 * @desc   Authenticate User (Owner or Employee) & Get Token
 * @route  POST /api/auth/login
 * @access Public
 */
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    // Explicitly select password
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or credentials'
      });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({
        success: false,
        message: 'This account has been deactivated. Please contact company administration.'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    const token = generateToken(user._id);

    return res.json({
      success: true,
      message: `Welcome back, ${user.name}`,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        domain: user.domain,
        employeeId: user.employeeId,
        phone: user.phone,
        status: user.status,
        joinedDate: user.joinedDate
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: error.message
    });
  }
}

/**
 * @desc   Get Current Logged In User
 * @route  GET /api/auth/me
 * @access Private
 */
export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        domain: user.domain,
        employeeId: user.employeeId,
        phone: user.phone,
        status: user.status,
        joinedDate: user.joinedDate
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

