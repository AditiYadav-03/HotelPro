import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import {
  Calendar,
  Users,
  Search,
  Star,
  ShieldCheck,
  Coffee,
  Wifi,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  Check,
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search widget state
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await API.get('/rooms');
        const rooms = res.data.rooms || [];
        setFeaturedRooms(rooms.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (selectedCategory) queryParams.append('category', selectedCategory);
    if (guests) queryParams.append('capacity', guests);
    navigate(`/rooms?${queryParams.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="position-relative text-white py-5 d-flex align-items-center"
        style={{
          minHeight: '85vh',
          background: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat`,
        }}
      >
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge bg-primary text-white px-3 py-2 rounded-pill mb-3 fw-semibold text-uppercase tracking-wider">
                <Sparkles size={14} className="me-1 inline" /> Luxury Hospitality & Suites
              </span>
              <h1 className="display-4 fw-bold lh-sm mb-3">
                Experience Unrivaled Luxury, Comfort & Tranquility.
              </h1>
              <p className="lead text-light opacity-90 mb-4">
                Welcome to HotelPro. Indulge in opulent suites, Michelin-grade culinary experiences, and 24/7 dedicated concierge services tailored to perfection.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/rooms" className="btn btn-primary btn-lg px-4 rounded-pill fw-semibold shadow">
                  Explore Rooms & Suites <ArrowRight size={18} className="ms-1 inline" />
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg px-4 rounded-pill fw-semibold">
                  Manage Reservations
                </Link>
              </div>
            </div>

            {/* Quick Reservation Search Card */}
            <div className="col-lg-5">
              <div className="card shadow-lg border-0 rounded-4 p-4 text-dark bg-white">
                <h4 className="fw-bold mb-3 text-primary d-flex align-items-center gap-2">
                  <Calendar size={22} /> Find Available Rooms
                </h4>
                <form onSubmit={handleSearch}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Check-In Date</label>
                    <input
                      type="date"
                      className="form-control form-control-lg fs-6"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted">Check-Out Date</label>
                    <input
                      type="date"
                      className="form-control form-control-lg fs-6"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                  </div>
                  <div className="row g-2 mb-4">
                    <div className="col-6">
                      <label className="form-label small fw-bold text-muted">Guests</label>
                      <select
                        className="form-select form-select-lg fs-6"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4+ Guests</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-bold text-muted">Room Type</label>
                      <select
                        className="form-select form-select-lg fs-6"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="">All Categories</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Executive Suite">Executive Suite</option>
                        <option value="Presidential Suite">Presidential</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow">
                    <Search size={18} className="me-2 inline" /> Check Availability & Rates
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Guarantees Row */}
      <section className="py-4 bg-light border-bottom">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <ShieldCheck size={28} className="text-primary flex-shrink-0" />
                <div className="text-start">
                  <div className="fw-bold small">Best Rate Guarantee</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Direct booking perks</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <Clock size={28} className="text-primary flex-shrink-0" />
                <div className="text-start">
                  <div className="fw-bold small">Flexible Cancellation</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Cancel up to 24h before</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <Wifi size={28} className="text-primary flex-shrink-0" />
                <div className="text-start">
                  <div className="fw-bold small">Gigabit Wi-Fi</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Complimentary all areas</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <Coffee size={28} className="text-primary flex-shrink-0" />
                <div className="text-start">
                  <div className="fw-bold small">Gourmet Breakfast</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Buffet with room bookings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="text-primary fw-bold text-uppercase small tracking-wider">Curated Collections</span>
              <h2 className="fw-bold mb-1">Featured Rooms & Signature Suites</h2>
              <p className="text-muted mb-0">Handpicked accommodations crafted for luxury, comfort, and serenity.</p>
            </div>
            <Link to="/rooms" className="btn btn-outline-primary mt-3 mt-md-0 rounded-pill px-4">
              View All Rooms <ArrowRight size={16} className="ms-1 inline" />
            </Link>
          </div>

          <div className="row g-4">
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="text-muted mt-2">Loading curated suites...</p>
              </div>
            ) : (
              featuredRooms.map((room) => (
                <div key={room._id} className="col-lg-4 col-md-6">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden transition-all hover-shadow">
                    <div className="position-relative" style={{ height: '240px' }}>
                      <img
                        src={room.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'}
                        alt={room.title}
                        className="w-100 h-100 object-fit-cover"
                      />
                      <span className="position-absolute top-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill">
                        Room #{room.roomNumber}
                      </span>
                      {room.discountPercent > 0 && (
                        <span className="position-absolute top-0 end-0 m-3 badge bg-danger px-3 py-2 rounded-pill">
                          {room.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-primary-subtle text-primary fw-semibold px-2 py-1">
                          {room.category?.name || 'Standard'}
                        </span>
                        <div className="d-flex align-items-center gap-1 text-warning small fw-bold">
                          <Star size={16} fill="#f59e0b" />
                          <span>{room.rating || 4.8}</span>
                          <span className="text-muted">({room.numReviews || 0})</span>
                        </div>
                      </div>

                      <h5 className="card-title fw-bold text-dark mb-2">{room.title}</h5>
                      <p className="card-text text-muted small line-clamp-2 mb-3">
                        {room.description}
                      </p>

                      <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                        <div>
                          <div className="text-muted small">Per Night</div>
                          <span className="fs-5 fw-bold text-primary">
                            ₹{room.pricePerNight?.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <Link to={`/rooms/${room._id}`} className="btn btn-primary rounded-pill px-3 btn-sm fw-semibold">
                          View & Book
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* World Class Amenities Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container py-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-primary text-white px-3 py-2 rounded-pill mb-2 fw-semibold text-uppercase">
              Resort Amenities
            </span>
            <h2 className="fw-bold mb-3">Unparalleled 5-Star Facilities</h2>
            <p className="text-light opacity-75">
              Everything you need for an unforgettable stay, all under one roof.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                title: 'Infinity Sky Pool',
                desc: 'Temperature-controlled rooftop pool with panoramic skyline views and cocktail bar.',
                img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Wellness Spa & Jacuzzi',
                desc: 'Holistic rejuvenation therapies, Swedish massages, herbal steam rooms, and steam sauna.',
                img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Michelin Star Dining',
                desc: 'Curated dining experiences with celebrated chefs preparing authentic international menus.',
                img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
              },
            ].map((facility, idx) => (
              <div key={idx} className="col-md-4">
                <div className="card bg-secondary bg-opacity-25 border-0 rounded-4 overflow-hidden h-100 text-white">
                  <img src={facility.img} alt={facility.title} className="w-100 object-fit-cover" style={{ height: '200px' }} />
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-2">{facility.title}</h5>
                    <p className="small text-light opacity-75 mb-0">{facility.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
