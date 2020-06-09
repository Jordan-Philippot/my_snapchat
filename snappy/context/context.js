import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { storeData, getData, deleteData } from '../services/localStorage';

const UserContext = React.createContext(undefined);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    getData('token').then((t) => {
      setToken(t);
      getData('email').then((e) => {
        setEmail(e);
      }).then(() => {
        setIsAuth(token !== null && email !== null);
      });
    });
  }, []);

  const setAuth = async ({ token, email }) => {
    await storeData('token', token);
    await storeData('email', email);
    setToken(token);
    setEmail(email);
    setIsAuth(true);
  };

  const logout = () => {
    deleteData('token');
    deleteData('email');
    setToken('');
    setEmail('');
    setIsAuth(false);
  };

  const data = {
    token,
    email,
    isAuth,
    setAuth,
    logout
  };

  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};

export const UserConsumer = UserContext.Consumer;
export default UserContext;

UserProvider.propTypes = {
  children: PropTypes.element.isRequired
};
