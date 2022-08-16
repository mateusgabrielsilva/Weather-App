
// Variaveis para uso 
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const MainCard = (props) => {

    // Constante Estilos 
    const Icon = () => {
        if(props.icon === 'morning'){
            return(
                <Feather name="sun" style={styles.cardIcon} size={40} />
            )
        }
        if(props.icon === 'afternoon'){
            return(
                <Fontisto name="day-cloudy" style={styles.cardIcon} size={40} />
            )
        }
        if(props.icon === 'night'){
            return(
                <Ionicons name="cloudy-night-outline" style={styles.cardIcon} size={40} />
            )
        } 
    } 

    // Estilos

    const styles = StyleSheet.create({

        //Estilizar Card
        card: {
            backgroundColor: props.backgroundColor,
            justifyContent: 'center',
            alignItems:'center',

            margin: 10,
            width: 110,
            height: 210,
            borderRadius: 10,
        },
       
        // Estilizar temperatura 
        temperature: {
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
        },

        // Estilizar Refresh Button
        refreshButton: {
            position: 'absolute',
            margin: 30,
            alignSelf: 'flex-start',
        },

        // Estilizar os textos dos cards
        text: {
            color: 'white',
            margin: 15,
            fontSize: 20,
        },

        // Estilizar Card icon 
        cardIcon: {
            color: 'white',
            margin:15,
        },

        
    });

    return (
        <View style={styles.card}>
            <Text style={styles.text}>{props.title}</Text>
            <Icon></Icon>
            <Text style={styles.text}>{props.temperature}</Text>
        </View>
    )
}

export default MainCard