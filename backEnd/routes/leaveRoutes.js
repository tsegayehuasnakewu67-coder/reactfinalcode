const router = require('express').Router();
const { listLeaves, createLeave, reviewLeave } = require('../controllers/leaveController');
const { protect, hrOrAdmin } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', listLeaves);
router.post('/', createLeave);
router.patch('/:id/review', hrOrAdmin, reviewLeave);

module.exports = router;
