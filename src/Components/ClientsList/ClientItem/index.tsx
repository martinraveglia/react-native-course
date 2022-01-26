import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Client, RootStackParamList} from '../../../Helpers/types';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Navigation = NativeStackScreenProps<
  RootStackParamList,
  'List'
>['navigation'];
interface Props {
  style: object;
  item: Client;
  navigation: Navigation;
}
const ClientItem = (props: Props) => {
  return (
    <View style={props.style}>
      <Text style={styles.id}>{props.item.id}</Text>
      <View style={styles.section}>
        <Text>{props.item.name}</Text>
        <Text>{props.item.email}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('ClientForm', {client: props.item})
          }>
          <FA5 name="user-edit" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClientItem;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  id: {
    fontSize: 32,
    // marginTop: 60,
    fontWeight: 'bold',
  },
  section: {
    // flexDirection: 'column',
    alignItems: 'flex-start',
  },
  button: {
    padding: 10,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#aaa',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    fontSize: 14,
    minWidth: '80%',
    // flex:1
  },
});
