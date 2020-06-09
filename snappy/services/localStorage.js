import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteData = async (key) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
    return false;
  }
};
