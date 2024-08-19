// UserContext.js
import React, { createContext, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [userInfo, setUser] = useState({
    email: '',
    password:'',
    Login:false
  });

  // Method to update user fields
  const updateUserField = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUserField }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
