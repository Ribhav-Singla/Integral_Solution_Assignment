// Mock Flight Search API Service
// This service simulates integration with a Flight Search API with free credits

interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

interface Airline {
  code: string;
  name: string;
  logo: string;
}

interface FlightSegment {
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string;
  arrivalTime: string;
  flightNumber: string;
  duration: number; // in minutes
  airline: Airline;
}

interface Flight {
  id: string;
  segments: FlightSegment[];
  price: {
    amount: number;
    currency: string;
  };
  seatsAvailable: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
}

interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
}

// Mock airports data
const AIRPORTS: Airport[] = [
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { code: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
  { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { code: 'FCO', name: 'Leonardo da Vinci International Airport', city: 'Rome', country: 'Italy' },
];

// Mock airlines data
const AIRLINES: Airline[] = [
  { code: 'BA', name: 'British Airways', logo: 'ba-logo.png' },
  { code: 'AF', name: 'Air France', logo: 'af-logo.png' },
  { code: 'LH', name: 'Lufthansa', logo: 'lh-logo.png' },
  { code: 'AA', name: 'American Airlines', logo: 'aa-logo.png' },
  { code: 'DL', name: 'Delta Air Lines', logo: 'dl-logo.png' },
  { code: 'EK', name: 'Emirates', logo: 'ek-logo.png' },
  { code: 'SQ', name: 'Singapore Airlines', logo: 'sq-logo.png' },
  { code: 'QF', name: 'Qantas', logo: 'qf-logo.png' },
];

class FlightSearchService {
  private apiKey: string = 'mock-flight-api-key-98765';
  private creditBalance: number = 100; // Free credits available
  
  /**
   * Search for airports by query
   */
  async searchAirports(query: string): Promise<Airport[]> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Deduct credits
    this.deductCredits(1);
    
    if (!query) return [];
    
    // Filter airports that match the query
    const lowerQuery = query.toLowerCase();
    return AIRPORTS.filter(airport => 
      airport.code.toLowerCase().includes(lowerQuery) ||
      airport.name.toLowerCase().includes(lowerQuery) ||
      airport.city.toLowerCase().includes(lowerQuery) ||
      airport.country.toLowerCase().includes(lowerQuery)
    );
  }
  
  /**
   * Search for flights based on provided parameters
   */
  async searchFlights(params: SearchParams): Promise<Flight[]> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Deduct credits - flight search costs more
    this.deductCredits(5);
    
    // Find origin and destination airports
    const originAirport = AIRPORTS.find(airport => 
      airport.code === params.origin || 
      airport.city.toLowerCase() === params.origin.toLowerCase()
    );
    
    const destinationAirport = AIRPORTS.find(airport => 
      airport.code === params.destination || 
      airport.city.toLowerCase() === params.destination.toLowerCase()
    );
    
    if (!originAirport || !destinationAirport) {
      return [];
    }
    
    // Parse departure date
    const departureDate = new Date(params.departureDate);
    if (isNaN(departureDate.getTime())) {
      return [];
    }
    
    // Generate flights
    return this.generateFlights(
      originAirport, 
      destinationAirport, 
      departureDate, 
      params.cabinClass
    );
  }
  
  /**
   * Get detailed information about a specific flight
   */
  async getFlightDetails(flightId: string): Promise<Flight | null> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Deduct credits
    this.deductCredits(2);
    
    // Parse the flight ID to extract information
    const parts = flightId.split('-');
    if (parts.length < 3) {
      return null;
    }
    
    const originCode = parts[0];
    const destinationCode = parts[1];
    const dateStr = parts[2];
    
    const originAirport = AIRPORTS.find(airport => airport.code === originCode);
    const destinationAirport = AIRPORTS.find(airport => airport.code === destinationCode);
    
    if (!originAirport || !destinationAirport) {
      return null;
    }
    
    // Generate a specific flight based on ID
    const date = new Date();
    date.setDate(parseInt(dateStr, 10) || date.getDate());
    
    const flights = this.generateFlights(
      originAirport,
      destinationAirport,
      date,
      'economy',
      1,
      flightId
    );
    
    return flights.length > 0 ? flights[0] : null;
  }
  
  /**
   * Book a flight
   */
  async bookFlight(flightId: string, passengers: { firstName: string; lastName: string; }[]): Promise<{ bookingId: string; success: boolean; message: string; }> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Deduct credits - booking costs more
    this.deductCredits(10);
    
    // Always succeed for now
    return {
      bookingId: `BK-${Date.now().toString(36).toUpperCase()}`,
      success: true,
      message: 'Flight booked successfully!'
    };
  }
  
  /**
   * Get remaining credit balance
   */
  getCreditBalance(): number {
    return this.creditBalance;
  }
  
  /**
   * Generate mock flights based on parameters
   */
  private generateFlights(
    origin: Airport, 
    destination: Airport, 
    date: Date,
    cabinClass: string = 'economy',
    numFlights: number = 5,
    specificId?: string
  ): Flight[] {
    const flights: Flight[] = [];
    
    // Seed based on airports and date
    const seed = (origin.code.charCodeAt(0) + destination.code.charCodeAt(0)) * date.getDate();
    
    for (let i = 0; i < numFlights; i++) {
      const flightId = specificId || `${origin.code}-${destination.code}-${date.getDate()}-${i}`;
      
      // Get random airline
      const airline = AIRLINES[Math.abs((seed + i) % AIRLINES.length)];
      
      // Generate departure time between 6am and 8pm
      const hour = 6 + (Math.abs((seed + i * 3) % 15));
      const minute = Math.abs((seed + i * 7) % 60);
      
      // Create departure and arrival time
      const departureTime = new Date(date);
      departureTime.setHours(hour, minute, 0);
      
      // Calculate flight duration based on "distance" between airport codes
      const distance = Math.abs(
        (origin.code.charCodeAt(0) + origin.code.charCodeAt(1) + origin.code.charCodeAt(2)) -
        (destination.code.charCodeAt(0) + destination.code.charCodeAt(1) + destination.code.charCodeAt(2))
      );
      
      // Duration between 1 hour and 12 hours
      const durationMinutes = Math.max(60, Math.min(720, distance * 3 + (seed % 120)));
      
      // Calculate arrival time
      const arrivalTime = new Date(departureTime.getTime() + durationMinutes * 60000);
      
      // Price is based on cabin class, distance, and a random factor
      let basePrice = distance * 0.5;
      if (cabinClass === 'premium_economy') basePrice *= 1.5;
      if (cabinClass === 'business') basePrice *= 2.5;
      if (cabinClass === 'first') basePrice *= 4;
      
      const randomFactor = 0.8 + ((seed + i) % 40) / 100;
      const price = Math.round(basePrice * randomFactor) * 10;
      
      // Generate flight
      flights.push({
        id: flightId,
        segments: [{
          departureAirport: origin,
          arrivalAirport: destination,
          departureTime: departureTime.toISOString(),
          arrivalTime: arrivalTime.toISOString(),
          flightNumber: `${airline.code}${100 + Math.abs((seed + i) % 900)}`,
          duration: durationMinutes,
          airline: airline
        }],
        price: {
          amount: price,
          currency: 'USD'
        },
        seatsAvailable: Math.abs((seed + i * 5) % 50) + 1,
        cabinClass: 'economy' as any
      });
    }
    
    return flights;
  }
  
  /**
   * Deduct credits for API usage
   */
  private deductCredits(amount: number): void {
    this.creditBalance = Math.max(0, this.creditBalance - amount);
    console.log(`Flight API credits used: ${amount}. Remaining balance: ${this.creditBalance}`);
  }
}

// Export a singleton instance
const flightSearchService = new FlightSearchService();
export default flightSearchService; 