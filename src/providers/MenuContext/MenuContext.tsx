import React, { useState } from 'react';

type MenuContextType = {
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  toggleMenu: () => void;
};

export const MenuContext = React.createContext<MenuContextType>({
  isMenuOpen: false,
  setMenuOpen: (isOpen) => {},
  toggleMenu: () => {}
});

interface Props {
  children: React.ReactNode;
}

const MenuContextProvider: React.FC<Props> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  return <MenuContext.Provider value={{ isMenuOpen, setMenuOpen, toggleMenu }}>{children}</MenuContext.Provider>;
};

export default MenuContextProvider;
