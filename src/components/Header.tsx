import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Plane, 
  Hotel, 
  Package, 
  Tag, 
  Phone, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore, useAuthStore } from '@/store';

const navLinks = [
  { path: '/flights', label: 'Flights', icon: Plane },
  { path: '/hotels', label: 'Hotels', icon: Hotel },
  { path: '/packages', label: 'Packages', icon: Package },
  { path: '/deals', label: 'Deals', icon: Tag },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isHeaderScrolled, setHeaderScrolled, isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setHeaderScrolled]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHeaderScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className={`font-poppins font-bold text-xl transition-colors ${
              isHeaderScrolled ? 'text-dark' : 'text-white'
            }`}>
              Travel<span className="text-primary">Book</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    isHeaderScrolled
                      ? isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                      : isActive
                      ? 'text-white bg-white/20'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Phone */}
            <a
              href="tel:+923111555395"
              className={`hidden md:flex items-center gap-2 font-medium transition-colors ${
                isHeaderScrolled ? 'text-dark' : 'text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+92 3405603070</span>
            </a>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isHeaderScrolled
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">{user?.firstName}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-dropdown py-2 animate-scale-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-dark">{user?.firstName} {user?.lastName}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                    <Link
                      to="/bookings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Calendar className="w-4 h-4" />
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                className={`hidden sm:flex items-center gap-2 ${
                  isHeaderScrolled
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-white text-primary hover:bg-gray-100'
                }`}
              >
                <User className="w-4 h-4" />
                Sign In
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isHeaderScrolled
                  ? 'text-dark hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-2xl shadow-dropdown p-4 animate-slide-down">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            
            {!isAuthenticated && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full bg-primary text-white hover:bg-primary-dark"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
