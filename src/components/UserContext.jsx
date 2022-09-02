import { createContext } from 'react';

const user = {
  id: 1,
  name: 'Curtis Warcup',
  email: 'curtis@gmail.com',
  password: 'password',
};

export const UserContext = createContext('Default value');
