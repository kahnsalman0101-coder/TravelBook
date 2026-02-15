import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, 
  Calendar, 
  Users, 
  ArrowRightLeft, 
  Search,
  MapPin,
  ChevronDown,
  Minus,
  Plus,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchStore } from '@/store';
import { airports, topOrigins, topDestinations } from '@/data/airports';
import { format, addDays } from 'date-fns';

type TripType = 'one-way' | 'round-trip' | 'multi-city';

export default function Hero() {
  const navigate = useNavigate();
  const {
    from,
    to,
    departureDate,
    returnDate,
    travelers,
    travelClass,
    tripType,
    setFrom,
    setTo,
    setDepartureDate,
    setReturnDate,
    setTravelers,
    setTravelClass,
    setTripType,
    swapLocations,
  } = useSearchStore();

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const travelersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
      if (travelersRef.current && !travelersRef.current.contains(event.target as Node)) {
        setShowTravelersDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFromAirports = airports.filter(
    (airport) =>
      airport.city.toLowerCase().includes(fromSearch.toLowerCase()) ||
      airport.code.toLowerCase().includes(fromSearch.toLowerCase()) ||
      airport.name.toLowerCase().includes(fromSearch.toLowerCase())
  );

  const filteredToAirports = airports.filter(
    (airport) =>
      airport.city.toLowerCase().includes(toSearch.toLowerCase()) ||
      airport.code.toLowerCase().includes(toSearch.toLowerCase()) ||
      airport.name.toLowerCase().includes(toSearch.toLowerCase())
  );

  const handleSearch = () => {
    if (!from || !to || !departureDate) {
      return;
    }
    navigate('/flight-results');
  };

  const getSelectedAirport = (code: string) => airports.find((a) => a.code === code);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop"
          alt="Travel Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark/70" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-down">
              The Whole World is <span className="text-primary">Waiting</span> for You
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Discover amazing destinations and book your next adventure with the best prices guaranteed
            </p>
          </div>

          {/* Search Card */}
          <div className="glass-card p-6 md:p-8 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            {/* Trip Type Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { key: 'round-trip', label: 'Round Trip' },
                { key: 'one-way', label: 'One Way' },
                { key: 'multi-city', label: 'Multi City' },
              ].map((type) => (
                <button
                  key={type.key}
                  onClick={() => setTripType(type.key as TripType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    tripType === type.key
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  {type.label}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
              {/* From */}
              <div className="lg:col-span-3 relative" ref={fromRef}>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">From</label>
                <button
                  onClick={() => setShowFromDropdown(!showFromDropdown)}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
                >
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    {from ? (
                      <div>
                        <p className="font-semibold text-dark truncate">{getSelectedAirport(from)?.city}</p>
                        <p className="text-xs text-gray-500">{getSelectedAirport(from)?.code} - {getSelectedAirport(from)?.name}</p>
                      </div>
                    ) : (
                      <p className="text-gray-400">Select origin</p>
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>

                {showFromDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-dropdown z-50 max-h-80 overflow-hidden animate-scale-in">
                    <div className="p-3 border-b border-gray-100">
                      <input
                        type="text"
                        placeholder="Search city or airport..."
                        value={fromSearch}
                        onChange={(e) => setFromSearch(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        autoFocus
                      />
                    </div>
                    <div className="overflow-y-auto max-h-60">
                      {!fromSearch && (
                        <div className="px-3 py-2 bg-gray-50">
                          <p className="text-xs font-medium text-gray-500 uppercase">Top Origins</p>
                        </div>
                      )}
                      {(fromSearch ? filteredFromAirports : airports.filter(a => topOrigins.includes(a.code))).map((airport) => (
                        <button
                          key={airport.code}
                          onClick={() => {
                            setFrom(airport.code);
                            setShowFromDropdown(false);
                            setFromSearch('');
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                            from === airport.code ? 'bg-primary/5' : ''
                          }`}
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-primary">{airport.code}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-dark truncate">{airport.city}, {airport.country}</p>
                            <p className="text-xs text-gray-500 truncate">{airport.name}</p>
                          </div>
                          {from === airport.code && <Check className="w-4 h-4 text-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <div className="hidden lg:flex lg:col-span-1 items-end justify-center pb-3">
                <button
                  onClick={swapLocations}
                  className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <ArrowRightLeft className="w-5 h-5 text-primary" />
                </button>
              </div>

              {/* To */}
              <div className="lg:col-span-3 relative" ref={toRef}>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">To</label>
                <button
                  onClick={() => setShowToDropdown(!showToDropdown)}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
                >
                  <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    {to ? (
                      <div>
                        <p className="font-semibold text-dark truncate">{getSelectedAirport(to)?.city}</p>
                        <p className="text-xs text-gray-500">{getSelectedAirport(to)?.code} - {getSelectedAirport(to)?.name}</p>
                      </div>
                    ) : (
                      <p className="text-gray-400">Select destination</p>
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>

                {showToDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-dropdown z-50 max-h-80 overflow-hidden animate-scale-in">
                    <div className="p-3 border-b border-gray-100">
                      <input
                        type="text"
                        placeholder="Search city or airport..."
                        value={toSearch}
                        onChange={(e) => setToSearch(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        autoFocus
                      />
                    </div>
                    <div className="overflow-y-auto max-h-60">
                      {!toSearch && (
                        <div className="px-3 py-2 bg-gray-50">
                          <p className="text-xs font-medium text-gray-500 uppercase">Top Destinations</p>
                        </div>
                      )}
                      {(toSearch ? filteredToAirports : airports.filter(a => topDestinations.includes(a.code))).map((airport) => (
                        <button
                          key={airport.code}
                          onClick={() => {
                            setTo(airport.code);
                            setShowToDropdown(false);
                            setToSearch('');
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                            to === airport.code ? 'bg-primary/5' : ''
                          }`}
                        >
                          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-secondary">{airport.code}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-dark truncate">{airport.city}, {airport.country}</p>
                            <p className="text-xs text-gray-500 truncate">{airport.name}</p>
                          </div>
                          {to === airport.code && <Check className="w-4 h-4 text-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Departure Date */}
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Departure</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="date"
                    value={departureDate ? format(departureDate, 'yyyy-MM-dd') : ''}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    onChange={(e) => setDepartureDate(e.target.value ? new Date(e.target.value) : null)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                  />
                </div>
              </div>

              {/* Return Date */}
              {tripType === 'round-trip' && (
                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Return</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <input
                      type="date"
                      value={returnDate ? format(returnDate, 'yyyy-MM-dd') : ''}
                      min={departureDate ? format(addDays(departureDate, 1), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
                      onChange={(e) => setReturnDate(e.target.value ? new Date(e.target.value) : null)}
                      className="w-full pl-10 pr-3 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Travelers & Class */}
              <div className={`${tripType === 'round-trip' ? 'lg:col-span-1' : 'lg:col-span-3'} relative`} ref={travelersRef}>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Travelers</label>
                <button
                  onClick={() => setShowTravelersDropdown(!showTravelersDropdown)}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
                >
                  <Users className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-dark">{travelers} Traveler{travelers > 1 ? 's' : ''}</p>
                    <p className="text-xs text-gray-500">{travelClass}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>

                {showTravelersDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-dropdown z-50 p-4 animate-scale-in">
                    {/* Travelers Count */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-dark">Travelers</p>
                        <p className="text-xs text-gray-500">Number of passengers</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setTravelers(Math.max(1, travelers - 1))}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-semibold">{travelers}</span>
                        <button
                          onClick={() => setTravelers(Math.min(9, travelers + 1))}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Class Selection */}
                    <div className="border-t border-gray-100 pt-4">
                      <p className="font-medium text-dark mb-2">Class</p>
                      <div className="space-y-2">
                        {['Economy', 'Business', 'First'].map((cls) => (
                          <button
                            key={cls}
                            onClick={() => setTravelClass(cls as 'Economy' | 'Business' | 'First')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                              travelClass === cls ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-sm">{cls}</span>
                            {travelClass === cls && <Check className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6">
              <Button
                onClick={handleSearch}
                disabled={!from || !to || !departureDate}
                className="w-full md:w-auto px-8 py-6 bg-primary hover:bg-primary-dark text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Flights
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
