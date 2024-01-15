import { useState, useEffect } from 'react';
import './App.css'
import Icon from '@mdi/react';
import { mdiThermometer, mdiHeart, mdiWaterPercent, mdiLightbulbOutline, mdiCog, mdiGithub, mdiHome } from '@mdi/js';
import { TemperatureCard, HumidityCard, BrightnessCard, SettingsCard } from './Cards';
import { getBasePath } from './utils/getBasePath';



window.source = new EventSource(getBasePath() + "/events");

function App() {
  const [activeCard, setActiveCard] = useState<Cards>('home');
  const [entities, setEntities] = useState<entityConfig[]>([]);

  useEffect(() => {
    const handleState = (e: Event) => {
      const messageEvent = e as MessageEvent;
      const data = JSON.parse(messageEvent.data);
      setEntities(prevEntities => {
        let idx = prevEntities.findIndex((x: entityConfig) => x.unique_id === data.id);
        if (idx === -1 && data.id) {
          let parts = data.id.split("-");
          let entity = {
            ...data,
            domain: parts[0],
            unique_id: data.id,
            id: parts.slice(1).join("-"),
            has_action: true,
          } as entityConfig;
          return [...prevEntities, entity].sort((a, b) => (a.name < b.name ? -1 : 1));
        }

        return prevEntities;
      });
    };

    window.source.addEventListener("state", handleState);
  }, []);

  console.log(entities);

  const getContent = () => {
    switch (activeCard) {
      case 'temperature':
        return <TemperatureCard entities={entities} />;
      case 'humidity':
        return <HumidityCard entities={entities} />;
      case 'brightness':
        return <BrightnessCard entities={entities} />;
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
                  <div className={`rounded-full p-2 ${item.id === activeCard && 'bg-gray-400 bg-opacity-50'} `}>
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
