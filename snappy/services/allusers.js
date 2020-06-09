import axios from './axios';

export const fetchAllUser = async (setUsers) => {
  try {
    const resultUser = await axios.get('all');
    setUsers(resultUser.data.data);
    return resultUser;
  } catch (exception) {
    return exception;
  }
};
