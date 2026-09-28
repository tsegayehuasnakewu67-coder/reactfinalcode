const router = require('express').Router();
const {
  getAllUsers, getUserById, updateUser, deleteUser, updateFace, getDepartments,
} = require('../controllers/userController');
const { protect, adminOnly, hrOrAdmin, employeeOrAdmin } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/',                hrOrAdmin,       getAllUsers);
router.get('/departments',     hrOrAdmin,       getDepartments);
router.get('/:id',             employeeOrAdmin, getUserById);
router.put('/:id',             hrOrAdmin,       updateUser);
router.delete('/:id',          hrOrAdmin,       deleteUser);
router.patch('/:id/face',      adminOnly,       updateFace);

module.exports = router;
