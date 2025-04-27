import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  title?: string;
}

const Navbar = ({ title = "Travel Planner" }: NavbarProps) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className={`w-full p-4 flex justify-between items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div 
        className="text-lg font-semibold cursor-pointer" 
        onClick={() => navigate('/')}
      >
        {title}
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar; 