import { useState } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import TripSummary from '../components/TripSummary';
import FlightDetails from '../components/FlightDetails';
import AccommodationSection from '../components/AccommodationSection';
import ActivitiesSection from '../components/ActivitiesSection';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import ExpandedPane from '../components/ExpandedPane';

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [expandedPane, setExpandedPane] = useState<string | null>(null);
  
  const handleExpandPane = (pane: string) => {
    setExpandedPane(pane === expandedPane ? null : pane);
  };

  return (
    <div className={`min-h-screen pb-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#f7f7f7] text-gray-900'} transition-colors duration-300`}>
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="max-w-md mx-auto px-5 py-5">
        <header className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold">Hello Chhavi!</h1>
            <p className="text-sm opacity-80">Ready for the trip?</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center">
            <span className="text-white font-medium">C</span>
          </div>
        </header>
        
        <main className="space-y-6">
          <TripSummary />
          <FlightDetails />
          <AccommodationSection />
          <ActivitiesSection />
        </main>
      </div>
      
      <BottomNavigation onExpandPane={handleExpandPane} activePane={expandedPane} />
      
      {expandedPane && (
        <ExpandedPane type={expandedPane} onClose={() => setExpandedPane(null)} />
      )}
    </div>
  );
};

export default Dashboard;