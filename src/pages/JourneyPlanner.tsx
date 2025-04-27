import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ThemeToggle';
import TravelerTypeButton from '../components/TravelerTypeButton';

type TravelerType = 'solo' | 'couple' | 'family' | 'friends' | null;

const JourneyPlanner = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [travelerType, setTravelerType] = useState<TravelerType>(null);
  
  const handleContinue = () => {
    if (destination && travelerType) {
      navigate('/dashboard');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#f7f7f7] text-gray-900'}`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-1">Plan Your Journey, Your Way!</h1>
        <p className="text-sm opacity-80 mb-8">Let's create your personalised travel experience</p>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block font-medium">Where would you like to go?</label>
            <div className={`flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg px-4 py-3 transition-colors duration-300`}>
              <MapPin size={20} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Enter Destination" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={`w-full outline-none bg-transparent`}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">How long will you stay?</label>
            <div className={`flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg px-4 py-3 transition-colors duration-300`}>
              <Calendar size={20} className="text-gray-400 mr-2" />
              <select 
                className={`w-full outline-none bg-transparent appearance-none cursor-pointer`}
                defaultValue=""
              >
                <option value="" disabled>Select Duration</option>
                <option value="weekend">Weekend (2-3 days)</option>
                <option value="week">One Week</option>
                <option value="twoweeks">Two Weeks</option>
                <option value="month">One Month</option>
              </select>
              <ArrowRight size={16} className="text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block font-medium">Who are you traveling with?</label>
            <div className="grid grid-cols-2 gap-3">
              <TravelerTypeButton 
                type="solo" 
                isSelected={travelerType === 'solo'} 
                onClick={() => setTravelerType('solo')} 
              />
              <TravelerTypeButton 
                type="couple" 
                isSelected={travelerType === 'couple'} 
                onClick={() => setTravelerType('couple')} 
              />
              <TravelerTypeButton 
                type="family" 
                isSelected={travelerType === 'family'} 
                onClick={() => setTravelerType('family')} 
              />
              <TravelerTypeButton 
                type="friends" 
                isSelected={travelerType === 'friends'} 
                onClick={() => setTravelerType('friends')} 
              />
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default JourneyPlanner;