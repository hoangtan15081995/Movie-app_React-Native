import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/Color';
import Icon from 'react-native-vector-icons/FontAwesome';

function SettingScreen({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="angle-left"
            size={50}
            color="black"
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
        <Text>Setting</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
  },
});

export default SettingScreen;
