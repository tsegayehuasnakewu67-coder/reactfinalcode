
const router = require('express').Router();
const {
  markAttendance, checkOutAttendance, getKioskStatus,
  getCompanyAttendance, getMyAttendance, getDashboard, getMyStats,
  getAnalytics,
} = require('../controllers/attendanceController');
const { protect, hrOrAdmin, employeeOrAdmin } = require('../middleware/authMiddleware');

// Public — kiosk (no auth required)
router.get('/kiosk-status', getKioskStatus);
router.post('/mark',        markAttendance);
router.post('/checkout',    checkOutAttendance);

router.use(protect);

router.get('/dashboard',  hrOrAdmin,       getDashboard);
router.get('/analytics',  hrOrAdmin,       getAnalytics);
router.get('/my/stats',   employeeOrAdmin, getMyStats);
router.get('/my',         employeeOrAdmin, getMyAttendance);
router.get('/',           hrOrAdmin,       getCompanyAttendance);

module.exports = router;
