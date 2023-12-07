// Update AfterLoginScreen.js
import React, { useState, useEffect}from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text,ScrollView, SafeAreaView } from 'react-native';
import learning from '../assets/images/learning.png';
import Exams from '../assets/images/Exams.png';
import About from '../assets/images/About.png';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';


const MainScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      if (authUser) {
        // User is signed in.
        // You can use authUser.displayName for user's display name
        setDisplayName(authUser.displayName || ''); // Use an empty string if display name is not available
      } else {
        // No user is signed in.
        setDisplayName('');
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView>
      <View style={styles.profile}>
      <Text style={{ fontSize: 25, fontFamily: "Pacifico-Regular", color: '#840000', paddingLeft: 10, flexDirection: 'row' }}>
            {displayName ? `Hello ${displayName}` : 'Hello'}
      </Text>
       <TouchableOpacity onPress={() => navigation.navigate('PROFILE')}> 
       <Image
       source= {{uri:'data:image/jpeg;base64,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'}} 
       style={{width:60,height:60, borderRadius:100}}/>
      </TouchableOpacity>
       </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => {/* Handle progress button press */}}>
          <Text></Text>
        </TouchableOpacity>
      </View>
      <View style={{borderWidth: 2,  // Set the border width
      borderColor: '#840000',  // Set the border color
      borderRadius: 25, marginBottom:15, marginTop:-30}}>
      <TouchableOpacity onPress={() => navigation.navigate('START LEARNING')}> 
        <Image source={learning} style={[styles.logo]} resizeMode = "cover"/>
      </TouchableOpacity>
      <Text style={styles.buttonText}>START LEARNING</Text>
      </View>
      <View style={{borderWidth: 2,  // Set the border width
      borderColor: '#840000',  // Set the border color
      borderRadius: 25,marginBottom:10}}>
      <TouchableOpacity onPress={() => navigation.navigate('QuestionScreen')}> 
        <Image source={Exams} style={[styles.logo]} resizeMode = "cover"/>
      </TouchableOpacity>
      <Text style={styles.buttonText}>PRACTICE</Text>
      </View>
      <View style={{borderWidth: 2,  // Set the border width
      borderColor: '#840000',  // Set the border color
      borderRadius: 25,marginBottom:10, marginTop: 5}}>
      <TouchableOpacity onPress={() => navigation.navigate('ABOUT')}> 
        <Image source={About} style={[styles.logo1]} resizeMode = "cover"/>
      </TouchableOpacity>
      <Text style={styles.buttonText}></Text>
      </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
   
    button: {
      backgroundColor: '#c23a22',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 25,
      marginVertical: 10,
    },
    buttonText: {
      color: '#840000',
      fontFamily:'NovaSquareRegular',
      fontSize: 20,
      textAlign: 'center',
    },
    profile:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingTop:10,
      paddingBottom:50,
      margin:5,
    },
    logo:{
      width: 400,
      height: 200,
      marginTop: 0,
      marginBottom: 5,
      alignContent:'center',
    },
    logo1:{
      width: 400,
      height: 200,
      marginTop: -13,
      marginBottom: -20,
      alignContent:'center',
    },
  });

export default MainScreen;