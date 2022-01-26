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
      <ActivityIndicator size={'large'} color="#00b2ba" />
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
  logo: {width: 'auto'},
  title: {
    textAlign: 'center',
    fontSize: 40,
    marginTop: 50,
    marginBottom: 100,
    // fontWeight: 'bold',
  },
});
