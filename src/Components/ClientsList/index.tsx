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
        <AntDesign.Button
          name="adduser"
          size={20}
          iconStyle={{marginLeft: 5}}
          borderRadius={50}
          onPress={() => navigation.navigate('ClientForm')}>
          <Text style={styles.buttonText}>New Client</Text>
        </AntDesign.Button>
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
    marginHorizontal: 70,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#007ACC',
  },
  buttonText: {
    verticalAlign: 'center',
    textAlign: 'center',
    color: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    marginTop: 20,
    marginBottom: 10,
    // fontWeight: 'bold',
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
