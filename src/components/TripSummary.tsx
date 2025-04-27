import { ExternalLink, Clock, Users, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const TripSummary = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Your Upcoming Trip</h2>
      <motion.div 
        className="relative rounded-xl overflow-hidden"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-44 relative">
          <img 
            src="https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Tokyo" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/20 backdrop-blur-md">
            <ExternalLink size={16} className="text-white" />
          </div>
          
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-3xl font-bold mb-1">TOKYO</h3>
            <p className="text-sm opacity-90">27.01.2025 - 02.02.2025</p>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-indigo-600'} p-3 flex items-center justify-between text-white`}>
          <div className="flex items-center">
            <Clock size={16} className="mr-1.5" />
            <p className="text-sm">
              <span className="font-medium">8 Days</span>
              <span className="opacity-80 ml-1">Duration</span>
            </p>
          </div>
          
          <div className="flex items-center">
            <Users size={16} className="mr-1.5" />
            <p className="text-sm">
              <span className="font-medium">4 (2M,2F)</span>
              <span className="opacity-80 ml-1">Group Size</span>
            </p>
          </div>
          
          <div className="flex items-center">
            <CheckSquare size={16} className="mr-1.5" />
            <p className="text-sm">
              <span className="font-medium">14</span>
              <span className="opacity-80 ml-1">Activities</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TripSummary;