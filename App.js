import { StatusBar } from 'expo-status-bar';
// Variaveis para uso 
import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import MainCard from './components/MainCard';
import InfoCard from './components/InfoCard';
import * as Location from 'expo-location';
import getCurrentWeather from './api/ConsultApi';

export default function App() {

  // Setando as constantes 
  const [darkTheme, setDarkTheme] = useState(true)
  const [currentTemperature, setCurrentTemperature] = useState('27')
  const [location, setLocation] = useState('BR, Sao Paulo')
  const [currentHour, setCurrentHour] = useState('14h00')

  // Setando consts informações adicionais
  const [wind, setWind] = useState('63')
  const [umidity, setUmidity] = useState('80')
  const [tempMin, setTempMin] = useState('19')
  const [tempMax, setTempMax] = useState('31')
  const [locationCoords, setLocationCoords]= useState([])

  // Estilos

  const styles = StyleSheet.create({

    scrollView: {
      backgroundColor: darkTheme ? '#232634' : '#f2f2f2',
    },

    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 30,
    },

    // Estilizar temperatura 
    temperature: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10,
    },

    // Estilizar Text
    temperatureText: {
      color: darkTheme ? '#e0e0e0' : 'black',
      fontSize: 50,
    },

    // Estilizar Refresh Button
    refreshButton: {
      position: 'absolute',
      margin: 30,
      alignSelf: 'flex-start',
    },

    // Estilizar Card
    cardView: {
      color: darkTheme ? 'black' : 'white',
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },

    // Estilizar Informações Adicionais
    info: {
      alignItems: 'center',
      backgroundColor: darkTheme ? '#393e54' : '#8f8f8f',
      borderRadius: 20,
      width: 350,
      height: 230,
    },

    // Estilizar InfoText
    infoText: {
      color: darkTheme ? '#e0e0e0' : 'white',
      margin: 15,
      fontSize: 20,
      fontWeight: 'bold',
    },

    // Estilizar InfoCards
    infoCards: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    // Estilizar Theme Button
    themeButton: {
      margin: 10,
      marginLeft: 300,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    squareButton: {
      backgroundColor: darkTheme ? '#f2f2f2' : '#8f8f8f',
      justifyContent: 'center',
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25,
    },
    cicleButton: {
      backgroundColor: darkTheme ? '#232634' : '#f2f2f2',
      alignSelf: darkTheme ? 'flex-end' : 'flex-start',
      margin:5,
      width: 20,
      height: 20,
      borderRadius:50,
    },
  });

  // Função para receber os dados e distribuir nas variaveis 
  async function setCurrentWeather(){
    
    await getLocation()

    // Pegando horario atual
    let date = new Date()
    setCurrentHour(date.getHours() + 'h' + date.getMinutes())

    const data = await getCurrentWeather(locationCoords)
    // Current, Min, Max. Location, Wind, Humidity

    setCurrentTemperature(convertKelvinInC(data[0]))
    setTempMin(convertKelvinInC(data[1]))
    setTempMax(convertKelvinInC(data[2]))
    setLocation(data[3])
    setWind(data[4])
    setUmidity(data[5])
  }

  // Função para converter Kelvom em Celsius
  function convertKelvinInC(kelvin) {
    return parseInt(kelvin - 273)
  } 

  //Função para pegar localização atual
  async function getLocation(){

    let { status } = await Location.requestForegroundPermissionsAsync()

    if(status !== 'granted'){
      setErrorMsg('Sem permisão')
    }else{
      let location = await Location.getCurrentPositionAsync({})
      await setLocationCoords(location.coords)
      
    }
  }
  useEffect(() => {
   setCurrentWeather()

    

  }, [])

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>

        {/* Refresh Button  */}
        <TouchableOpacity onPress={() => setCurrentWeather()} style={styles.refreshButton}>
          <EvilIcons name="refresh" size={30} color={darkTheme ? 'white' : 'black'} />
        </TouchableOpacity>
        <Feather name="sun" style={{ marginTop: 55 }} size={40} color="orange" />

        {/* Temperatura */}
        <View style={styles.temperature}>
          <Text style={styles.temperatureText}>{currentTemperature}</Text>
          <Text style={[styles.temperatureText, { fontSize: 14 }]}>°C</Text>
        </View>

        {/* Localização */}
        <Text style={[styles.temperatureText, { fontSize: 15 }]}>{location} - {currentHour}</Text>

        {/*Card's*/}
        <View style={styles.cardView}>
          <MainCard title={'Manhã'} backgroundColor={darkTheme ? '#ff873d' : '#cc6e30'} temperature={'25°'} icon={'morning'}></MainCard>
          <MainCard title={'Tarde'} backgroundColor={darkTheme ? '#d29600' : '#fcc63f'} temperature={'22°'} icon={'afternoon'}></MainCard>
          <MainCard title={'Noite'} backgroundColor={darkTheme ? '#008081' : '#38b7b8'} temperature={'19°'} icon={'night'}></MainCard>
        </View>

        {/* Info Card*/}
        <View style={styles.info}>
          <Text style={styles.infoText}>Informações Adicionais </Text>
          <View style={styles.infoCards}>
            <InfoCard title={'Vento'} value={wind + ' m/s'}></InfoCard>
            <InfoCard title={'Umidade'} value={umidity + ' %'}></InfoCard>
            <InfoCard title={'Temp. Min'} value={tempMin + ' °'}></InfoCard>
            <InfoCard title={'Temp. Max'} value={tempMax + ' °'}></InfoCard>
          </View>
        </View>

        {/* DarkMode Button */}
        <View style={styles.themeButton}>
          <View style={styles.squareButton}>
            <TouchableOpacity style={styles.cicleButton} onPress={() => darkTheme ? setDarkTheme(false) : setDarkTheme(true)}></TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}


