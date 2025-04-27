// Mock Google Maps API Service
// This service mimics the behavior of Google Maps API with free credits

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  formattedAddress: string;
  country: string;
}

interface MapOptions {
  zoom: number;
  center: { lat: number; lng: number };
}

// Mock data for location search
const MOCK_LOCATIONS: Location[] = [
  {
    id: 'paris-france',
    name: 'Paris',
    lat: 48.8566,
    lng: 2.3522,
    formattedAddress: 'Paris, France',
    country: 'France'
  },
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    lat: 35.6762,
    lng: 139.6503,
    formattedAddress: 'Tokyo, Japan',
    country: 'Japan'
  },
  {
    id: 'new-york-usa',
    name: 'New York City',
    lat: 40.7128,
    lng: -74.0060,
    formattedAddress: 'New York, NY, USA',
    country: 'United States'
  },
  {
    id: 'bali-indonesia',
    name: 'Bali',
    lat: -8.3405,
    lng: 115.0920,
    formattedAddress: 'Bali, Indonesia',
    country: 'Indonesia'
  },
  {
    id: 'rome-italy',
    name: 'Rome',
    lat: 41.9028,
    lng: 12.4964,
    formattedAddress: 'Rome, Italy',
    country: 'Italy'
  }
];

class GoogleMapsService {
  private apiKey: string = 'mock-api-key-12345';
  private creditBalance: number = 200; // Free credits available
  
  /**
   * Search for locations based on query string
   */
  async searchLocations(query: string): Promise<Location[]> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Deduct credits
    this.deductCredits(1);
    
    if (!query) return [];
    
    // Filter locations that match the query
    return MOCK_LOCATIONS.filter(location => 
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.country.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  /**
   * Get location details by ID
   */
  async getLocationDetails(locationId: string): Promise<Location | null> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Deduct credits
    this.deductCredits(2);
    
    return MOCK_LOCATIONS.find(location => location.id === locationId) || null;
  }
  
  /**
   * Initialize a map on the given element ID
   * Returns a mock map instance
   */
  initMap(elementId: string, options: MapOptions): { render: () => void } {
    // Deduct credits
    this.deductCredits(5);
    
    console.log(`Map initialized on element: ${elementId} with options:`, options);
    
    // Return a mock map object
    return {
      render: () => {
        console.log(`Map rendered on ${elementId}`);
      }
    };
  }
  
  /**
   * Get directions between two locations
   */
  async getDirections(origin: Location, destination: Location): Promise<{ distance: string; duration: string }> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Deduct credits
    this.deductCredits(10);
    
    // Calculate mock distance and duration
    const lat1 = origin.lat;
    const lon1 = origin.lng;
    const lat2 = destination.lat;
    const lon2 = destination.lng;
    
    // Simple distance calculation (not accurate, just for demo)
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    
    // Rough estimate of duration: assuming average speed of 80 km/h
    const duration = distance / 80; // Hours
    
    return {
      distance: `${Math.round(distance)} km`,
      duration: `${Math.round(duration * 60)} mins`
    };
  }
  
  /**
   * Get remaining credit balance
   */
  getCreditBalance(): number {
    return this.creditBalance;
  }
  
  /**
   * Convert degrees to radians
   */
  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
  
  /**
   * Deduct credits for API usage
   */
  private deductCredits(amount: number): void {
    this.creditBalance = Math.max(0, this.creditBalance - amount);
    console.log(`Credits used: ${amount}. Remaining balance: ${this.creditBalance}`);
  }
}

// Export a singleton instance
const mapsService = new GoogleMapsService();
export default mapsService; 