import React from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';

interface Credentials {
  user: string;
  password: string;
}

const {height, width} = Dimensions.get('window');

export default function Login() {
  const handleLogin = async (credentials: Credentials) => {
    try {
      const users = await AsyncStorage.getItem('users');
      const parsedUsers = JSON.parse(users ?? '');
      if (
        Array.isArray(parsedUsers) &&
        parsedUsers.filter(
          (user: Credentials) =>
            user.user === credentials.user &&
            user.password === credentials.password,
        ).length
      ) {
        return console.log('pass');
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      user: '',
      password: '',
    },
  });
  const onSubmit = (data: Credentials) => {
    handleLogin(data);
  };
  return (
    <View style={styles.formContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Log in</Text>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.textInputsContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.textInput}
              value={value}
              placeholder="Username"
            />
          </View>
        )}
        name="user"
      />
      {errors.user && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.textInputsContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.textInput}
              value={value}
              placeholder="Password"
            />
          </View>
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: height * 0.2,
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  titleContainer: {
    marginHorizontal: width * 0.15,
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
