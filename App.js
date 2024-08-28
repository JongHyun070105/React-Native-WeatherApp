import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { StyleSheet, Text, View, ScrollView,Dimensions } from "react-native";

const Screen_Width = Dimensions.get("window").width;
const API_KEY = 'db183271a70893f0fce67fd9a578cfdb';

export default function App() {
  const [city, setCity] = useState("로딩중...")
  const [days, setDay] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {
      coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude}, {useGoogleMaps: false});

    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`);
    const json = await response.json();

    console.log(json)
  };
  useEffect(() => {
    getWeather();
  }, [])
  return (
    <View style={Styles.Container}>
      <StatusBar style='dark'/>
      <View style={Styles.City}>
        <Text style={Styles.CityName}>{city}</Text>
      </View>
      <ScrollView 
      pagingEnabled
      horizontal 
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={Styles.Weather}>
        <View style={Styles.Day}>  
          <Text style={Styles.Temp}>27</Text>
          <Text style={Styles.Description}>Sunny</Text>
        </View>
        <View style={Styles.Day}>
          <Text style={Styles.Temp}>27</Text>
          <Text style={Styles.Description}>Sunny</Text>
        </View>
        <View style={Styles.Day}>
          <Text style={Styles.Temp}>27</Text>
          <Text style={Styles.Description}>Sunny</Text>
        </View>
        <View style={Styles.Day}>
          <Text style={Styles.Temp}>27</Text>
          <Text style={Styles.Description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  Container:{
    flex:1,
    backgroundColor:"skyblue"
  },
  City:{
    flex:0.8,
    backgroundColor:"skyblue",
    justifyContent:"center",
    alignItems:"center"
  },
  CityName:{
    fontSize:50,
    fontWeight:"600",
    textAlign:"center",
    marginTop:40
  },
  Weather:{
  },
  Day:{
    alignItems:"center",
    width:Screen_Width
  },
  Temp:{
    fontSize:130,
    marginTop:50
  },
  Description:{
    fontSize:50,
    marginTop:-20
  },
})

