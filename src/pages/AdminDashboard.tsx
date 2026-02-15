import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plane, 
  Hotel, 
  Users, 
  Tag, 
  CreditCard, 
  LogOut, 
  Calendar,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Banknote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store';

const sidebarItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'bookings', label: 'Bookings', icon: Plane },
  { key: 'hotels', label: 'Hotels', icon: Hotel },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'deals', label: 'Deals & Offers', icon: Tag },
  { key: 'payments', label: 'Payments', icon: CreditCard },
];

const stats = [
  { label: 'Total Bookings', value: '1,247', change: '+12.5%', up: true, icon: Plane },
  { label: 'Revenue', value: 'Rs 4.2M', change: '+8.2%', up: true, icon: Banknote },
  { label: 'Active Users', value: '3,856', change: '+15.3%', up: true, icon: Users },
  { label: 'Pending Bookings', value: '24', change: '-5.1%', up: false, icon: Clock },
];

const recentBookings = [
  { id: 'BK001', customer: 'Ahmed Khan', type: 'Flight', route: 'KHI → DXB', date: '2026-02-15', amount: 45000, status: 'confirmed' },
  { id: 'BK002', customer: 'Fatima Ali', type: 'Hotel', route: 'Burj Al Arab', date: '2026-02-14', amount: 185000, status: 'confirmed' },
  { id: 'BK003', customer: 'Muhammad Hassan', type: 'Package', route: 'Dubai Luxury', date: '2026-02-14', amount: 185000, status: 'pending' },
  { id: 'BK004', customer: 'Ayesha Malik', type: 'Flight', route: 'LHE → IST', date: '2026-02-13', amount: 68000, status: 'confirmed' },
  { id: 'BK005', customer: 'Usman Khan', type: 'Flight', route: 'ISB → JED', date: '2026-02-13', amount: 52000, status: 'cancelled' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    const icons = {
      confirmed: CheckCircle,
      pending: Clock,
      cancelled: XCircle,
    };
    const Icon = icons[status as keyof typeof icons];
    return (
      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        <Icon className="w-3.5 h-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-white flex-shrink-0 fixed h-full overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg block">Air<span className="text-primary">Vista</span></span>
              <span className="text-white/50 text-xs">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.key
                    ? 'bg-primary text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-xl font-bold text-dark">Dashboard Overview</h1>
              <p className="text-gray-500 text-sm">Welcome back, {user?.firstName}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
                />
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="font-bold text-primary">{user?.firstName?.[0]}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-xl shadow-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-dark">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-dark">Recent Bookings</h2>
                <p className="text-gray-500 text-sm">Latest transactions from customers</p>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Booking ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Details</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-dark">{booking.id}</td>
                      <td className="px-6 py-4">{booking.customer}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{booking.type}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{booking.route}</td>
                      <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                      <td className="px-6 py-4 font-medium">Rs {booking.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-white">
              <Calendar className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-1">Add New Deal</h3>
              <p className="text-white/80 text-sm mb-4">Create promotional offers for customers</p>
              <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-gray-100">
                Create Deal
              </Button>
            </div>

            <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-xl p-6 text-white">
              <Plane className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-1">Manage Flights</h3>
              <p className="text-white/80 text-sm mb-4">Update flight schedules and pricing</p>
              <Button variant="secondary" size="sm" className="bg-white text-secondary hover:bg-gray-100">
                Manage
              </Button>
            </div>

            <div className="bg-gradient-to-br from-dark to-gray-800 rounded-xl p-6 text-white">
              <Users className="w-8 h-8 mb-4" />
              <h3 className="font-bold text-lg mb-1">User Management</h3>
              <p className="text-white/80 text-sm mb-4">View and manage registered users</p>
              <Button variant="secondary" size="sm" className="bg-white text-dark hover:bg-gray-100">
                View Users
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
