import React from 'react';
import { StyleSheet,ScrollView, View, Image, TouchableOpacity, Text } from 'react-native';
import aboutus from '../assets/images/aboutus.png';
const AboutScreen = ({ navigation }) => {
  return (
    <ScrollView>
     <Image source={aboutus} style={[styles.logo]} resizeMode = "cover"/>
    <Text style={styles.head}>SignCompanion</Text>
    <Text style={styles.text}>Introducing our Sign Learning App "Sign Companion" - where words become signs and signs become bridges.</Text>
<Text style={styles.text}>SignCompanion empowers you to learn sign language effortlessly and connect with the Deaf community, breaking down communication barriers.</Text>
<Text style={styles.text}>With interactive lessons, a comprehensive sign library, SignCompanion is your guide to mastering sign language.</Text>
<Text style={styles.text}>Join us in promoting inclusivity and bridging the gap between the hearing and Deaf worlds. </Text>
<Text>   </Text>
<Text style={styles.smallhead}>Features</Text>
<Text style={styles.text}>⚫ Interactive sign language lessons</Text>
<Text style={styles.text}>⚫ Videos and animations for better understanding.</Text>
<Text style={styles.text}>⚫ Dictionary with a comprehensive library of signs.</Text>
<Text style={styles.text}>⚫ Customization and accessibility options.</Text>
<Text style={styles.text}>⚫ Progress tracking and certificates.</Text>
<Text>  </Text>
<Text style={styles.smallhead}>Navigation</Text>
<Text style={styles.text}>⚫ SignCompanion Welcome Screen allows user to Login/Signup</Text>
<Text style={styles.text}>⚫ Home screen features a Start Learning, Sign language dictionary and Stats to track their progress.</Text>
<Text style={styles.text}>⚫ Start Learning presents the user with a different lessons to master sign language.</Text>
<Text style={styles.text}>⚫ Sign dictionary  includes a search bar that allows the user to look up specific signs. </Text>
<Text style={styles.text}>⚫ Track progress and achievements from the home screen that includes completed lessons and progress statistics.
</Text>
<Text>  </Text>
<Text style={styles.smallhead}>Creator</Text>
<Text style={styles.name}>Pravallika Bahadur</Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
head: {
    fontSize: 40,
    color: '#840000',
    fontFamily: "Pacifico-Regular",
    marginBottom: 10,
    textAlign:'center',
  },
smallhead:{
        fontSize: 25,
        color: '#840000',
        fontFamily: "Pacifico-Regular",
        marginBottom: 10,
        textAlign:'center',
      },
name: {
        fontSize: 22,
        color: 'black',
        fontFamily: "Pacifico-Regular",
        marginBottom: 10,
        textAlign:'center',
      },
text:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    marginLeft:10,
  },
  logo:{
    width: 400,
    height: 200,
    marginTop: 10,
    marginBottom: 0,
    alignContent:'center',
  },
});
export default AboutScreen;