import React, { createContext, useState, useContext, useCallback } from 'react';
import Instant from './Instant';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    message: '',
    onConfirm: null,
    onInteract: null
  });

  // Function to open the popup from anywhere
  const triggerPopup = useCallback((newConfig) => {
    setConfig({
      message: newConfig.message || 'Default Message',
      onConfirm: newConfig.onConfirm || null,
      onInteract: newConfig.onInteract || null
    });
    setIsOpen(true);
  }, []);

  const closePopup = () => setIsOpen(false);

  return (
    <PopupContext.Provider value={{ triggerPopup, closePopup }}>
      {children}
      {/* The actual UI component stays mounted here at the root */}
      <PopUp isOpen={isOpen} config={config} close={closePopup} />
    </PopupContext.Provider>
  );
};

// Custom hook for easy access
export const usePopup = () => useContext(PopupContext);