import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Platform,
  Animated
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {SearchBar } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";






const renderPokemon = ({item},{navigation}) => {
  return (
  <TouchableOpacity 
  style={styles.gridItemPressContainer} 
  onPress={()=>{
    navigation.navigate("Pokedex",{pokemonID:item.key})
    }}>
  <View key={item.key} style={styles.gridConainer}>
    <Image source={{uri:item.img}}
     style={{width:100,height:100}}
    />
   <Text>{item.name}</Text>
  </View>  
  </TouchableOpacity>
  );
}

const renderPage = ({item},{paginate}) =>{
  return(
    <TouchableOpacity onPress={()=>{paginate(item.page)}}>
      <Text style={{fontSize:20}}>
        {item.page}
      </Text>
    </TouchableOpacity>
  )
}
 


export default class HomeScree extends Component {
  state = {
    animation: new Animated.Value(1.5),
  }
  async componentDidMount(){
//    await AsyncStorage.clear()
   this.props.resetState();
   this.props.getPokemonsOnStart();
  }

  mapPagesToData = () =>{
      const{ numberOfPages } = this.props
      let PagesArray = []
      for(page=1; page<=numberOfPages; ++page){
        PagesArray.push({page})
      }
      return PagesArray;
  }
  search = ( e ) =>{
    this.props.setSearchString(e)
    this.props.filterPokemons()

  }
  animatedPokeball = () =>{
    Animated.loop(
      Animated.sequence(
        [
           Animated.timing(
          this.state.animation,{
              toValue: 2,
              duration:2000
           }
        ),
          Animated.timing(
              this.state.animation,{
                  toValue: 1.5,
                  duration:2000
              }
          ), 
        ],
        {iterations:1})
  ).start()
  }
 

  render() { 
    const pageData = this.mapPagesToData();
    const{ gatheringPokemons, currentRender:{ pokemonsPaged} } = this.props;
    const AnimatedStyles = {
      transform:[
          {
              scale: this.state.animation
          },
      ],
    }
    this.animatedPokeball()

    return ( 
  <View style={{flex:1, marginBottom:10}}>
    <SearchBar
      disabled={gatheringPokemons}
      placeholder={"look for a pokemon with id or name...."}
      style={{padding:10}}
      onChangeText={(e)=>{this.search(e)}}
      round={true}
      value={this.props.searchString}
    />
     <FlatList
        data={pageData}
        contentContainerStyle={styles.paginationContainer}
        renderItem={(item)=>renderPage(item,this.props)}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        scrollEnabled={false}
      />
  <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.scrollContainer,{height:pokemonsPaged.length<10?500:null}]}
      scrollEnabled={false}

  >
    {gatheringPokemons? 
    <View style={styles.loadingContainer}>
    <Text style={styles.loadingTextContainer}>Gathering pokemons for the first time</Text>
    <Text style={styles.loadingTextContainer}>this may take a few minutes</Text>
    <View style={styles.pokeBallContainer}>
       <Animated.Image source={require('../../../assets/pokeball.png')} 
         style={[styles.pokeBallImageStart,AnimatedStyles]}>
         </Animated.Image>
    </View>
    </View>
    
    :
    <FlatList
        data={pokemonsPaged}
        numColumns={3}
        renderItem={(item)=>renderPokemon(item,this.props)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridConainer}
      />}
   
    </ScrollView>
    </View>
     );
  }
}



const styles = StyleSheet.create({
loadingTextContainer:{fontSize:20,textAlign:"center"},
pokeBallImageStart:{
  width:100,
  height:100
},
pokeBallContainer:{
  flex:2,
   justifyContent:"center",
  alignItems:"center", 
  flexDirection:"column"
},
loadingContainer:{flex:1,justifyContent:"center", alignItems:"center"},
scrollContainer:{flex:1,alignItems:"center",alignItems:'flex-start' ,},
gridConainer:{flexDirection:"column",},
paginationContainer:{
  flex:1,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  padding:10,
  margin:5,
  height:50
},
gridItemPressContainer:{flex:1,alignItems:"center",width:Platform.OS==="ios"?120:130},
gridItemContainer:{flex:1,alignItems:"center"}
}); 
