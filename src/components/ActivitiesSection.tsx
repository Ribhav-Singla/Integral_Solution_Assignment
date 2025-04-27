import { useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface ActivityProps {
  name: string;
  location: string;
  image: string;
  time: string;
  timeOfDay: string;
  duration: string;
  pickUp: string;
}

const ActivityCard: React.FC<ActivityProps> = ({ 
  name, 
  location, 
  image, 
  time, 
  timeOfDay,
  duration,
  pickUp
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden mb-3`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex">
        <div className="w-1/3">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <div className="w-2/3 p-3">
          <h3 className="font-medium text-base leading-tight">{name}</h3>
          <br />
          
          <div className="text-xs">
            <div className="flex items-center mb-1">
            
              <span>Timing: {time} {timeOfDay}</span>
            </div>
            <div className="flex items-center mb-1">
             
              <span>Duration: {duration}</span>
            </div>
            <div className="flex items-center">
             
              <span>Pick up: {pickUp}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ActivitiesSection = () => {
  const { isDarkMode } = useTheme();
  const [activeView, setActiveView] = useState<'day' | 'all'>('day');
  const [selectedDay, setSelectedDay] = useState(0);
  
  const dates = [
    new Date(2025, 0, 27), // Jan 27, 2025 (Monday)
    new Date(2025, 0, 28), // Jan 28, 2025
    new Date(2025, 0, 29), // Jan 29, 2025
    new Date(2025, 0, 30), // Jan 30, 2025
    new Date(2025, 0, 31), // Jan 31, 2025
    new Date(2025, 1, 1),  // Feb 1, 2025
    new Date(2025, 1, 2),  // Feb 2, 2025
  ];
  
  const activities: ActivityProps[] = [
    {
      name: 'Senso-ji Temple & Nakamise Shopping Street',
      location: 'Senso-ji',
      image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      time: '8:15 am',
      timeOfDay: 'Morning',
      duration: '3 hours',
      pickUp: 'From Hotel'
    },
    {
      name: 'Tokyo Sky Tree',
      location: 'Sumida City',
      image: 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      time: '1:00 pm',
      timeOfDay: 'Afternoon',
      duration: '3 hours',
      pickUp: 'From Nakamise Street'
    },
    {
      name: 'Kimono Wearing',
      location: 'Asakusa District',
      image: 'https://images.pexels.com/photos/5371989/pexels-photo-5371989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      time: '4:30 pm',
      timeOfDay: 'Evening',
      duration: '2 hours',
      pickUp: 'From Hotel'
    }
  ];
  
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Activities</h2>
        <button className={`text-sm font-medium ${!isDarkMode ? 'text-indigo-600' : 'text-lime-500'}`}>See all</button>
      </div>
      
      <div className="mb-4">
        <div className={`flex space-x-2 mb-3 overflow-hidden`}>
          <button 
            className={`px-4 py-2 text-sm font-medium transition rounded-lg ${
              activeView === 'day' 
                ? isDarkMode ? 'bg-lime-500 text-black' : 'bg-indigo-600 text-white'
                : isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setActiveView('day')}
          >
            Day Plan
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium transition rounded-lg ${
              activeView === 'all' 
                ? isDarkMode ? 'bg-lime-500 text-black' : 'bg-indigo-600 text-white'
                : isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setActiveView('all')}
          >
            14 Activities
          </button>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
          {dates.map((date, index) => {
            const day = format(date, 'E').toUpperCase();
            const dayNum = format(date, 'd');
            const month = format(date, 'MMM').toUpperCase();
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`relative flex flex-col items-center justify-center min-w-[3.5rem] h-16 rounded-lg ${
                  selectedDay === index
                    ? isDarkMode ? 'bg-lime-500 text-black' : 'bg-indigo-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-700 text-gray-300'
                } transition-colors`}
              >
                {index === 0 && (
                  <div className={`absolute top-0 left-0 h-full w-6 ${isDarkMode ? 'bg-lime-500 text-black' : 'bg-indigo-600 text-white'} flex items-center justify-center rounded-l-lg`}>
                    <span className="text-[0.6rem] font-bold transform -rotate-90">JAN</span>
                  </div>
                )}
                <span className={`text-xs font-medium ${index === 0 ? 'ml-4 pl-1' : ''}`}>{day}</span>
                <span className={`text-lg font-bold ${index === 0 ? 'ml-4' : ''}`}>{dayNum}</span>
                {index === dates.length - 1 && (
                  <div className="absolute top-0 right-0 h-full w-6 bg-gray-500 flex items-center justify-center rounded-r-lg">
                    <span className="text-[0.6rem] text-white font-bold transform -rotate-90">FEB</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} rounded-lg p-3`}>
        <div className="flex items-center mb-3">
          <div className={`flex items-center justify-center rounded-full px-3 py-1 ${isDarkMode ? 'bg-lime-500 text-black' : 'bg-indigo-600 text-white'} font-medium text-sm mr-2`}>
            Day 1 <span className="ml-2">27.01.2025</span>
          </div>
          <div className={`ml-auto flex items-center text-sm ${!isDarkMode ? 'text-indigo-600' : 'text-lime-500'}`}>
            <span className="mr-1">🧳</span>
            <span className="font-medium">3 Activities</span>
          </div>
        </div>
        
        {activities.map((activity, index) => (
          <ActivityCard key={index} {...activity} />
        ))}
        
        
      </div>
    </motion.div>
  );
};

export default ActivitiesSection;