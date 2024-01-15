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

interface entityConfig {
  unique_id: string;
  domain: string;
  id: string;
  state: string;
  detail: string;
  value: string;
  name: string;
  when: string;
  icon?: string;
  option?: string[];
  assumed_state?: boolean;
  brightness?: number;
  target_temperature?: number;
  target_temperature_low?: number;
  target_temperature_high?: number;
  min_temp?: number;
  max_temp?: number;
  min_value?: number;
  max_value?: number;
  step?: number;
  min_length?: number;
  max_length?: number;
  pattern?: string;
  current_temperature?: number;
  modes?: number[];
  mode?: number;
  speed_count?: number;
  speed_level?: number;
  speed: string;
  effects?: string[];
  effect?: string;
  has_action?: boolean;
}

function getBasePath() {
  let str = window.location.pathname;
  str = 'http://192.168.1.188/';
  return str.endsWith("/") ? str.slice(0, -1) : str;
}

window.source = new EventSource(getBasePath() + "/events");

const entities: entityConfig[] = [];

window.source.addEventListener("state", (e: Event) => {
  const messageEvent = e as MessageEvent;
  const data = JSON.parse(messageEvent.data);
  let idx = entities.findIndex((x: entityConfig) => x.unique_id === data.id);
  if (idx === -1 && data.id) {
    // Dynamically add discovered..
    let parts = data.id.split("-");
    let entity = {
      ...data,
      domain: parts[0],
      unique_id: data.id,
      id: parts.slice(1).join("-"),
    } as entityConfig;
    entity.has_action = true;
    entities.push(entity);
    entities.sort((a, b) => (a.name < b.name ? -1 : 1));
  }
  console.log(entities);
});

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
