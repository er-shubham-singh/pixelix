import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { ENV } from '../config/env.js';

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, ENV.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, ENV.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User account not found' });
      }
      if (req.user.status === 'inactive') {
        return res.status(403).json({ success: false, message: 'Account is deactivated. Contact management.' });
      }
      return next();
    } catch (error) {
      console.error('Auth verification error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, invalid or expired token' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

export const ownerOnly = (req, res, next) => {
  if (req.user && req.user.role === 'owner') {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Access denied: Requires company Owner privileges'
  });
};

export const employeeOrOwner = (req, res, next) => {
  if (req.user && (req.user.role === 'employee' || req.user.role === 'owner')) {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Access denied: Unauthorized role'
  });
};

