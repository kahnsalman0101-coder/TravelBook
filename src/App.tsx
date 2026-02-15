import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import WhyBookWithUs from '@/sections/WhyBookWithUs';
import Destinations from '@/sections/Destinations';
import Deals from '@/sections/Deals';
import AirlinePartners from '@/sections/AirlinePartners';
import Testimonials from '@/sections/Testimonials';
import Newsletter from '@/sections/Newsletter';
import FlightResults from '@/pages/FlightResults';
import Booking from '@/pages/Booking';
import BookingConfirmation from '@/pages/BookingConfirmation';
import Hotels from '@/pages/Hotels';
import Packages from '@/pages/Packages';
import DealsPage from '@/pages/Deals';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';

function HomePage() {
  return (
    <>
      <Hero />
      <WhyBookWithUs />
      <Destinations />
      <Deals />
      <AirlinePartners />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flights" element={<HomePage />} />
            <Route path="/flight-results" element={<FlightResults />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
