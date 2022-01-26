import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Clients from '../Components/ClientsList';
import {Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RNBootSplash from 'react-native-bootsplash';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ClientForm from '../Components/ClientsList/ClientForm';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface MainStackProps {
  isSigned: boolean;
  setIsSigned: React.Dispatch<React.SetStateAction<boolean>>;
}

export default (props: MainStackProps) => {
  const setIsSigned = props.setIsSigned;
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      {!props.isSigned ? (
        <Stack.Navigator
        // screenOptions={({navigation}) => {
        //   () => navigation.setOptions({setIsSigned});
        // }}
        >
          <Stack.Screen
            name="Login"
            initialParams={{setIsSigned}}
            component={Login}
            options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <View>
                    <FontAwesome5 name="sign-in" />
                    <Text>Sign Up</Text>
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
        // screenOptions={({navigation}) => {
        //   () => navigation.setOptions({setIsSigned});
        // }}
        >
          <Tab.Screen name="List" component={Clients} />
          <Tab.Screen name="ClientForm" component={ClientForm} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   // formContainer: {
//   //   marginVertical: height * 0.2,
//   //   paddingHorizontal: 30,
//   //   paddingVertical: 30,
//   //   justifyContent: 'center',
//   //   alignContent: 'center',
//   // },
//   // titleContainer: {
//   //   marginHorizontal: width * 0.15,
//   //   alignContent: 'center',
//   //   justifyContent: 'center',
//   // },
//   title: {
//     textAlign: 'center',
//     color: '#007ACC',
//     fontSize: 35,
//     width: 200,
//   },
//   button: {
//     marginVertical: 20,
//     marginHorizontal: 90,
//     padding: 20,
//     borderRadius: 50,
//     backgroundColor: '#007ACC',
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: 'white',
//   },
//   textInputsContainer: {
//     paddingBottom: 5,
//     borderBottomWidth: 0.4,
//   },
//   textInput: {
//     paddingTop: 30,
//     paddingBottom: 15,
//     paddingHorizontal: 30,
//     margin: 5,
//   },
// });
