import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { MapPin, Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';
import Navbar from '../components/Navbar';
import TravelerTypeButton from '../components/TravelerTypeButton';

type TravelerType = 'solo' | 'couple' | 'family' | 'friends' | null;
type DurationType = 'weekend' | 'week' | 'twoweeks' | 'month' | '';

const JourneyPlanner = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [travelerType, setTravelerType] = useState<TravelerType>(null);
  const [duration, setDuration] = useState<DurationType>('');
  const [durationLabel, setDurationLabel] = useState('Select Duration');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDurationSelect = (value: DurationType, label: string) => {
    setDuration(value);
    setDurationLabel(label);
    setIsDropdownOpen(false);
  };
  
  const handleContinue = () => {
    if (destination && travelerType && duration) {
      navigate('/dashboard');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#f7f7f7] text-gray-900'}`}>
      <Navbar />
      
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
            <div className="relative" ref={dropdownRef}>
              <div 
                className={`flex items-center justify-between ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg px-4 py-3 transition-colors duration-300 cursor-pointer`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center">
                  <Calendar size={20} className="text-gray-400 mr-2" />
                  <span className={duration ? '' : 'text-gray-400'}>{durationLabel}</span>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              
              {isDropdownOpen && (
                <div className={`absolute mt-1 w-full z-10 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                  <div 
                    className="px-4 py-2 hover:bg-opacity-10 hover:bg-gray-500 cursor-pointer"
                    onClick={() => handleDurationSelect('weekend', 'Weekend (2-3 days)')}
                  >
                    Weekend (2-3 days)
                  </div>
                  <div 
                    className="px-4 py-2 hover:bg-opacity-10 hover:bg-gray-500 cursor-pointer"
                    onClick={() => handleDurationSelect('week', 'One Week')}
                  >
                    One Week
                  </div>
                  <div 
                    className="px-4 py-2 hover:bg-opacity-10 hover:bg-gray-500 cursor-pointer"
                    onClick={() => handleDurationSelect('twoweeks', 'Two Weeks')}
                  >
                    Two Weeks
                  </div>
                  <div 
                    className="px-4 py-2 hover:bg-opacity-10 hover:bg-gray-500 cursor-pointer"
                    onClick={() => handleDurationSelect('month', 'One Month')}
                  >
                    One Month
                  </div>
                </div>
              )}
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
        
        <div className="mt-10 w-full">
          <Button onClick={handleContinue} className="w-full">Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default JourneyPlanner;