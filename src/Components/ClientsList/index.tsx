import React, {useContext} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ClientItem from './ClientItem';
import {RootStackParamList} from '../../Helpers/types';
import {ClientContext} from '../../context/ClientContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const {width} = Dimensions.get('window');

const Clients = ({navigation}: Props) => {
  const clientContext = useContext(ClientContext);

  const Header = () => {
    return (
      <View>
        <Text style={styles.title}>Client List</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ClientForm')}>
          <AntDesign name="home" size={30} />
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={clientContext?.clients}
      style={styles.wrapper}
      contentContainerStyle={styles.contentContainer}
      renderItem={({item}) => (
        <>
          <TouchableOpacity
            onLongPress={() => clientContext?.deleteClient(+item?.id)}
            onPress={() =>
              navigation.navigate('ClientForm', {
                client: item,
              })
            }>
            <ClientItem
              item={item}
              style={styles.item}
              navigation={navigation}
            />
          </TouchableOpacity>
        </>
      )}
      ListHeaderComponent={Header}
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
