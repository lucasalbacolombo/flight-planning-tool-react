import { createContext, useState } from 'react';

export const UserContext = createContext();
UserContext.displayName = 'User';

export default function UserProvider({ children }) {
  const [user, setUser] = useState('');
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
