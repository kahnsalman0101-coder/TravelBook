import type { Flight } from '@/types';

export const airlines = [
  { name: 'PIA', logo: 'https://logo.clearbit.com/piac.aero', color: '#006400' },
  { name: 'Airblue', logo: 'https://logo.clearbit.com/airblue.com', color: '#0066CC' },
  { name: 'Serene Air', logo: 'https://logo.clearbit.com/sereneair.com', color: '#00BFFF' },
  { name: 'AirSial', logo: 'https://logo.clearbit.com/airsial.com', color: '#8B0000' },
  { name: 'Emirates', logo: 'https://logo.clearbit.com/emirates.com', color: '#C60C30' },
  { name: 'Qatar Airways', logo: 'https://logo.clearbit.com/qatarairways.com', color: '#5C0D11' },
  { name: 'Etihad Airways', logo: 'https://logo.clearbit.com/etihad.com', color: '#C8A415' },
  { name: 'Turkish Airlines', logo: 'https://logo.clearbit.com/turkishairlines.com', color: '#C60C30' },
  { name: 'Saudia', logo: 'https://logo.clearbit.com/saudia.com', color: '#006400' },
  { name: 'Flydubai', logo: 'https://logo.clearbit.com/flydubai.com', color: '#F26522' },
  { name: 'Air Arabia', logo: 'https://logo.clearbit.com/airarabia.com', color: '#E31837' },
  { name: 'Gulf Air', logo: 'https://logo.clearbit.com/gulfair.com', color: '#8B0000' },
  { name: 'British Airways', logo: 'https://logo.clearbit.com/britishairways.com', color: '#003B7E' },
  { name: 'Lufthansa', logo: 'https://logo.clearbit.com/lufthansa.com', color: '#05164D' },
  { name: 'Air France', logo: 'https://logo.clearbit.com/airfrance.com', color: '#002157' },
  { name: 'KLM', logo: 'https://logo.clearbit.com/klm.com', color: '#00A1E4' },
];

export const generateFlights = (from: string, to: string, _date: string): Flight[] => {
  const flights: Flight[] = [];
  const basePrice = Math.floor(Math.random() * 300) + 200;
  
  for (let i = 0; i < 15; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const departureHour = Math.floor(Math.random() * 24);
    const departureMinute = Math.floor(Math.random() * 60);
    const durationHours = Math.floor(Math.random() * 8) + 2;
    const durationMinutes = Math.floor(Math.random() * 60);
    
    const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`;
    const arrivalHour = (departureHour + durationHours) % 24;
    const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${((departureMinute + durationMinutes) % 60).toString().padStart(2, '0')}`;
    
    const stops = Math.random() > 0.6 ? 0 : Math.random() > 0.5 ? 1 : 2;
    const price = basePrice + Math.floor(Math.random() * 200) + (stops * 50);
    
    flights.push({
      id: `FL${Date.now()}${i}`,
      airline: airline.name,
      airlineLogo: airline.logo,
      flightNumber: `${airline.name.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 900) + 100}`,
      from: { code: from, city: '', country: '', name: '' },
      to: { code: to, city: '', country: '', name: '' },
      departureTime,
      arrivalTime,
      duration: `${durationHours}h ${durationMinutes}m`,
      price,
      currency: 'PKR',
      stops,
      stopLocations: stops > 0 ? ['DXB'] : [],
      baggage: {
        cabin: '7 kg',
        checked: stops === 0 ? '30 kg' : '23 kg',
      },
      refundable: Math.random() > 0.5,
      seatsAvailable: Math.floor(Math.random() * 20) + 1,
      class: 'Economy',
    });
  }
  
  return flights.sort((a, b) => a.price - b.price);
};

export const mockFlights: Flight[] = [
  {
    id: 'FL001',
    airline: 'Emirates',
    airlineLogo: 'https://logo.clearbit.com/emirates.com',
    flightNumber: 'EK601',
    from: { code: 'KHI', city: 'Karachi', country: 'Pakistan', name: 'Jinnah International Airport' },
    to: { code: 'DXB', city: 'Dubai', country: 'UAE', name: 'Dubai International Airport' },
    departureTime: '03:45',
    arrivalTime: '05:15',
    duration: '2h 30m',
    price: 45000,
    currency: 'PKR',
    stops: 0,
    baggage: { cabin: '7 kg', checked: '30 kg' },
    refundable: true,
    seatsAvailable: 12,
    class: 'Economy',
  },
  {
    id: 'FL002',
    airline: 'PIA',
    airlineLogo: 'https://logo.clearbit.com/piac.aero',
    flightNumber: 'PK203',
    from: { code: 'KHI', city: 'Karachi', country: 'Pakistan', name: 'Jinnah International Airport' },
    to: { code: 'DXB', city: 'Dubai', country: 'UAE', name: 'Dubai International Airport' },
    departureTime: '08:30',
    arrivalTime: '11:00',
    duration: '2h 30m',
    price: 32000,
    currency: 'PKR',
    stops: 0,
    baggage: { cabin: '7 kg', checked: '20 kg' },
    refundable: false,
    seatsAvailable: 5,
    class: 'Economy',
  },
  {
    id: 'FL003',
    airline: 'Qatar Airways',
    airlineLogo: 'https://logo.clearbit.com/qatarairways.com',
    flightNumber: 'QR611',
    from: { code: 'KHI', city: 'Karachi', country: 'Pakistan', name: 'Jinnah International Airport' },
    to: { code: 'DXB', city: 'Dubai', country: 'UAE', name: 'Dubai International Airport' },
    departureTime: '14:20',
    arrivalTime: '18:45',
    duration: '4h 25m',
    price: 52000,
    currency: 'PKR',
    stops: 1,
    stopLocations: ['DOH'],
    baggage: { cabin: '7 kg', checked: '30 kg' },
    refundable: true,
    seatsAvailable: 8,
    class: 'Economy',
  },
  {
    id: 'FL004',
    airline: 'Flydubai',
    airlineLogo: 'https://logo.clearbit.com/flydubai.com',
    flightNumber: 'FZ332',
    from: { code: 'KHI', city: 'Karachi', country: 'Pakistan', name: 'Jinnah International Airport' },
    to: { code: 'DXB', city: 'Dubai', country: 'UAE', name: 'Dubai International Airport' },
    departureTime: '19:15',
    arrivalTime: '21:45',
    duration: '2h 30m',
    price: 28000,
    currency: 'PKR',
    stops: 0,
    baggage: { cabin: '7 kg', checked: '20 kg' },
    refundable: false,
    seatsAvailable: 15,
    class: 'Economy',
  },
  {
    id: 'FL005',
    airline: 'Air Arabia',
    airlineLogo: 'https://logo.clearbit.com/airarabia.com',
    flightNumber: 'G9544',
    from: { code: 'KHI', city: 'Karachi', country: 'Pakistan', name: 'Jinnah International Airport' },
    to: { code: 'DXB', city: 'Dubai', country: 'UAE', name: 'Dubai International Airport' },
    departureTime: '11:30',
    arrivalTime: '16:00',
    duration: '4h 30m',
    price: 25000,
    currency: 'PKR',
    stops: 1,
    stopLocations: ['SHJ'],
    baggage: { cabin: '7 kg', checked: '20 kg' },
    refundable: false,
    seatsAvailable: 20,
    class: 'Economy',
  },
];
