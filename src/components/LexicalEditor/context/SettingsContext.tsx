import { createContext, useContext, useState } from 'react';

import { AppSettingsType, INITIAL_SETTINGS } from '../constants/appSettings';

type SettingsContextType = {
  settings: AppSettingsType;
  setOptions: (options: AppSettingsType) => void;
};

const Context = createContext<SettingsContextType>({
  settings: INITIAL_SETTINGS,
  setOptions: () => {},
});

export const SettingsContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<AppSettingsType>(INITIAL_SETTINGS);

  const setOptions = (options: Partial<AppSettingsType>) => {
    setSettings(prev => ({
      ...prev,
      ...options,
    }));
  };

  return (
    <Context.Provider value={{ settings, setOptions }}>
      {children}
    </Context.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
};
