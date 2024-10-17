import { createContext, useContext, useState, ReactNode } from 'react';

interface ContextProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  dialog: boolean;
  setDialog: (value: boolean) => void;
}

const MainContext = createContext<ContextProps | undefined>(undefined);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dialog, setDialog] = useState(false);

  const values = { activeTab, setActiveTab, dialog, setDialog };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMainContext must be used within a TabProvider');
  }
  return context;
};
