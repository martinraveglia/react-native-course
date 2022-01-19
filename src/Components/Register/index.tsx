import React from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';

interface Credentials {
  user: string;
  password: string;
}

export default function Register() {
  const handleRegister = async (newUser: Credentials) => {
    try {
      const users = await AsyncStorage.getItem('users');
      const parsedUsers = JSON.parse(users ?? '');
      if (
        Array.isArray(parsedUsers) &&
        !parsedUsers.filter((user: Credentials) => user.user === newUser.user)
          .length
      ) {
        parsedUsers.push(newUser);
        return AsyncStorage.setItem('users', JSON.stringify(parsedUsers));
      }
      AsyncStorage.setItem('users', JSON.stringify([newUser]));
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
    handleRegister(data);
  };
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            style={{
              backgroundColor: 'red',
              height: 50,
            }}
            value={value}
            placeholder="Username"
          />
        )}
        name="user"
      />
      {errors.user && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={{
              backgroundColor: 'blue',
              height: 50,
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
