import './App.css'
import Icon from '@mdi/react';
import { mdiThermometer, mdiWaterPercent, mdiLightbulbOutline, mdiCog, mdiVolumeHigh } from '@mdi/js';
// icons here https://pictogrammers.com/library/mdi/

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen overflow-hidden">
        <div className="aspect-[4/3] w-96 bg-gray-200 rounded-lg shadow-lg relative md:scale-125 lg:scale-150"> {/* Container with dynamic scaling */}
          
          {/* Mockup Content for the Container */}
          <div className="p-4">
            <h2 className="text-lg font-bold text-center">Welcome</h2>
            <p className="text-sm text-gray-600 text-center mt-2">
              This container has a 4:3 aspect ratio and scales 50% larger on desktop.
            </p>
          </div>

          {/* Bottom Navbar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-300 p-4 rounded-b-lg">
            {/* Navbar Mockup Content */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">
                <Icon path={mdiThermometer} size={1} />
              </span>
              <span className="text-sm text-gray-700">
                <Icon path={mdiWaterPercent} size={1} />
              </span>
              <span className="text-sm text-gray-700">
                <Icon path={mdiLightbulbOutline} size={1} />
              </span>
              <span className="text-sm text-gray-700">
                <Icon path={mdiCog} size={1} />
              </span>
              <span className="text-sm text-gray-700">
                <Icon path={mdiVolumeHigh} size={1} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
