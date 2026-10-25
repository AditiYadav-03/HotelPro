import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../services/api';
import {
  Search,
  Filter,
  Star,
  Users,
  Wifi,
  Tv,
  Coffee,
  CheckCircle,
  Clock,
  RotateCcw,
} from 'lucide-react';

const RoomList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '20000');
  const [capacity, setCapacity] = useState(searchParams.get('capacity') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/hotel/categories');
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch rooms with applied filters
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (selectedCategory) params.append('category', selectedCategory);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (capacity) params.append('capacity', capacity);
        if (status) params.append('status', status);
        if (sort) params.append('sort', sort);

        const res = await API.get(`/rooms?${params.toString()}`);
        setRooms(res.data.rooms || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [search, selectedCategory, maxPrice, capacity, status, sort]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setMaxPrice('20000');
    setCapacity('');
    setStatus('');
    setSort('');
    setSearchParams({});
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header Title */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">Explore Available Rooms & Luxury Suites</h2>
          <p className="text-muted">
            Find the perfect accommodation tailored with modern amenities and best rate guarantees.
          </p>
        </div>

        <div className="row g-4">
          {/* Filters Sidebar */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '90px' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                  <Filter size={18} className="text-primary" /> Filters
                </h5>
                <button
                  onClick={handleResetFilters}
                  className="btn btn-link btn-sm text-decoration-none p-0 d-flex align-items-center gap-1 text-muted"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>

              {/* Keyword Search */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Keyword Search</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <Search size={16} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by title, number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Room Category</label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Max Price Slider */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label small fw-bold text-muted mb-0">Max Budget</label>
                  <span className="small fw-bold text-primary">₹{Number(maxPrice).toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="2000"
                  max="25000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              {/* Capacity Filter */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Min Guests Capacity</label>
                <select
                  className="form-select"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                >
                  <option value="">Any Capacity</option>
                  <option value="1">1+ Guest</option>
                  <option value="2">2+ Guests</option>
                  <option value="3">3+ Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>

              {/* Availability Status */}
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Availability</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="available">Available Only</option>
                  <option value="booked">Booked</option>
                  <option value="cleaning">Cleaning</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="form-label small fw-bold text-muted">Sort By</label>
                <select
                  className="form-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="">Default (Room Number)</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Guest Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Room Listings */}
          <div className="col-lg-9">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="text-muted mt-2">Fetching room accommodations...</p>
              </div>
            ) : rooms.length === 0 ? (
              <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                <h5 className="fw-bold mb-2">No rooms matched your criteria</h5>
                <p className="text-muted mb-3">Try adjusting your filters or search keywords.</p>
                <div>
                  <button onClick={handleResetFilters} className="btn btn-primary btn-sm rounded-pill px-4">
                    Reset Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {rooms.map((room) => (
                  <div key={room._id} className="col-md-6">
                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden d-flex flex-column bg-white">
                      <div className="position-relative" style={{ height: '220px' }}>
                        <img
                          src={room.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'}
                          alt={room.title}
                          className="w-100 h-100 object-fit-cover"
                        />
                        <span className="position-absolute top-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white px-3 py-1 rounded-pill">
                          Room #{room.roomNumber}
                        </span>

                        <span
                          className={`position-absolute top-0 end-0 m-3 badge rounded-pill px-3 py-1 ${
                            room.status === 'available'
                              ? 'bg-success'
                              : room.status === 'booked'
                              ? 'bg-warning text-dark'
                              : 'bg-secondary'
                          }`}
                        >
                          {room.status?.toUpperCase()}
                        </span>
                      </div>

                      <div className="card-body p-4 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="badge bg-primary-subtle text-primary fw-semibold px-2 py-1">
                            {room.category?.name || 'Standard'}
                          </span>
                          <div className="d-flex align-items-center gap-1 text-warning small fw-bold">
                            <Star size={15} fill="#f59e0b" />
                            <span>{room.rating || 4.8}</span>
                            <span className="text-muted">({room.numReviews || 0})</span>
                          </div>
                        </div>

                        <h5 className="card-title fw-bold text-dark mb-1">{room.title}</h5>
                        <p className="card-text text-muted small line-clamp-2 mb-3">
                          {room.description}
                        </p>

                        <div className="d-flex align-items-center gap-3 text-muted small mb-3">
                          <div className="d-flex align-items-center gap-1">
                            <Users size={15} className="text-primary" /> Up to {room.capacity} Guests
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <Wifi size={15} className="text-primary" /> Free Wi-Fi
                          </div>
                        </div>

                        <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                          <div>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>Per Night</div>
                            <span className="fs-5 fw-bold text-primary">
                              ₹{room.pricePerNight?.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <Link
                            to={`/rooms/${room._id}`}
                            className="btn btn-primary rounded-pill px-3 btn-sm fw-semibold"
                          >
                            Reserve Room
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
