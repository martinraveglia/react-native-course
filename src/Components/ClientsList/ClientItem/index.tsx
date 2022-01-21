import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Client} from '../../../Helpers/types';

interface Props {
  style: object;
  item: Client;
}
const ClientItem = (props: Props) => {
  return (
    <View style={props.style}>
      <Text style={styles.id}>{props.item.id}</Text>
      <View style={styles.section}>
        <Text>{props.item.name}</Text>
        <Text>{props.item.email}</Text>
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
