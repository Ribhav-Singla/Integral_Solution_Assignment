import { Plane } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const FlightDetails = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      className="mb-5"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Flight Details</h2>
        <button className="text-sm text-indigo-600 font-medium">See all</button>
      </div>
      
      <div className={`${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-600'} rounded-xl p-4 text-white flex items-center justify-between`}>
        <div>
          <p className="font-medium mb-0.5">26.01.2025, 10:50 am</p>
          <div className="flex items-center space-x-2">
            <div className="font-bold">DEL</div>
            <div className="text-white/70">→</div>
            <div className="font-bold">NRT</div>
          </div>
          <div className="flex text-xs opacity-90 mt-1">
            <span>Delhi, India</span>
            <span className="mx-1">→</span>
            <span>Narita, Tokyo</span>
          </div>
        </div>
        
        <div className="ml-auto">
          <div className="w-12 h-10 relative">
            <Plane className="text-white/90 transform rotate-45" size={40} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightDetails;