const express = require('express');
const router = express.Router();
const {
  getHotelInfo,
  updateHotelInfo,
  getCategories,
  createCategory,
} = require('../controllers/hotelController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getHotelInfo);
router.put('/', protect, authorize('admin'), updateHotelInfo);

router.get('/categories', getCategories);
router.post('/categories', protect, authorize('admin'), createCategory);

module.exports = router;
