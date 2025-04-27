// Mock Weather API Service
// This service simulates integration with a Weather API with free credits

interface WeatherCondition {
  id: string;
  main: string;
  description: string;
  icon: string;
}

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  weather: WeatherCondition[];
}

interface ForecastDay {
  date: string;
  day: WeatherData;
  night: WeatherData;
}

// Mock weather icons map
const weatherIcons: Record<string, string> = {
  'clear': 'sun',
  'clouds': 'cloud',
  'rain': 'cloud-rain',
  'drizzle': 'cloud-drizzle',
  'thunderstorm': 'cloud-lightning',
  'snow': 'cloud-snow',
  'mist': 'cloud-fog',
  'fog': 'cloud-fog'
};

class WeatherService {
  private apiKey: string = 'mock-weather-api-key-54321';
  private creditBalance: number = 50; // Free credits available
  
  /**
   * Get current weather for a location
   */
  async getCurrentWeather(lat: number, lng: number): Promise<WeatherData> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Deduct credits
    this.deductCredits(1);
    
    // Generate pseudo-random weather based on coordinates
    return this.generateWeatherData(lat, lng);
  }
  
  /**
   * Get weather forecast for the next 5 days
   */
  async getForecast(lat: number, lng: number, days: number = 5): Promise<ForecastDay[]> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Deduct credits - forecasts cost more
    this.deductCredits(days);
    
    const forecast: ForecastDay[] = [];
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
      const forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + i);
      
      forecast.push({
        date: forecastDate.toISOString().split('T')[0],
        day: this.generateWeatherData(lat, lng, i, 'day'),
        night: this.generateWeatherData(lat, lng, i, 'night')
      });
    }
    
    return forecast;
  }
  
  /**
   * Get weather alert for severe conditions
   */
  async getWeatherAlerts(lat: number, lng: number): Promise<string[]> {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Deduct credits
    this.deductCredits(3);
    
    // Only generate alerts occasionally based on a deterministic but seemingly random pattern
    const alertSeed = Math.sin(lat * lng) * 10000;
    const hasAlert = (alertSeed % 7) < 1; // About 1 in 7 chance
    
    if (hasAlert) {
      const alertTypes = [
        "Heavy rain expected in the next 24 hours",
        "High winds advisory for your destination",
        "Unusually high temperatures expected",
        "Air quality alert in effect",
        "Thunderstorms possible during your stay"
      ];
      
      return [alertTypes[Math.floor(Math.abs(alertSeed) % alertTypes.length)]];
    }
    
    return [];
  }
  
  /**
   * Get icon for weather condition
   */
  getWeatherIcon(condition: string): string {
    const conditionLower = condition.toLowerCase();
    
    for (const [key, value] of Object.entries(weatherIcons)) {
      if (conditionLower.includes(key)) {
        return value;
      }
    }
    
    return 'help-circle'; // Default icon if no match
  }
  
  /**
   * Get remaining credit balance
   */
  getCreditBalance(): number {
    return this.creditBalance;
  }
  
  /**
   * Generate weather data based on coordinates
   * Uses a deterministic algorithm so the same coordinates always get similar weather
   */
  private generateWeatherData(lat: number, lng: number, dayOffset: number = 0, timeOfDay: 'day' | 'night' = 'day'): WeatherData {
    // Use coordinates as seed for pseudo-random but deterministic generation
    const seed = (Math.sin(lat + lng + dayOffset) + 1) * 5000;
    
    // Temperature is influenced by latitude (colder at higher latitudes)
    // Adjust for northern/southern hemispheres
    const latEffect = (lat > 0) ? 
      40 - Math.abs(lat) * 0.5 : // Northern hemisphere
      30 - Math.abs(lat) * 0.3;  // Southern hemisphere
      
    // Adjust base temperature for time of day
    const baseTemp = timeOfDay === 'day' ? latEffect : latEffect - 8;
    
    // Add some variation based on seed
    const temp = baseTemp + (seed % 10) - 5;
    
    // Generate weather condition
    const conditionSeed = Math.abs(seed) % 100;
    let weather: WeatherCondition;
    
    if (conditionSeed < 60) {
      // 60% chance of clear/partly cloudy
      weather = {
        id: 'clear',
        main: 'Clear',
        description: 'Clear sky',
        icon: 'sun'
      };
    } else if (conditionSeed < 80) {
      // 20% chance of clouds
      weather = {
        id: 'clouds',
        main: 'Clouds',
        description: 'Scattered clouds',
        icon: 'cloud'
      };
    } else if (conditionSeed < 95) {
      // 15% chance of rain
      weather = {
        id: 'rain',
        main: 'Rain',
        description: 'Light rain',
        icon: 'cloud-rain'
      };
    } else {
      // 5% chance of thunderstorm
      weather = {
        id: 'thunderstorm',
        main: 'Thunderstorm',
        description: 'Thunderstorm',
        icon: 'cloud-lightning'
      };
    }
    
    return {
      temp: temp,
      feels_like: temp - 2 + (seed % 4),
      humidity: 40 + (seed % 40),
      pressure: 1000 + (seed % 30),
      wind_speed: 2 + (seed % 20) / 2,
      weather: [weather]
    };
  }
  
  /**
   * Deduct credits for API usage
   */
  private deductCredits(amount: number): void {
    this.creditBalance = Math.max(0, this.creditBalance - amount);
    console.log(`Weather API credits used: ${amount}. Remaining balance: ${this.creditBalance}`);
  }
}

// Export a singleton instance
const weatherService = new WeatherService();
export default weatherService; 