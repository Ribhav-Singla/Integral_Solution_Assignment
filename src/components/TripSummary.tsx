import { Clock, Users, FileText, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const TripSummary = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="mb-6">
      <motion.div 
        className="relative rounded-xl overflow-hidden"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-60 relative">
          <img 
            src="https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Tokyo" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          <div className="absolute top-4 right-4 p-2 rounded-lg">
            <ArrowUpRight size={20} className="text-white" />
          </div>
          
          <div className="absolute top-8 left-8 text-white">
            <h3 className="text-5xl font-bold mb-2">TOKYO</h3>
            <p className="text-lg opacity-95">27.01.2025 - 02.02.2025</p>
          </div>
        </div>
        
        <div className="p-4 pt-2 pb-2 flex items-center justify-between text-white absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-black/30">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-2">
              <Clock size={18} className="text-lime-500" />
            </div>
            <div>
              <p className="text-base font-bold sm:text-base text-sm">8 Days</p>
              <p className="text-xs opacity-80 sm:text-xs text-[10px]">Duration</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-2">
              <Users size={18} className="text-lime-500" />
            </div>
            <div>
              <p className="text-base font-bold sm:text-base text-sm">4 (2M,2F)</p>
              <p className="text-xs opacity-80 sm:text-xs text-[10px]">Group Size</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-2">
              <FileText size={18} className="text-lime-500" />
            </div>
            <div>
              <p className="text-base font-bold sm:text-base text-sm">14</p>
              <p className="text-xs opacity-80 sm:text-xs text-[10px]">Activities</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TripSummary;