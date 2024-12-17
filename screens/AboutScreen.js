import React from 'react';
import { StyleSheet,ScrollView, View, Image, TouchableOpacity, Text } from 'react-native';
import aboutus from '../assets/images/aboutus.png';
const AboutScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
     <Image source={aboutus} style={[styles.logo]} resizeMode = "contain"/>
    <Text style={styles.head}>SignConnect</Text>
    <Text style={styles.text}>Introducing our Sign Learning App "SignConnect" - where words become signs and signs become bridges. SignConnect empowers you to learn sign language effortlessly and connect with the Deaf community, breaking down communication barriers. With interactive lessons and real time sign detection, SignConnect is your guide to mastering sign language. Join us in promoting inclusivity and bridging the gap between the hearing and Deaf worlds.</Text>
<Text>   </Text>
<Text style={styles.smallhead}>Features</Text>
<Text style={styles.text}>● Interactive sign language lessons</Text>
<Text style={styles.text}>● Videos and animations for better understanding.</Text>
<Text style={styles.text}>● Real-Time Sign Detection: Master Any Sign</Text>
<Text style={styles.text}>● Progress tracking and Practice Sessions.</Text>
<Text style={styles.text}>● Customization and accessibility options.</Text>
<Text>  </Text>

<Text style={styles.smallhead}>Creator</Text>
<Text style={styles.name}>Pravallika Bahadur</Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  
head: {
    fontSize: 35,
    color: 'black',
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    textAlign:'center',
    paddingTop: 20
  },
smallhead:{
        fontSize: 25,
        color: 'black',
        fontFamily: "Poppins-SemiBold",
        marginBottom: 10,
        textAlign:'center',
      },
name: {
        fontSize: 22,
        color: '#c23a22',
        fontFamily: "Poppins-Bold",
        marginBottom: 10,
        textAlign:'center',
      },
text:{
    color: 'black',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    marginLeft:10,
  },
  logo:{
    width: 400,
    height: 200,
    marginTop: 10,
    marginBottom: 0,
  },
});
export default AboutScreen;