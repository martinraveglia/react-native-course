import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import ClientItem from './ClientItem';
import {Client} from '../../Helpers/types';
import {getClients} from '../../Controllers/Clients';

const {width} = Dimensions.get('window');

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async () => setClients(await getClients());
  }, [isFocused]);

  return (
    <FlatList
      keyExtractor={item => item?.id}
      data={clients}
      style={styles.wrapper}
      contentContainerStyle={styles.contentContainer}
      renderItem={({item}) => <ClientItem item={item} style={styles.item} />}
      ListHeaderComponent={<Text style={styles.title}>Client List</Text>}
      ItemSeparatorComponent={() => (
        <View style={{height: 1, width: '100%', backgroundColor: 'pink'}} />
      )}
    />
  );
};

export default Clients;

const styles = StyleSheet.create({
  wrapper: {
    // marginTop: 32,
    // paddingHorizontal: 30,
    // backgroundColor: 'red',
    width,
    // height: height *1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginTop: 20,
    fontWeight: 'bold',
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#aaa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.8,
  },
});
