const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('../models/User');
const Hotel = require('../models/Hotel');
const RoomCategory = require('../models/RoomCategory');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const CheckInOut = require('../models/CheckInOut');
const ServiceRequest = require('../models/ServiceRequest');
const Review = require('../models/Review');
const Notification = require('../models/Notification');
const AdminLog = require('../models/AdminLog');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hotelpro');
    console.log('✅ Connected to MongoDB for Seeding');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    console.log('🧹 Clearing existing collections...');
    await User.deleteMany();
    await Hotel.deleteMany();
    await RoomCategory.deleteMany();
    await Room.deleteMany();
    await Booking.deleteMany();
    await Payment.deleteMany();
    await CheckInOut.deleteMany();
    await ServiceRequest.deleteMany();
    await Review.deleteMany();
    await Notification.deleteMany();
    await AdminLog.deleteMany();

    console.log('👤 Seeding Users with hashed credentials...');
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const staffPassword = await bcrypt.hash('staff123', salt);
    const guestPassword = await bcrypt.hash('guest123', salt);

    const users = await User.insertMany([
      {
        name: 'Alexander Wright (Admin)',
        email: 'admin@hotelpro.com',
        password: adminPassword,
        role: 'admin',
        phone: '+91 98111 22233',
        department: 'Executive Management',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Sarah Jenkins (Front Desk Staff)',
        email: 'staff@hotelpro.com',
        password: staffPassword,
        role: 'staff',
        phone: '+91 98222 33344',
        department: 'Front Desk & Operations',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Vikram Sharma (Guest)',
        email: 'guest@hotelpro.com',
        password: guestPassword,
        role: 'guest',
        phone: '+91 98333 44455',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Emily Watson (Guest)',
        email: 'emily@hotelpro.com',
        password: guestPassword,
        role: 'guest',
        phone: '+91 98444 55566',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
      },
    ]);

    const adminUser = users[0];
    const staffUser = users[1];
    const guestUser1 = users[2];
    const guestUser2 = users[3];

    console.log('🏨 Seeding Multi-Destination Hotel Properties...');
    const seededHotels = await Hotel.insertMany([
      {
        name: 'HotelPro Grand Palace',
        tagline: 'World-Class Hospitality, Redefined Luxury',
        description: 'Nestled in the heart of the capital, HotelPro Grand Palace combines contemporary architecture with timeless hospitality. Offering opulent suites, Michelin-star dining, tranquil wellness spas, and curated city experiences.',
        address: {
          street: '100 Marina Boulevard, Connaught Place',
          city: 'New Delhi',
          state: 'Delhi',
          country: 'India',
          zipCode: '110001',
        },
        phone: '+91 98765 43210',
        email: 'delhi@hotelpro.com',
        rating: 4.9,
        totalReviews: 48,
        amenities: [
          'Free High-Speed Wi-Fi',
          'Infinity Swimming Pool',
          'Spa & Wellness Center',
          '24/7 Room Service & Dining',
          'Multi-Cuisine Restaurant',
          'Free Valet Parking',
          'Airport Shuttle Service',
          'Executive Business Lounge',
        ],
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        ],
      },
      {
        name: 'HotelPro Oceanfront Palms',
        tagline: 'Tropical Luxury & Sun-Kissed Beaches',
        description: 'Set along the golden shores of Calangute, HotelPro Oceanfront Palms offers beachfront luxury with private cabanas, cliffside infinity pools, coastal seafood dining, and water sports excursions.',
        address: {
          street: '45 Candolim Beach Road',
          city: 'Goa',
          state: 'Goa',
          country: 'India',
          zipCode: '403515',
        },
        phone: '+91 98765 43211',
        email: 'goa@hotelpro.com',
        rating: 4.9,
        totalReviews: 62,
        amenities: [
          'Private Beach Access',
          'Infinity Sky Pool',
          'Beachside Cocktail Bar',
          'Ayurvedic Wellness Spa',
          'Seafood Gourmet Dining',
          'Water Sports Concierge',
          'High-Speed Wi-Fi',
        ],
        images: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
        ],
      },
      {
        name: 'HotelPro Royal Haveli & Spa',
        tagline: 'Timeless Royal Heritage & Rajput Grandeur',
        description: 'Step into princely luxury at HotelPro Royal Haveli. Featuring traditional jharokhas, courtyards with peacocks, royal thali dining under the stars, and soothing herbal spa therapies.',
        address: {
          street: '12 Amer Fort Road',
          city: 'Jaipur',
          state: 'Rajasthan',
          country: 'India',
          zipCode: '302002',
        },
        phone: '+91 98765 43212',
        email: 'jaipur@hotelpro.com',
        rating: 5.0,
        totalReviews: 85,
        amenities: [
          'Royal Courtyard & Gardens',
          'Herbal Ayurvedic Spa',
          'Folk Music & Live Dining',
          'Heated Pool',
          'Heritage Tour Concierge',
          'High-Speed Wi-Fi',
        ],
        images: [
          'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        ],
      },
      {
        name: 'HotelPro Business Bay Skyline',
        tagline: 'High-Altitude Luxury in Mumbai Financial Hub',
        description: 'Modern luxury overlooking the Arabian Sea and Mumbai skyline. Designed for global executives and leisure travelers seeking refined comfort in Bandra Kurla Complex.',
        address: {
          street: '88 BKC Avenue',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipCode: '400051',
        },
        phone: '+91 98765 43213',
        email: 'mumbai@hotelpro.com',
        rating: 4.8,
        totalReviews: 54,
        amenities: [
          'Executive Business Lounge',
          'Rooftop Panoramic Bar',
          '24/7 Fitness Center',
          'High-Speed Fiber Wi-Fi',
          'Valet Parking',
          'Airport Chauffeur',
        ],
        images: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        ],
      },
      {
        name: 'HotelPro Himalayan Alpine Retreat',
        tagline: 'Serene Pine Forests & Snow-Capped Peaks',
        description: 'Escape to the breathtaking Himalayan ranges. Wooden cedar suites, cozy stone fireplaces, warm cider lounges, and direct access to pristine pine trekking trails.',
        address: {
          street: 'Old Manali Pine Hill',
          city: 'Manali',
          state: 'Himachal Pradesh',
          country: 'India',
          zipCode: '175131',
        },
        phone: '+91 98765 43214',
        email: 'manali@hotelpro.com',
        rating: 4.9,
        totalReviews: 41,
        amenities: [
          'Mountain Peak Views',
          'Heated Rooms & Fireplaces',
          'Alpine Herbal Spa',
          'Hot Spring Jacuzzi',
          'Trekking Guide Service',
          'Organic Farm Dining',
        ],
        images: [
          'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
        ],
      },
    ]);

    const hotelDelhi = seededHotels[0];
    const hotelGoa = seededHotels[1];
    const hotelJaipur = seededHotels[2];
    const hotelMumbai = seededHotels[3];
    const hotelManali = seededHotels[4];
    const hotel = hotelDelhi;

    console.log('🏷️ Seeding Room Categories...');
    const categories = await RoomCategory.insertMany([
      {
        name: 'Standard',
        description: 'Cozy and well-appointed room suitable for solo travelers and short stays, equipped with modern conveniences.',
        basePrice: 2499,
        maxGuests: 2,
        bedType: 'Queen Bed',
        roomSizeSqFt: 280,
        features: ['Air Conditioning', 'High Speed Wi-Fi', 'Smart TV', 'Work Desk', 'Attached Bathroom'],
        coverImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Deluxe',
        description: 'Spacious and elegantly furnished room featuring scenic city views, premium bedding, and a marble bath.',
        basePrice: 4299,
        maxGuests: 2,
        bedType: 'King Bed',
        roomSizeSqFt: 400,
        features: ['City View', 'Mini Bar', 'Coffee Machine', '4K Smart TV', 'Luxury Bath Amenities', 'Complimentary Breakfast'],
        coverImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Executive Suite',
        description: 'Luxurious suite featuring a separate living room, dining area, walk-in closet, and panoramic skyline vistas.',
        basePrice: 7999,
        maxGuests: 3,
        bedType: 'King + Sofa Bed',
        roomSizeSqFt: 620,
        features: ['Panoramic Skyline View', 'Separate Living Room', 'Jacuzzi Tub', 'Executive Lounge Access', 'Express Check-In', 'Butler Service'],
        coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Presidential Suite',
        description: 'The pinnacle of luxury hospitality. Features private terrace, personal butler, private dining room, and bespoke interior design.',
        basePrice: 15999,
        maxGuests: 4,
        bedType: 'King Bed',
        roomSizeSqFt: 1100,
        features: ['Private Terrace', 'Personal Butler 24/7', 'Private Jacuzzi & Sauna', 'Bespoke Bar', 'Chauffeur Airport Pickup', 'Champagne on Arrival'],
        coverImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Family Suite',
        description: 'Thoughtfully designed multi-bed suite for family getaways with entertainment units and connecting rooms.',
        basePrice: 6499,
        maxGuests: 5,
        bedType: 'Twin Beds',
        roomSizeSqFt: 550,
        features: ['2 Queen Beds', 'Kids Entertainment Zone', 'Kitchenette & Microwave', 'Spacious Living Area', 'Balcony'],
        coverImage: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      },
    ]);

    const catStandard = categories[0];
    const catDeluxe = categories[1];
    const catExecutive = categories[2];
    const catPresidential = categories[3];
    const catFamily = categories[4];

    console.log('🛏️ Seeding Rooms...');
    const rooms = await Room.insertMany([
      {
        roomNumber: '101',
        title: 'Classic Standard Room',
        category: catStandard._id,
        hotel: hotel._id,
        pricePerNight: 2499,
        discountPercent: 10,
        capacity: 2,
        status: 'available',
        floor: 1,
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['High-Speed Wi-Fi', 'Air Conditioning', 'LED Smart TV', 'En-suite Bathroom', 'Work Desk'],
        description: 'A cozy sanctuary ideal for business travelers or solo explorers wanting convenience and peace in the city center.',
        rating: 4.7,
        numReviews: 12,
        isFeatured: false,
      },
      {
        roomNumber: '102',
        title: 'Cozy Standard Double',
        category: catStandard._id,
        hotel: hotel._id,
        pricePerNight: 2699,
        discountPercent: 0,
        capacity: 2,
        status: 'available',
        floor: 1,
        images: [
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['High-Speed Wi-Fi', 'Air Conditioning', 'Flat Screen TV', 'Coffee Maker', 'Safe Box'],
        description: 'Modern room on the first floor with easy lobby access and ergonomic furnishings.',
        rating: 4.6,
        numReviews: 8,
        isFeatured: false,
      },
      {
        roomNumber: '201',
        title: 'Deluxe City View Room',
        category: catDeluxe._id,
        hotel: hotel._id,
        pricePerNight: 4299,
        discountPercent: 15,
        capacity: 2,
        status: 'available',
        floor: 2,
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['City Skyline View', 'High-Speed Wi-Fi', 'Mini Refrigerator', 'Rain Shower', 'Complimentary Breakfast'],
        description: 'Refined deluxe bedroom on the 2nd floor with floor-to-ceiling glass windows overlooking the skyline.',
        rating: 4.9,
        numReviews: 24,
        isFeatured: true,
      },
      {
        roomNumber: '202',
        title: 'Deluxe Garden Suite',
        category: catDeluxe._id,
        hotel: hotel._id,
        pricePerNight: 4599,
        discountPercent: 5,
        capacity: 2,
        status: 'booked',
        floor: 2,
        images: [
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Garden View', 'Mini Bar', 'King Bed', 'Soundproof Windows', 'Bathrobes & Slippers'],
        description: 'Serene room facing lush botanical gardens, offering a tranquil retreat with luxurious amenities.',
        rating: 4.8,
        numReviews: 18,
        isFeatured: true,
      },
      {
        roomNumber: '301',
        title: 'Executive Royal Suite',
        category: catExecutive._id,
        hotel: hotel._id,
        pricePerNight: 7999,
        discountPercent: 10,
        capacity: 3,
        status: 'available',
        floor: 3,
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Separate Living Lounge', 'Jacuzzi Bath', 'Complimentary Wine & Snacks', '24/7 Butler Service', 'Executive Lounge Access'],
        description: 'Opulent suite with an expansive sitting lounge, private balcony, and state-of-the-art marble bathroom.',
        rating: 5.0,
        numReviews: 31,
        isFeatured: true,
      },
      {
        roomNumber: '302',
        title: 'Executive Horizon Suite',
        category: catExecutive._id,
        hotel: hotel._id,
        pricePerNight: 8499,
        discountPercent: 0,
        capacity: 3,
        status: 'cleaning',
        floor: 3,
        images: [
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Panoramic View', 'King Bed + Sofa', 'Private Bar', 'Espresso Machine', 'High-Speed Wi-Fi'],
        description: 'Designed for discerning travelers desiring elevated luxury and generous entertainment space.',
        rating: 4.9,
        numReviews: 14,
        isFeatured: false,
      },
      {
        roomNumber: '401',
        title: 'Grand Presidential Penthouse',
        category: catPresidential._id,
        hotel: hotel._id,
        pricePerNight: 15999,
        discountPercent: 20,
        capacity: 4,
        status: 'available',
        floor: 4,
        images: [
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Private Rooftop Terrace', 'Private Heated Pool', 'Private Chef on Demand', 'Chauffeur Service', 'Dedicated Butler'],
        description: 'The crown jewel of HotelPro. Ultra-luxurious penthouse offering unrivaled privacy, prestige, and custom bespoke experiences.',
        rating: 5.0,
        numReviews: 9,
        isFeatured: true,
      },
      {
        roomNumber: '402',
        title: 'Family Grand Comfort Suite',
        category: catFamily._id,
        hotel: hotelDelhi._id,
        pricePerNight: 6499,
        discountPercent: 12,
        capacity: 5,
        status: 'available',
        floor: 4,
        images: [
          'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['2 Queen Beds + Rollaway', 'Kid Play Station', 'Kitchenette', 'Dining Table for 6', 'Balcony'],
        description: 'Generously proportioned suite engineered specifically for memorable family stays and group vacations.',
        rating: 4.8,
        numReviews: 15,
        isFeatured: true,
      },
      // GOA ROOMS
      {
        roomNumber: 'GOA-101',
        title: 'Oceanfront Beach Cabana Suite',
        category: catDeluxe._id,
        hotel: hotelGoa._id,
        pricePerNight: 5499,
        discountPercent: 10,
        capacity: 2,
        status: 'available',
        floor: 1,
        images: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Private Beach Access', 'Infinity Sky Pool', 'Sea View Balcony', 'Outdoor Sun Loungers', 'Free Breakfast'],
        description: 'Wake up to the sound of crashing waves in Calangute Goa. Direct beachfront access and private sundeck.',
        rating: 4.9,
        numReviews: 29,
        isFeatured: true,
      },
      {
        roomNumber: 'GOA-201',
        title: 'Sunset Palm Executive Villa',
        category: catExecutive._id,
        hotel: hotelGoa._id,
        pricePerNight: 9499,
        discountPercent: 15,
        capacity: 3,
        status: 'available',
        floor: 2,
        images: [
          'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Infinity Sky Pool', 'Private Plunge Pool', 'Ayurvedic Wellness Spa', 'Cocktail Bar', 'Michelin Star Dining'],
        description: 'Exclusive beachfront villa with private plunge pool, panoramic sea view, and dedicated butler service.',
        rating: 5.0,
        numReviews: 34,
        isFeatured: true,
      },
      // JAIPUR ROOMS
      {
        roomNumber: 'JAI-101',
        title: 'Royal Rajput Heritage Suite',
        category: catDeluxe._id,
        hotel: hotelJaipur._id,
        pricePerNight: 4899,
        discountPercent: 10,
        capacity: 2,
        status: 'available',
        floor: 1,
        images: [
          'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Royal Courtyard View', 'Herbal Ayurvedic Spa', 'Traditional Jharokha', 'Heated Pool', 'King Bed'],
        description: 'Immerse in royal Pink City opulence with hand-painted archways, brass antique lanterns, and palace courtyard views.',
        rating: 4.9,
        numReviews: 42,
        isFeatured: true,
      },
      {
        roomNumber: 'JAI-301',
        title: 'Maharaja Royal Palace Penthouse',
        category: catPresidential._id,
        hotel: hotelJaipur._id,
        pricePerNight: 16999,
        discountPercent: 20,
        capacity: 4,
        status: 'available',
        floor: 3,
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Private Royal Terrace', 'Private Jacuzzi & Sauna', 'Folk Music & Live Dining', 'Chauffeur Heritage Tour'],
        description: 'Fit for kings. Experience bespoke regal treatment with private fortress view terrace and royal banquet dining.',
        rating: 5.0,
        numReviews: 19,
        isFeatured: true,
      },
      // MUMBAI ROOMS
      {
        roomNumber: 'BOM-201',
        title: 'BKC Business Bay Skyline Studio',
        category: catStandard._id,
        hotel: hotelMumbai._id,
        pricePerNight: 3999,
        discountPercent: 5,
        capacity: 2,
        status: 'available',
        floor: 2,
        images: [
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['High-Speed Fiber Wi-Fi', 'Executive Business Lounge', 'Smart TV', 'Ergonomic Workstation', 'Valet Parking'],
        description: 'Contemporary tech-enabled studio tailored for corporate travelers in Bandra Kurla Complex.',
        rating: 4.8,
        numReviews: 22,
        isFeatured: false,
      },
      {
        roomNumber: 'BOM-501',
        title: 'Arabian Sea Horizon Executive Suite',
        category: catExecutive._id,
        hotel: hotelMumbai._id,
        pricePerNight: 8999,
        discountPercent: 10,
        capacity: 3,
        status: 'available',
        floor: 5,
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Sea View', 'Executive Business Lounge', 'Rooftop Bar Access', 'Airport Chauffeur', 'Jacuzzi Bath'],
        description: 'Floor-to-ceiling glass windows with expansive views of the Arabian Sea and city skyline.',
        rating: 4.9,
        numReviews: 31,
        isFeatured: true,
      },
      // MANALI ROOMS
      {
        roomNumber: 'MAN-101',
        title: 'Himalayan Pine Alpine Chalet',
        category: catDeluxe._id,
        hotel: hotelManali._id,
        pricePerNight: 4699,
        discountPercent: 10,
        capacity: 3,
        status: 'available',
        floor: 1,
        images: [
          'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Snow Mountain View', 'Stone Fireplace', 'Heated Rooms', 'Alpine Herbal Spa', 'Private Balcony'],
        description: 'Handcrafted wooden retreat amidst tall deodar and pine trees with dramatic views of snow-covered peaks.',
        rating: 4.9,
        numReviews: 27,
        isFeatured: true,
      },
      {
        roomNumber: 'MAN-301',
        title: 'Snow Peak Family Haven Suite',
        category: catFamily._id,
        hotel: hotelManali._id,
        pricePerNight: 7499,
        discountPercent: 15,
        capacity: 5,
        status: 'available',
        floor: 2,
        images: [
          'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
        ],
        amenities: ['Fireplace Lounge', '2 Bedrooms', 'Hot Spring Jacuzzi', 'Trekking Guide', 'Kids Heated Play Zone'],
        description: 'Spacious family chalet with cozy living room, traditional bukhari fireplace, and stunning mountain views.',
        rating: 5.0,
        numReviews: 18,
        isFeatured: true,
      },
    ]);

    console.log('📅 Seeding Bookings & Payments...');
    const now = new Date();
    const checkInSample = new Date(now);
    checkInSample.setDate(checkInSample.getDate() + 2);
    const checkOutSample = new Date(checkInSample);
    checkOutSample.setDate(checkOutSample.getDate() + 3);

    const booking1 = await Booking.create({
      bookingNumber: 'HP-984211',
      guest: guestUser1._id,
      room: rooms[2]._id, // Room 201 Deluxe
      hotel: hotel._id,
      checkInDate: checkInSample,
      checkOutDate: checkOutSample,
      totalNights: 3,
      guestsCount: { adults: 2, children: 0 },
      pricePerNight: 3654,
      roomCharges: 10962,
      taxAmount: 1315,
      totalAmount: 12277,
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      specialRequests: 'High floor preferred, late arrival around 8 PM.',
    });

    await Payment.create({
      booking: booking1._id,
      user: guestUser1._id,
      amount: 12277,
      currency: 'INR',
      paymentMethod: 'credit_card',
      transactionId: 'TXN-984211-1001',
      paymentGateway: 'mock_gateway',
      status: 'completed',
      invoiceNumber: 'INV-984211',
      paidAt: new Date(),
    });

    // Checked-in active guest
    const pastCheckIn = new Date(now);
    pastCheckIn.setDate(pastCheckIn.getDate() - 1);
    const futureCheckOut = new Date(now);
    futureCheckOut.setDate(futureCheckOut.getDate() + 2);

    const booking2 = await Booking.create({
      bookingNumber: 'HP-743120',
      guest: guestUser2._id,
      room: rooms[3]._id, // Room 202
      hotel: hotel._id,
      checkInDate: pastCheckIn,
      checkOutDate: futureCheckOut,
      totalNights: 3,
      guestsCount: { adults: 2, children: 1 },
      pricePerNight: 4369,
      roomCharges: 13107,
      taxAmount: 1573,
      totalAmount: 14680,
      paymentMethod: 'upi',
      paymentStatus: 'paid',
      bookingStatus: 'checked-in',
      specialRequests: 'Extra hypoallergenic pillows.',
    });

    await Payment.create({
      booking: booking2._id,
      user: guestUser2._id,
      amount: 14680,
      currency: 'INR',
      paymentMethod: 'upi',
      transactionId: 'TXN-743120-2002',
      paymentGateway: 'mock_gateway',
      status: 'completed',
      invoiceNumber: 'INV-743120',
      paidAt: pastCheckIn,
    });

    await CheckInOut.create({
      booking: booking2._id,
      guest: guestUser2._id,
      room: rooms[3]._id,
      checkedInBy: staffUser._id,
      checkInTime: pastCheckIn,
      keyCardNumber: 'KC-202-A',
      idProofType: 'Aadhaar Card',
      idProofNumber: 'XXXX-XXXX-9012',
      depositPaid: 2000,
      status: 'checked-in',
      notes: 'Guest checked in at 2:30 PM with family. Key issued.',
    });

    console.log('🛎️ Seeding Service Requests...');
    await ServiceRequest.create({
      booking: booking2._id,
      guest: guestUser2._id,
      room: rooms[3]._id,
      type: 'Room Service',
      description: '2x Club Sandwiches, 1x Iced Cappuccino, 1x Fresh Orange Juice',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: staffUser._id,
      cost: 850,
      staffNotes: 'Kitchen preparing order, estimated delivery in 15 mins.',
    });

    await ServiceRequest.create({
      booking: booking2._id,
      guest: guestUser2._id,
      room: rooms[3]._id,
      type: 'Housekeeping',
      description: 'Replenish bathroom towels and vanity kit',
      priority: 'low',
      status: 'completed',
      assignedTo: staffUser._id,
      resolvedAt: new Date(),
      staffNotes: 'Fulfilled by housekeeping team.',
    });

    console.log('⭐ Seeding Reviews & Feedback...');
    await Review.create({
      room: rooms[2]._id,
      hotel: hotel._id,
      guest: guestUser1._id,
      booking: booking1._id,
      rating: 5,
      title: 'Stunning city views and impeccable hospitality!',
      comment: 'From check-in to dining, everything was seamless. The room was spotless, the bed was exceptionally comfortable, and the staff treated us like royalty.',
      staffResponse: {
        comment: 'Thank you Vikram! It was an absolute pleasure hosting you. We look forward to welcoming you back soon.',
        respondedAt: new Date(),
        respondedBy: staffUser._id,
      },
      isApproved: true,
    });

    await Review.create({
      room: rooms[4]._id,
      hotel: hotel._id,
      guest: guestUser2._id,
      rating: 5,
      title: 'Executive Royal Suite is unmatched!',
      comment: 'The lounge access and private jacuzzi were worth every penny. Truly 5-star experience!',
      isApproved: true,
    });

    console.log('🔔 Seeding Notifications...');
    await Notification.create({
      recipient: guestUser1._id,
      title: 'Booking Confirmed (HP-984211)',
      message: 'Your stay in Deluxe City View Room is confirmed. Check-in is at 2:00 PM.',
      type: 'booking',
      link: '/guest/bookings',
    });

    await Notification.create({
      recipient: guestUser2._id,
      title: 'Welcome to HotelPro!',
      message: 'Checked into Room #202. Dial 9 for Front Desk or request services through the guest portal.',
      type: 'checkin',
      link: '/guest/services',
    });

    console.log('🛡️ Seeding Admin Security Logs...');
    await AdminLog.create({
      user: adminUser._id,
      action: 'SYSTEM_INITIALIZATION',
      module: 'SYSTEM',
      details: 'HotelPro enterprise database initialized with default inventory and policies',
    });

    console.log('🎉 Data successfully seeded!');
    console.log('\n================ DEMO CREDENTIALS ================');
    console.log('👑 Admin:   admin@hotelpro.com   | Password: admin123');
    console.log('💼 Staff:   staff@hotelpro.com   | Password: staff123');
    console.log('🧳 Guest:   guest@hotelpro.com   | Password: guest123');
    console.log('===================================================\n');

    process.exit();
  } catch (error) {
    console.error('❌ Error during data seeding:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await Hotel.deleteMany();
    await RoomCategory.deleteMany();
    await Room.deleteMany();
    await Booking.deleteMany();
    await Payment.deleteMany();
    await CheckInOut.deleteMany();
    await ServiceRequest.deleteMany();
    await Review.deleteMany();
    await Notification.deleteMany();
    await AdminLog.deleteMany();

    console.log('🗑️ All HotelPro data deleted successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
