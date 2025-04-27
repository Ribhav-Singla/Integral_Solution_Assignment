import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface ExpandedPaneProps {
  type: string;
  onClose: () => void;
}

const ExpandedPane: React.FC<ExpandedPaneProps> = ({ type, onClose }) => {
  const { isDarkMode } = useTheme();
  
  const getPaneContent = () => {
    switch (type) {
      case 'add':
        return (
          <div className="p-4 space-y-5">
            <h2 className="text-xl font-bold mb-4">Add to Your Trip</h2>
            <OptionCard 
              title="Add Accommodation" 
              description="Find and book hotels, apartments or homestays"
              icon="🏨"
            />
            <OptionCard 
              title="Add Activity" 
              description="Discover tours, attractions and experiences"
              icon="🎭"
            />
            <OptionCard 
              title="Add Transport" 
              description="Book flights, trains, buses or car rentals"
              icon="✈️"
            />
            <OptionCard 
              title="Add Restaurant" 
              description="Find and book restaurants for your trip"
              icon="🍽️"
            />
          </div>
        );
      case 'search':
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Search</h2>
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg mb-4`}>
              <input 
                type="text"
                placeholder="Search destinations, activities..."
                className="w-full bg-transparent outline-none"
              />
            </div>
            <div className="mt-3">
              <h3 className="font-medium mb-2">Recent Searches</h3>
              <div className="space-y-2">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg`}>Tokyo, Japan</div>
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg`}>Kyoto Temples</div>
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg`}>Mount Fuji Tours</div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg">This pane is under development</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-20 flex flex-col"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      
      <motion.div 
        className={`relative mt-auto rounded-t-3xl overflow-hidden ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
        } max-h-[80vh] overflow-y-auto`}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
      >
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
        
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 z-10"
          onClick={onClose}
        >
          <X size={18} />
        </button>
        
        <div className="h-full overflow-y-auto pb-16">
          {getPaneContent()}
        </div>
      </motion.div>
    </motion.div>
  );
};

interface OptionCardProps {
  title: string;
  description: string;
  icon: string;
}

const OptionCard: React.FC<OptionCardProps> = ({ title, description, icon }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl flex items-center`}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 text-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm opacity-70">{description}</p>
      </div>
    </motion.div>
  );
};

export default ExpandedPane;