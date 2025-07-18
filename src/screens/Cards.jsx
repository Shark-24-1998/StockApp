import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Cards = () => {
    const elements = [1,2,3,4,5]
  return (
    <View style={styles.container}>
     {
        elements.map((element , index)=>{
           return <View key={index} style={styles.card}>
                <Text style={styles.cardText}>{element}</Text>
            </View>
        })
     }
    </View>
  )
}

export default Cards

const styles = StyleSheet.create({
    container : {
        padding:10,
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-around"
    },
    card:{
        width:100,
        height:100,
        backgroundColor:"purple",
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:10
    },
    cardText:{
        fontSize:30,
        color:"white",
        fontWeight:"bold"
    }
})