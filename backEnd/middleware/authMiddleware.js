const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'smart-attendance-dev-secret-change-me';

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user    = await User.findById(decoded.id);
    if (!user)          return res.status(401).json({ success: false, message: 'User no longer exists.' });
    if (!user.isActive) return res.status(401).json({ success: false, message: 'Account deactivated.' });
    req.user = user;
    next();
  } catch (err) {
    const msg = err.name === 'TokenExpiredError' ? 'Session expired.' : 'Invalid token.';
    return res.status(401).json({ success: false, message: msg });
  }
};

const hasAnyRole = (user, allowedRoles = []) => !!user && allowedRoles.includes(user.role);

const requireRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !hasAnyRole(req.user, allowedRoles)) {
    const rolesText = allowedRoles.length > 1 ? allowedRoles.join(' / ') : allowedRoles[0];
    return res.status(403).json({ success: false, message: `${rolesText} access required.` });
  }
  return next();
};

const adminOnly = requireRole('admin');
const hrOrAdmin = requireRole('admin', 'hr');
const employeeOrAdmin = requireRole('admin', 'hr', 'employee');

module.exports = { protect, adminOnly, hrOrAdmin, employeeOrAdmin, requireRole, hasAnyRole };
