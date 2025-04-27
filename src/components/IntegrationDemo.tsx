import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { MapPin, Cloud, Plane, CreditCard } from 'lucide-react';
import googleMapsService from '../services/GoogleMapsService';
import weatherService from '../services/WeatherService';
import flightSearchService from '../services/FlightSearchService';

interface ServiceStatus {
  name: string;
  credits: number;
  maxCredits: number;
  icon: React.ReactNode;
}

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  formattedAddress: string;
  country: string;
}

const IntegrationDemo = () => {
  const { isDarkMode } = useTheme();
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [locationResults, setLocationResults] = useState<Location[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [flights, setFlights] = useState<any[]>([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingFlights, setLoadingFlights] = useState(false);
  
  // Initialize service status
  useEffect(() => {
    setServices([
      { 
        name: 'Google Maps API', 
        credits: googleMapsService.getCreditBalance(), 
        maxCredits: 200,
        icon: <MapPin size={16} />
      },
      { 
        name: 'Weather API', 
        credits: weatherService.getCreditBalance(), 
        maxCredits: 50,
        icon: <Cloud size={16} />
      },
      { 
        name: 'Flight Search API', 
        credits: flightSearchService.getCreditBalance(), 
        maxCredits: 100,
        icon: <Plane size={16} />
      }
    ]);
  }, []);
  
  // Search for locations when query changes
  useEffect(() => {
    const searchLocations = async () => {
      if (locationQuery.length < 2) {
        setLocationResults([]);
        return;
      }
      
      setLoadingLocation(true);
      try {
        const results = await googleMapsService.searchLocations(locationQuery);
        setLocationResults(results);
        
        // Update Google Maps API credit balance
        updateServiceCredits('Google Maps API', googleMapsService.getCreditBalance());
      } catch (error) {
        console.error('Error searching locations:', error);
      } finally {
        setLoadingLocation(false);
      }
    };
    
    const debounceTimeout = setTimeout(searchLocations, 500);
    
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [locationQuery]);
  
  // Get weather when location is selected
  useEffect(() => {
    const getWeatherData = async () => {
      if (!selectedLocation) return;
      
      setLoadingWeather(true);
      try {
        const currentWeather = await weatherService.getCurrentWeather(
          selectedLocation.lat, 
          selectedLocation.lng
        );
        
        setWeather(currentWeather);
        
        // Update Weather API credit balance
        updateServiceCredits('Weather API', weatherService.getCreditBalance());
      } catch (error) {
        console.error('Error getting weather:', error);
      } finally {
        setLoadingWeather(false);
      }
    };
    
    getWeatherData();
  }, [selectedLocation]);
  
  // Search for flights when location is selected
  useEffect(() => {
    const searchFlights = async () => {
      if (!selectedLocation) return;
      
      setLoadingFlights(true);
      try {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        
        const formattedDate = nextWeek.toISOString().split('T')[0];
        
        const results = await flightSearchService.searchFlights({
          origin: 'JFK', // New York as default origin
          destination: selectedLocation.country,
          departureDate: formattedDate,
          passengers: 1,
          cabinClass: 'economy'
        });
        
        setFlights(results.slice(0, 3)); // Show max 3 flights
        
        // Update Flight Search API credit balance
        updateServiceCredits('Flight Search API', flightSearchService.getCreditBalance());
      } catch (error) {
        console.error('Error searching flights:', error);
      } finally {
        setLoadingFlights(false);
      }
    };
    
    searchFlights();
  }, [selectedLocation]);
  
  // Update service credits
  const updateServiceCredits = (serviceName: string, credits: number) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.name === serviceName 
          ? { ...service, credits } 
          : service
      )
    );
  };
  
  // Handle location selection
  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    setLocationQuery(location.name);
    setLocationResults([]);
  };
  
  return (
    <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-md`}>
      <h2 className="text-lg font-semibold mb-4">API Integrations Demo</h2>
      
      {/* Service Credits Display */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {services.map((service) => (
          <div 
            key={service.name}
            className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded text-sm`}
          >
            <div className="flex items-center gap-1 mb-1">
              {service.icon}
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-1.5">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ width: `${(service.credits / service.maxCredits) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs mt-1 text-right">
              {service.credits} / {service.maxCredits} credits
            </div>
          </div>
        ))}
      </div>
      
      {/* Location Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Search Destination</label>
        <div className="relative">
          <input
            type="text"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="Enter city or country"
            className={`w-full p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {loadingLocation && (
            <div className="absolute right-2 top-2 animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          )}
          
          {locationResults.length > 0 && (
            <div className={`absolute z-10 mt-1 w-full ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg max-h-60 overflow-auto`}>
              {locationResults.map((location) => (
                <div
                  key={location.id}
                  className={`p-2 cursor-pointer ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                  onClick={() => handleSelectLocation(location)}
                >
                  <div className="font-medium">{location.name}</div>
                  <div className="text-xs text-gray-500">{location.formattedAddress}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Selected Location Info */}
      {selectedLocation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weather Info */}
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Cloud size={16} className="mr-1" />
              Weather in {selectedLocation.name}
            </h3>
            
            {loadingWeather ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
              </div>
            ) : weather ? (
              <div className="text-center">
                <div className="text-xl font-bold">{Math.round(weather.temp)}°C</div>
                <div className="text-sm">{weather.weather[0].main}</div>
                <div className="text-xs mt-1 flex justify-between">
                  <span>Humidity: {weather.humidity}%</span>
                  <span>Wind: {weather.wind_speed} km/h</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-2 text-sm">No weather data available</div>
            )}
          </div>
          
          {/* Flights Info */}
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Plane size={16} className="mr-1" />
              Flights to {selectedLocation.name}
            </h3>
            
            {loadingFlights ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
              </div>
            ) : flights.length > 0 ? (
              <div className="space-y-2 text-sm">
                {flights.map((flight) => (
                  <div 
                    key={flight.id} 
                    className={`p-2 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-white'} flex justify-between items-center`}
                  >
                    <div>
                      <div className="font-medium">{flight.segments[0].airline.name}</div>
                      <div className="text-xs">
                        {new Date(flight.segments[0].departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        {' → '}
                        {new Date(flight.segments[0].arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${flight.price.amount}</div>
                      <div className="text-xs flex items-center justify-end gap-1">
                        <CreditCard size={12} />
                        <span>{flight.seatsAvailable} seats</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-2 text-sm">No flights available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationDemo; 