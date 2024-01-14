import React, { useState } from 'react';
import './App.css'
import Icon from '@mdi/react';
import kittensLogo from './assets/device_splash_screen_no_background.png'
import { mdiThermometer, mdiHeart, mdiWaterPercent, mdiLightbulbOutline, mdiCog, mdiVolumeHigh, mdiGithub } from '@mdi/js';

function App() {
  const [activeButton, setActiveButton] = useState<string>('');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen overflow-hidden bg-slate-900">
        <div className="aspect-[4/3] w-96 bg-gray-200 rounded-lg shadow-lg relative md:scale-125 lg:scale-150 z-10"> {/* Container with dynamic scaling */}
          {/* Centering the Content */}
          <div className="flex justify-center items-center h-[calc(100%-4rem)]">
            {/* Mockup Content for the Container */}
            <div className="p-4 text-center">
              <h2 className="text-lg font-bold">{activeButton || 'Welcome'}</h2>
              <p className="text-sm text-gray-600 mt-2">
                This container has a 4:3 aspect ratio and scales 50% larger on desktop.
              </p>
            </div>
          </div>

          {/* Bottom Navbar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-300 h-16 rounded-b-lg">
            {/* Navbar Mockup Content */}
            <div className="flex justify-between items-center h-full">
              <div className="flex-1 flex justify-center items-center cursor-pointer" onClick={() => handleButtonClick('Thermometer')}>
                <div className="rounded-full p-2 hover:bg-gray-400 hover:bg-opacity-50">
                  <Icon path={mdiThermometer} size={1} />
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center cursor-pointer" onClick={() => handleButtonClick('Humidity')}>
                <div className="rounded-full p-2 hover:bg-gray-400 hover:bg-opacity-50">
                  <Icon path={mdiWaterPercent} size={1} />
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center cursor-pointer" onClick={() => handleButtonClick('Light')}>
                <div className="rounded-full p-2 hover:bg-gray-400 hover:bg-opacity-50">
                  <Icon path={mdiLightbulbOutline} size={1} />
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center cursor-pointer" onClick={() => handleButtonClick('Volume')}>
                <div className="rounded-full p-2 hover:bg-gray-400 hover:bg-opacity-50">
                  <Icon path={mdiVolumeHigh} size={1} />
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center cursor-pointer" onClick={() => handleButtonClick('Settings')}>
                <div className="rounded-full p-2 hover:bg-gray-400 hover:bg-opacity-50">
                  <Icon path={mdiCog} size={1} />
                </div>
              </div>
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
