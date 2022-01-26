// import React from 'react';
// import {Text} from 'react-native';
// export default () => {
//   <Text>Welcome!</Text>;
// };

import React from 'react';
import {View, Image, ActivityIndicator, StyleSheet, Text} from 'react-native';
export default () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('../../Assets/Images/bootsplash_logo.png')}
      />
      <Text style={styles.title}>Welcome!</Text>
      <ActivityIndicator size={50} color="#00b2ba" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logo: {width: 'content'},
  title: {
    textAlign: 'center',
    fontSize: 32,
    marginTop: 20,
    marginBottom: 10,
    // fontWeight: 'bold',
  },
});
