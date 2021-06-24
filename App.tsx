
import { Provider } from 'react-redux';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Audio} from "expo-av";



import { store } from "./src/modules/redux/store"

import AppView from './src/modules/AppViewContainer';





export interface State {
  
}
 
class App extends React.Component<State> {
  constructor(props: object) {
    super(props);
    this.state = { playBackObject:{}};
  }
  async componentDidMount(){
    const { sound : playBackObject}  = 
    await Audio.Sound.createAsync({
      uri:"https://vgmsite.com/soundtracks/pokemon-original-game-soundtrack/wahjdqip/101%20-%20opening.mp3"
    },
    {shouldPlay:true})
    this.setState({playBackObject})
  }
  
  render() { 
    return (
    <Provider store={store}>
      <NavigationContainer>
          <AppView />
      </NavigationContainer>
    </Provider>  );
  }
}
 
export default App ;


