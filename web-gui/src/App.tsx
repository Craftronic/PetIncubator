import { useState } from 'react';
import './App.css'
import Icon from '@mdi/react';
import { mdiThermometer, mdiHeart, mdiWaterPercent, mdiLightbulbOutline, mdiCog, mdiGithub, mdiHome } from '@mdi/js';
import { TemperatureCard, HumidityCard, BrightnessCard, SettingsCard } from './Cards';

type Cards = 'home' | 'temperature' | 'humidity' | 'brightness' | 'settings';

interface NavbarItem {
  id: Cards;
  icon: string;
}

function App() {
  const [activeCard, setActiveCard] = useState<Cards>('home');

  const getContent = () => {
    switch (activeCard) {
      case 'temperature':
        return <TemperatureCard />;
      case 'humidity':
        return <HumidityCard />;
      case 'brightness':
        return <BrightnessCard />;
      case 'settings':
        return <SettingsCard />;
      // ... other cases
      default:
        return 'Welcome';
    }
  };

  const handleButtonClick = (buttonName: Cards) => {
    setActiveCard(buttonName);
  };

  const navbarItems: NavbarItem[] = [
    { id: 'home', icon: mdiHome },
    { id: 'temperature', icon: mdiThermometer },
    { id: 'humidity', icon: mdiWaterPercent },
    { id: 'brightness', icon: mdiLightbulbOutline },
    { id: 'settings', icon: mdiCog },
  ];

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="aspect-[4/3] h-72 bg-gray-200 rounded-lg shadow-lg relative md:scale-125 lg:scale-150">
          {/* Centering the Content */}
          <div className="flex justify-center items-center h-[calc(100%-4rem)]">
            {/* Dynamic Content */}
            <div>
              {getContent()}
            </div>
          </div>

          {/* Bottom Navbar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-300 h-16 rounded-b-lg">
            <div className="flex justify-between items-center h-full">
              {navbarItems.map(item => (
                <div 
                  key={item.id}
                  className="flex-1 flex justify-center items-center cursor-pointer"
                  onClick={() => handleButtonClick(item.id)}>
                  <div className={`rounded-full p-2 hover:bg-gray-400 hover:bg-opacity-50`}>
                    <Icon path={item.icon} size={1} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Source Disclaimer and ESPHome Note */}
          <div className="absolute -bottom-10 left-0 right-0 text-xs text-center text-gray-500 md:scale-90 lg:scale-75">
            <div className="flex justify-center items-center w-full">
              {/* GitHub Link and Icon */}
              <div className="flex-1 flex justify-center items-center">
                <Icon path={mdiGithub} size={1} />
                <a href="https://github.com/Craftronic/PetIncubator" className="ml-2">
                  Craftronic PetIncubator
                </a>
              </div>

              {/* Heart Icon and ESPHome Text */}
              <div className="flex-1 flex justify-center items-center">
                <Icon path={mdiHeart} size={1} color="red" className="opacity-50" />
                <a href="https://esphome.io/" className="ml-2">
                  Based on ESPHome
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default App
