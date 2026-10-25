const Hotel = require('../models/Hotel');
const RoomCategory = require('../models/RoomCategory');

// @desc    Get Hotel Information
// @route   GET /api/hotel
// @access  Public
const getHotelInfo = async (req, res, next) => {
  try {
    let hotel = await Hotel.findOne();
    if (!hotel) {
      hotel = await Hotel.create({
        name: 'HotelPro Grand Palace',
        tagline: 'World-Class Hospitality & Modern Comfort',
        description: 'Experience premier hospitality with refined guest suites, 24/7 personalized concierge, exquisite dining, and world-class spa facilities.',
        address: {
          street: '100 Marina Boulevard, Connaught Place',
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
          zipCode: '110001',
        },
        phone: '+91 98765 43210',
        email: 'reservations@hotelpro.com',
      });
    }
    res.json({ success: true, hotel });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Hotel Information
// @route   PUT /api/hotel
// @access  Private (Admin only)
const updateHotelInfo = async (req, res, next) => {
  try {
    let hotel = await Hotel.findOne();
    if (!hotel) {
      hotel = new Hotel(req.body);
    } else {
      Object.assign(hotel, req.body);
    }
    const updatedHotel = await hotel.save();
    res.json({ success: true, hotel: updatedHotel });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all room categories
// @route   GET /api/hotel/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categories = await RoomCategory.find().sort({ basePrice: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Create room category
// @route   POST /api/hotel/categories
// @access  Private (Admin only)
const createCategory = async (req, res, next) => {
  try {
    const category = await RoomCategory.create(req.body);
    res.status(201).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHotelInfo,
  updateHotelInfo,
  getCategories,
  createCategory,
};
