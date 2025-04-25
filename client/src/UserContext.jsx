import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get('/profile')
        .then(({ data }) => {
          setUser(data);
        })
        .catch(() => {
          setUser(null); // in case of error
        })
        .finally(() => {
          setReady(true); // always set this
        });
    } else {
      setReady(true); // <- fix: set ready if user already exists (e.g., after login)
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
