import AsyncStorage from '@react-native-async-storage/async-storage';
import {Client} from '../../Helpers/types';

const createClient = async (client: Client) => {
  try {
    const clients = await AsyncStorage.getItem('clients');
    const parsedClients = clients && JSON.parse(clients);
    if (Array.isArray(parsedClients)) {
      client.id = parsedClients[parsedClients.length - 1].id + 1;
      parsedClients.push(client);
      return AsyncStorage.setItem('clients', JSON.stringify(parsedClients));
    }
    AsyncStorage.setItem('clients', JSON.stringify([client]));
  } catch (error) {
    console.log(error);
  }
};

const deleteClient = async (clientID: Number) => {
  try {
    const clients = await AsyncStorage.getItem('clients');
    const parsedClients = clients && JSON.parse(clients);
    if (Array.isArray(parsedClients)) {
      return AsyncStorage.setItem(
        'clients',
        JSON.stringify(
          parsedClients.filter((client: Client) => +client.id !== clientID),
        ),
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const updateClient = async (client: Client) => {
  try {
    const clients = await AsyncStorage.getItem('clients');
    const parsedClients = clients && JSON.parse(clients);
    if (Array.isArray(parsedClients)) {
      parsedClients.forEach((el, index) => {
        if (el.id === client.id) {
          parsedClients[index] = client;
        }
      });
      return AsyncStorage.setItem('clients', JSON.stringify(parsedClients));
    }
  } catch (error) {
    console.log(error);
  }
};

const getClients = async (clientID?: Number) => {
  try {
    const clients = await AsyncStorage.getItem('clients');
    const parsedClients: Client[] = clients && JSON.parse(clients);
    if (Array.isArray(parsedClients)) {
      return clientID
        ? parsedClients.filter((client: Client) => +client.id === clientID)
        : parsedClients;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export {createClient, deleteClient, updateClient, getClients};
