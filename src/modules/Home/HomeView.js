import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Platform
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {SearchBar } from 'react-native-elements';





const renderPokemon = ({item},{navigation}) => {
  return (
  <TouchableOpacity 
  style={{flex:1,alignItems:"center",width:Platform.OS==="ios"?120:130}} 
  onPress={()=>{
    navigation.setOptions({headerTitle:null})
    navigation.navigate("Pokedex",{pokemonID:item.key})
    }}>
  <View key={item.key} style={{flex:1,alignItems:"center"}}>
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
  componentDidMount(){
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
 

  render() { 
    const pageData = this.mapPagesToData();
    return ( 
  <View style={{flex:1, marginBottom:10}}>
    <SearchBar
      placeholder={"look for a pokemon with id or name...."}
      style={{padding:10}}
      onChangeText={(e)=>{this.search(e)}}
      round={true}
      value={this.props.searchString}
    />
     <FlatList
        data={pageData}
        contentContainerStyle={{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10,
        margin:5,
        height:50
      }}
        renderItem={(item)=>renderPage(item,this.props)}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        scrollEnabled={false}
      />
  <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex:1,alignItems:"center",alignItems:'flex-start' ,height:800}}
      scrollEnabled={false}

  >
      <FlatList
        data={this.props.currentRender.pokemonsPaged}
        numColumns={3}
        renderItem={(item)=>renderPokemon(item,this.props)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexDirection:"column",}}
      />
    </ScrollView>
    </View>
     );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    //fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
   // borderBottomColor: colors.primary,
  },
}); 
