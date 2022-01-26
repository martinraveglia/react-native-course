import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Clients from '../Components/ClientsList';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RNBootSplash from 'react-native-bootsplash';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ClientForm from '../Components/ClientsList/ClientForm';
import HomeScreen from '../Components/HomeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface MainStackProps {
  isSigned: boolean;
  setIsSigned: React.Dispatch<React.SetStateAction<boolean>>;
}

const screenOptionStyle = {
  headerShown: false,
  headerTitle: '',
  contentStyle: {
    backgroundColor: 'white',
  },
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const ClientStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Clients" component={Clients} />
      <Stack.Screen
        name="ClientForm"
        component={ClientForm}
        options={{
          headerShown: true,
          headerTitle: '',
          contentStyle: {
            backgroundColor: 'white',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default (props: MainStackProps) => {
  const setIsSigned = props.setIsSigned;
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      {!props.isSigned ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            initialParams={{setIsSigned}}
            component={Login}
            options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <View>
                    <Text style={styles.buttonTextGray}>
                      <FontAwesome name="sign-in" size={20} />
                      {'\n'} Sign Up
                    </Text>
                  </View>
                </TouchableOpacity>
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
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'HomeScreen') {
                return (
                  <Ionicons name={'logo-react'} size={size} color={color} />
                );
              } else if (route.name === 'ClientsScreen') {
                return <Ionicons name={'list'} size={size} color={color} />;
              }
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => setIsSigned(false)}>
                <View>
                  <Text style={styles.buttonTextGray}>
                    <FontAwesome name="sign-out" size={20} />
                    {'\n'} Sign Out
                  </Text>
                </View>
              </TouchableOpacity>
            ),
          })}>
          <Tab.Screen
            name="Welcome"
            component={MainStackNavigator}
            options={{
              tabBarLabel: 'Welcome',
              tabBarIcon: ({size, color}) => (
                <Ionicons name="logo-react" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="List"
            component={ClientStackNavigator}
            options={{
              tabBarLabel: 'List',
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="list" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // formContainer: {
  //   marginVertical: height * 0.2,
  //   paddingHorizontal: 30,
  //   paddingVertical: 30,
  //   justifyContent: 'center',
  //   alignContent: 'center',
  // },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#007ACC',
    fontSize: 35,
    width: 200,
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 90,
    padding: 20,
    borderRadius: 50,
    backgroundColor: '#007ACC',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  buttonTextGray: {
    textAlign: 'center',
    color: '#007ACC',
    paddingRight: 10,
  },
  textInputsContainer: {
    paddingBottom: 5,
    borderBottomWidth: 0.4,
  },
  textInput: {
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 30,
    margin: 5,
  },
});
