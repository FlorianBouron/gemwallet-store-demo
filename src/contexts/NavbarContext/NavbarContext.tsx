import { ReactNode, useContext, useState, createContext } from 'react';

type contextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const NavbarContext = createContext<contextType>({
  isOpen: true,
  setIsOpen: () => {}
});

function NavbarProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);

  const value: contextType = {
    isOpen,
    setIsOpen
  };

  return <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>;
}

function useNavbar(): contextType {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}

export { NavbarProvider, useNavbar };
