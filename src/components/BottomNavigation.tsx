import { Home, Search, Plus, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface BottomNavigationProps {
  onExpandPane: (pane: string) => void;
  activePane: string | null;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onExpandPane, activePane }) => {
  const { isDarkMode } = useTheme();
  
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'add', icon: Plus, label: 'Add' },
    { id: 'favorites', icon: Heart, label: 'Favorites' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <motion.div 
        className={`flex justify-around items-center py-2 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } shadow-lg border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePane === item.id;
          
          return (
            <button
              key={item.id}
              className="flex flex-col items-center justify-center w-16 py-1 relative"
              onClick={() => onExpandPane(item.id)}
            >
              <div className={`p-1.5 rounded-full ${isActive ? 'bg-indigo-100 text-indigo-600' : ''}`}>
                <Icon size={22} strokeWidth={2} className={isActive ? 'text-indigo-600' : ''} />
              </div>
              <span className="text-xs mt-0.5">{item.label}</span>
              
              {isActive && (
                <motion.div 
                  className="absolute -top-1 left-1/2 w-1.5 h-1.5 rounded-full bg-indigo-600"
                  layoutId="activeIndicator"
                  style={{ x: '-50%' }}
                />
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default BottomNavigation;