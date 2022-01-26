/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MainStack from './Navigation/MainStack';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {useEffect} from 'react';
import ClientContextProvider from './context/ClientContext';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isSigned, setIsSigned] = useState(false);
  useEffect(() => {
    async () => {
      try {
        const isSignedAsyncStorage = await AsyncStorage.getItem('isSigned');
        // const parsedUsers = users && JSON.parse(users);
        isSignedAsyncStorage === 'true'
          ? setIsSigned(true)
          : setIsSigned(false);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const MainStackProps = {
    isSigned,
    setIsSigned,
  };
  return (
    <SafeAreaProvider style={backgroundStyle}>
      <ClientContextProvider>
        <FlipperAsyncStorage />
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <MainStack {...MainStackProps} />
      </ClientContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
