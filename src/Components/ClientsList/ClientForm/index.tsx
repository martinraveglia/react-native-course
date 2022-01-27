import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useForm, Controller, SubmitHandler, Field} from 'react-hook-form';
import {Client, RootStackParamList} from '../../../Helpers/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';
import {ClientContext} from '../../../context/ClientContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientForm'>;

export default function ClientForm({route, navigation}: Props) {
  const isFocused = useIsFocused();
  const [id, setId] = useState<number>(-1);
  const clientContext = useContext(ClientContext);
  const {
    reset,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<Client>();

  useEffect(() => {
    if (!isFocused) {
      reset({name: undefined, email: undefined});
      navigation.setParams({client: undefined});
    }
  }, [isFocused]);

  useEffect(() => {
    reset({
      name: route.params?.client?.name,
      email: route.params?.client?.email,
    });
    setId(route.params?.client?.id ?? -1);
  }, [reset, route.params?.client, route.params?.client?.id]);

  const onSubmit = (data: Client) => {
    route.params?.client
      ? clientContext?.updateClient({...data, id})
      : clientContext?.addClient(data);
    navigation.setParams(undefined);
    navigation.navigate('Clients');
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Information:</Text>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'The Name is required.'},
          minLength: {value: 5, message: 'At least 5 characters.'},
          pattern: {
            value: /^[a-záéíóúñ]+( +[a-záéíóúñ]+)+$/i,
            message: 'At least 6 letters and space in between.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.textInputsContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize="none"
              style={styles.textInput}
              value={value}
              placeholder="Name"
            />
          </View>
        )}
        name="name"
      />
      {errors.name && <Text>{errors.name.message}</Text>}
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'The Email is required'},
          pattern: {
            value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            message: 'Should be a valid Email address',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.textInputsContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize="none"
              style={styles.textInput}
              value={value}
              placeholder="Email"
            />
          </View>
        )}
        name="email"
      />
      {errors.email && <Text>{errors.email.message}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>
          {route.params?.client ? 'Update' : 'Create'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
