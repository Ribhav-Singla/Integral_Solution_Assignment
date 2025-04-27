import { CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface HotelProps {
  name: string;
  image: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: 'confirmed' | 'pending';
  rating: string;
}

const HotelCard: React.FC<HotelProps> = ({ 
  name, 
  image, 
  checkIn, 
  checkOut, 
  nights, 
  status,
  rating
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden`}>
      <div className="h-24 relative">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-indigo-600 rounded px-2 py-0.5 text-white text-xs">
          ⭐ {rating}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-base mb-1">{name}</h3>
        <div className="text-xs opacity-80 mb-1">
          Check in: {checkIn}<br />
          Check out: {checkOut}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{nights} Nights</span>
          <span className={`flex items-center text-xs ${status === 'confirmed' ? 'text-green-500' : 'text-amber-500'}`}>
            {status === 'confirmed' ? (
              <>
                <CheckCircle size={14} className="mr-1" />
                Confirmed
              </>
            ) : (
              <>
                <AlertCircle size={14} className="mr-1" />
                Pending
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

const AccommodationSection = () => {
  const hotels: HotelProps[] = [
    {
      name: 'Shinagawa Prince Hotel',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      checkIn: '26.01.2025, 11:15 pm',
      checkOut: '28.01.2025, 11:15 am',
      nights: 2,
      status: 'confirmed',
      rating: '4.3 Very Good'
    },
    {
      name: 'Mercure Tokyo Hotel',
      image: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      checkIn: '28.01.2025, 6:00 pm',
      checkOut: '30.01.2025, 11:30 am',
      nights: 2,
      status: 'pending',
      rating: '4.7 Very Good'
    }
  ];
  
  return (
    <motion.div 
      className="mb-5"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Accommodation</h2>
        <button className="text-sm text-indigo-600 font-medium">See all</button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {hotels.map((hotel, index) => (
          <HotelCard key={index} {...hotel} />
        ))}
      </div>
    </motion.div>
  );
};

export default AccommodationSection;