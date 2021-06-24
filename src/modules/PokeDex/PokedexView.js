import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated
} from 'react-native';







export default class PokedexScreen extends Component {
    state = {
        animation: new Animated.Value(1.5),
        hp: new Animated.Value(0),
        attack: new Animated.Value(0),
        defense: new Animated.Value(0),
        specialAttack: new Animated.Value(0),
        specialDefense: new Animated.Value(0),
        speed: new Animated.Value(0),

    }
    componentDidMount(){
      const{route:{params:{pokemonID}},getSinglePokemon} = this.props;
      getSinglePokemon(pokemonID)
  
    }
    formatText( description ){
      let formatedText = description.replace(/\s+/g, ' ').trim()
      return formatedText
    }
    formatStats(){
      const{ pokemonSelected:{ stats } } = this.props
      return stats.map((pokemon)=>{
              if(pokemon && pokemon.stat){
                return{baseStat:pokemon.base_stat,name:pokemon.stat.name}
              }
          
          })
    }

      animationsTrigger = ( stats ) =>{
        let barTransition = 250
       
    

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
           stats.forEach( stat =>{
             if(stat && stat.name){
              switch(stat.name){
                case"hp":
                Animated.timing(this.state.hp,{
                  toValue:stat.baseStat>100?100:stat.baseStat,
                  duration:barTransition
                  }).start()
                  break;
                case"attack":
                Animated.timing(this.state.attack,{
                  toValue:stat.baseStat>100?100:stat.baseStat,
                  duration:barTransition
                }).start()
                break;
                case"defense":
                Animated.timing(this.state.defense,{
                  toValue:stat.baseStat>100?100:stat.baseStat,
                  duration:barTransition
                }).start()
                break;
                case"special-attack":
                Animated.timing(this.state.specialAttack,{
                  toValue:stat.baseStat>100?100:stat.baseStat,
                  duration:barTransition
                }).start()
                break;
                case"special-defense":
                Animated.timing(this.state.specialDefense,{
                  toValue:stat.baseStat>100?100:stat.baseStat,
                  duration:barTransition
                }).start()
                break;
                case"speed":
                Animated.timing(this.state.speed,{
                  toValue:stat.baseStat>100?100:stat.baseStat,
                  duration:barTransition
                }).start()
                break;
              }
             }
           })




  
      }
  render() { 
    const{pokemonSelected} = this.props;
      const AnimatedStyles = {
        transform:[
            {
                scale: this.state.animation
            },
        ],
      }
      let description = this.formatText(pokemonSelected.description)
      let stats = this.formatStats()
      this.animationsTrigger(stats);
       let statsRender = stats.map((stat,index)=>{
        if(stat && stat.baseStat && stat.name)
        switch(stat.name){
          case "attack":
          return(
            <View 
            key={index}
             style={styles.statBarContainer}>
                <Text>{stat.name}</Text>
                <Animated.View style={[styles.absoluteFill,{backgroundColor:"#8BED4F",width:this.state.attack.interpolate({
                  inputRange:[0,100],
                  outputRange:["0%","100%"]
                }),opacity:.4}]}/>
            </View>
           )
           case "defense":
            return(
              <View 
              key={index}
              style={styles.statBarContainer}>
                  <Text>{stat.name}</Text>
                  <Animated.View style={[styles.absoluteFill,{backgroundColor:"#8BED4F",width:this.state.defense.interpolate({
                  inputRange:[0,100],
                  outputRange:["0%","100%"]
                }),opacity:.4}]}/>
              </View>
             ) 
             case "hp":
          return(
            <View 
            key={index}
            style={styles.statBarContainer}  >
                <Text>{stat.name}</Text>
                <Animated.View style={[styles.absoluteFill,{backgroundColor:"#8BED4F",width:this.state.hp.interpolate({
                  inputRange:[0,100],
                  outputRange:["0%","100%"]
                }),opacity:.4}]}/>
            </View>
           ) 
           case "special-attack":
          return(
            <View 
            key={index}
            style={styles.statBarContainer}
           >
                <Text>{stat.name}</Text>
                <Animated.View style={[styles.absoluteFill,{backgroundColor:"#8BED4F",width:this.state.specialAttack.interpolate({
                  inputRange:[0,100],
                  outputRange:["0%","100%"]
                }),opacity:.4}]}/>
            </View>
           )  
           case "special-defense":
          return(
            <View 
            key={index}
            style={styles.statBarContainer}
          >
                <Text>{stat.name}</Text>
                <Animated.View style={[styles.absoluteFill,{backgroundColor:"#8BED4F",width:this.state.specialDefense.interpolate({
                  inputRange:[0,100],
                  outputRange:["0%","100%"]
                }),opacity:.4}]}/>
            </View>
           )
           case "speed":
          return(
            <View 
            key={index}
            style={styles.statBarContainer}

          >
                <Text>{stat.name}</Text>
                <Animated.View style={[styles.absoluteFill,{backgroundColor:"#8BED4F",width:this.state.speed.interpolate({
                  inputRange:[0,100],
                  outputRange:["0%","100%"]
                }),opacity:.4}]}/>
            </View>
           )    
            }
       })




    return ( 
    <View style={styles.mainContainer}>
    
    <View style={styles.card}> 
    <View style={styles.pokeBallContainer}>
         <Animated.Image source={require('../../../assets/pokeball.png')} 
         style={[styles.pokeBallImageStart,AnimatedStyles]}>
         </Animated.Image>
    </View>
          <View style={{flex:.7}}>
            <View style={{flex:1,alignItems:"center"}}>
              <Image source={{uri:pokemonSelected.img}} style={styles.pokemonImage}/>
            </View>
            <View style={{flex:.35}}>
              <Text style={styles.pokemonName}>
                {pokemonSelected.name}
              </Text>
            </View>
            <View style={{flex:1,alignItems:"center"}}>
              <View>
                <Text style={styles.descriptionText}>
                  {description}
                </Text>
              </View>
              </View>
          </View>
           <View style={styles.statsRenderContainer}>    
                {statsRender}
            </View>
          
    </View>
    </View>
     );
  }
}



const styles = StyleSheet.create({
 mainContainer:{flex:1},
 card:{
   flex:.9,backgroundColor:"white",
   margin:20,
   borderRadius:30,
   height:200,
   borderWidth:.2,
   borderColor:"grey",
  },
  pokeBallContainer:{flex:0.1,alignItems:"flex-start"},
  pokeBallImageStart:{height:30,width:30,margin:65,transform:[{scaleX:.5},]},
  absoluteFill:{
    position:"absolute",
    left:0,
    right:0,
    top:0,
    bottom:0,
    borderRadius:30,
    borderColor:"black",
    borderWidth:.5,
  
  },
  statsRenderContainer:{
    flex:.60,
    backgroundColor:"grey",
    borderRadius:20,width:"90%" ,
    alignSelf:"center",
    margin:30,
    justifyContent:"center",
    alignItems:"center",
    borderColor:"black",
    borderWidth:2,
    shadowOffset:{ width:3,height:3},
    shadowOpacity:0.3,
    shadowRadius:.2
    
  },
  descriptionText:{textAlign:'center',fontSize:20,margin:10,padding:5},
  pokemonName:
  {
    textAlign:"center",justifyContent:"center",fontSize:40
  },
  pokemonImage:{height:130,width:130,},
  statBarContainer:{flex:.8/6,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white",
    margin:5,
    padding:5,
    borderColor:"black",
    borderWidth:1,
    borderRadius:30,
    width:"80%"
    }
}); 
