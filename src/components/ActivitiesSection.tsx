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
          <p className="text-xs opacity-80 mb-2">{location}</p>
          
          <div className="text-xs">
            <div className="flex items-center mb-1">
              <Clock size={12} className="mr-1.5 opacity-70" />
              <span>Timing: {time} {timeOfDay}</span>
            </div>
            <div className="flex items-center mb-1">
              <Calendar size={12} className="mr-1.5 opacity-70" />
              <span>Duration: {duration}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={12} className="mr-1.5 opacity-70" />
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
        <button className="text-sm text-indigo-600 font-medium">See all</button>
      </div>
      
      <div className="mb-4">
        <div className={`inline-flex rounded-lg p-1 mb-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
              activeView === 'day' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveView('day')}
          >
            Day Plan
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
              activeView === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-500 hover:text-gray-700'
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
                className={`flex flex-col items-center justify-center min-w-[3.5rem] h-16 rounded-lg ${
                  selectedDay === index
                    ? 'bg-indigo-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-white text-gray-700'
                } transition-colors`}
              >
                <span className="text-xs font-medium">{day}</span>
                <span className="text-lg font-bold">{dayNum}</span>
                {index === 0 && (
                  <span className="text-[0.6rem] opacity-80">{month}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} rounded-lg p-3`}>
        <div className="flex items-center mb-3">
          <div className={`flex items-center justify-center w-6 h-6 rounded-full ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-600'} text-white font-medium text-xs mr-2`}>
            1
          </div>
          <h3 className="font-medium">Day 1, 27.01.2025</h3>
          <div className="ml-auto flex items-center text-indigo-600 text-sm">
            <span className="font-medium">3</span>
            <span className="ml-1">Activities</span>
          </div>
        </div>
        
        {activities.map((activity, index) => (
          <ActivityCard key={index} {...activity} />
        ))}
        
        <div className="relative py-2">
          <div className={`absolute left-1/2 -translate-x-1/2 px-4 py-1 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} text-xs font-medium`}>
            You can only view and comment on this trip
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivitiesSection;