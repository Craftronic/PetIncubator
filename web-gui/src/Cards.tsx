import React from 'react';
import { mdiCog } from '@mdi/js';
import Icon from '@mdi/react';
import { getBasePath } from './utils/getBasePath';
import { restAction } from './utils/restAction';

interface CardProps {
  label: string;
  value: number;
  showDecimal: boolean;
  measuredIn: string;
  plusClicked: () => void;
  minusClicked: () => void;
  entities: entityConfig[];
}

const Card: React.FC<CardProps> = ({ value, label, minusClicked, plusClicked, measuredIn, showDecimal, entities }) => {
  const mainValue = showDecimal ? Math.floor(value) : value;
  const decimalValue = showDecimal ? (value % 1).toFixed(1).substring(2) : '';

  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="flex items-center justify-center mt-2">
        <button 
          onClick={minusClicked} 
          className="rounded-full bg-gray-300 p-2 h-14 w-14 flex items-center justify-center text-3xl font-extralight active:bg-opacity-80 active:bg-gray-400 md:hover:bg-opacity-80 md:hover:bg-gray-400">
          -
        </button>
        <div className="mx-8 text-7xl font-extralight w-28 text-center">
          {mainValue}
          {decimalValue !== '' && <span className="text-5xl font-extralight">.{decimalValue}</span>}
        </div>
        <button 
          onClick={plusClicked} 
          className="rounded-full bg-gray-300 p-2 h-14 w-14 flex items-center justify-center text-3xl font-extralight active:bg-opacity-80 active:bg-gray-400 md:hover:bg-opacity-80 md:hover:bg-gray-400">
          +
        </button>
      </div>
      <div className="text-base text-gray-500 mt-2">{measuredIn}</div>
    </div>
  );
};

export const TemperatureCard = ({ entities }: {entities: entityConfig[]}) => {
  const thermostat = entities.find((x: entityConfig) => x.unique_id === 'climate-pid_thermostat');

  if (!(thermostat && thermostat.target_temperature !== undefined)) {
    return <div>Could not fetch thermostat data</div>
  }

  const targetTemp = thermostat.target_temperature;

  const onPlusClicked = () => restAction(thermostat, `set?target_temperature=${targetTemp * 1 + 1}`)
  const onMinusClicked = () => restAction(thermostat, `set?target_temperature=${targetTemp * 1 - 1}`)

  return <Card
    label="Temperature"
    value={targetTemp}
    minusClicked={onMinusClicked}
    plusClicked={onPlusClicked}
    measuredIn="C"
    showDecimal={true}
    entities={entities}
  />
  
};

export const HomeCard = ({ entities }: {entities: entityConfig[]}) => {
  return (
    <div>
      Dashboard
    </div>
  )
};

export const HumidityCard = ({ entities }: {entities: entityConfig[]}) => {
  return <Card
    label="Humidity"
    value={30}
    minusClicked={() => {}}
    plusClicked={() => {}}
    measuredIn="%"
    showDecimal={false}
    entities={entities}
  />
};

export const BrightnessCard = ({ entities }: {entities: entityConfig[]}) => {
  return <Card
    label="Brightness"
    value={60}
    minusClicked={() => {}}
    plusClicked={() => {}}
    measuredIn="%"
    showDecimal={false}
    entities={entities}
  />
};

interface SettingsButtonProps {
  icon: string;
  text: string;
}

const SettingsButton = ({ icon, text }: SettingsButtonProps) => {
  return (
    <div className="flex items-center space-x-2 p-2 text-sm bg-white rounded-md w-40">
      <Icon path={icon} size={1} />
      <span>{text}</span>
    </div>
  );
};


export const SettingsCard = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <SettingsButton icon={mdiCog} text="Thermostat" />
        <SettingsButton icon={mdiCog} text="Humidistat" />
        <SettingsButton icon={mdiCog} text="Network" />
        <SettingsButton icon={mdiCog} text="Fan status" />
        <SettingsButton icon={mdiCog} text="Sensors" />
        <SettingsButton icon={mdiCog} text="Fans" />
      </div>
    </>
  );
};

