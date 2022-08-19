import { createContext, useState } from 'react';

export const LoadingContext = createContext();
LoadingContext.displayName = 'Loading';

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(true);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
