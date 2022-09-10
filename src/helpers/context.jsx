import { createContext } from 'react';

export const UserContext = createContext({});
export const CodeContext = createContext(false);

// can have multiple contexts here
// this can be used in any component
// have to import { UserContext } from './helpers/context'; in the component
// then use it like this:
// const { user, setUser } = useContext(UserContext);
// can access user.someProperty
