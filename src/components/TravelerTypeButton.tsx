import { User, Users, Home } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface TravelerTypeButtonProps {
  type: 'solo' | 'couple' | 'family' | 'friends';
  isSelected: boolean;
  onClick: () => void;
}

const TravelerTypeButton: React.FC<TravelerTypeButtonProps> = ({ type, isSelected, onClick }) => {
  const { isDarkMode } = useTheme();
  
  const getIcon = () => {
    switch (type) {
      case 'solo':
        return <User size={18} />;
      case 'couple':
        return <Users size={18} />;
      case 'family':
        return <Home size={18} />;
      case 'friends':
        return <Users size={18} />;
      default:
        return <User size={18} />;
    }
  };
  
  const getLabel = () => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <motion.button
      onClick={onClick}
      className={`h-14 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 ${
        isSelected
          ? 'bg-indigo-600 text-white'
          : isDarkMode
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            : 'bg-white text-gray-800 hover:bg-gray-100'
      }`}
      whileTap={{ scale: 0.98 }}
    >
      {getIcon()}
      <span className="font-medium">{getLabel()}</span>
    </motion.button>
  );
};

export default TravelerTypeButton;