import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity, Dimensions,View } from 'react-native';

import StackNavigationData from './StackNavigationData';

const Stack = createStackNavigator();

export default function NavigatorView(props) {
 
  const HeaderLogo = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {props.navigation.goBack()}}
      >
       <View style={styles.headerStyle}>
         <Image
          source={require('../../../assets/header-logo.png')}
          resizeMode="contain"
          style={styles.headerImage}
        />
      </View>
      </TouchableOpacity>    
    )
  }

  return (
    <Stack.Navigator
    screenOptions={{
      header:(props)=><HeaderLogo {...props}/>,
      headerStyle: styles.headerStyle,
      headerLeft:null
    }}
    >
      {StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`stack_item-${idx+1}`}
          name={item.name} 
          component={item.component} 
        />
      ))}
    </Stack.Navigator>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerStyle:{
    backgroundColor: "#ff0000",
    width:1000,
    height:130,
  },
  headerImage: {
    width,
    height:height*.18,
  },
});
