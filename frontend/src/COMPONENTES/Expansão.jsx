import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [isMenuExpanded, setMenuExpanded] = useState(false);

    return (
        <MenuContext.Provider value={{ isMenuExpanded, setMenuExpanded }}>
            {children}
        </MenuContext.Provider>
    );
};
