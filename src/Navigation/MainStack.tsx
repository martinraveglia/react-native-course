import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Clients from '../Components/ClientsList';
import {Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface MainStackProps {
  isSigned: boolean;
  setIsSigned: React.Dispatch<React.SetStateAction<boolean>>;
}

export default (props: MainStackProps) => {
  const setIsSigned = props.setIsSigned;
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
      {!props.isSigned ? (
        <Stack.Navigator
          screenOptions={({navigation}) => {
            () => navigation.setOptions({setIsSigned});
          }}>
          <Stack.Screen
            name="Login"
            initialParams={{setIsSigned}}
            component={Login}
            options={({navigation}) => ({
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Register')}
                  title="Sign Up"
                  color="#017ACC"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{title: 'Log In'}}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({navigation}) => {
            () => navigation.setOptions({setIsSigned});
          }}>
          <Tab.Screen name="List" component={Clients} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};
