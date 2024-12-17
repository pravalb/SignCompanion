import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, SafeAreaView } from 'react-native';
import learning from '../assets/images/learning.png';
import Exams from '../assets/images/Exams.png';
import teach from '../assets/images/teach.png';
import teach1 from '../assets/images/teach1.png';
import kids from '../assets/images/Kids.png';
import Ok from '../assets/images/Ok.png';
import mistake from '../assets/images/mistake.png';
import like from '../assets/images/like.png';
import About from '../assets/images/About.png';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


const MainScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      if (authUser) {
        setDisplayName(authUser.displayName || ''); // Use an empty string if display name is not available
      } else {
        setDisplayName('');
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hello,</Text>
          {displayName ? (
            <Text style={styles.userName}>{displayName}</Text>
          ) : (
            <Text style={styles.userName}>User</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PROFILE')}>
          <Ionicons name="person-circle-outline" size={50} color="#c23a22" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView>

          {/* Main Content */}
          {/* Add your features and content as per your existing code */}
  <Text style = {styles.text}>START LEARNING</Text>  
  <View style={styles.thumbnailContainer}>
  <ScrollView horizontal 
    showsHorizontalScrollIndicator={false} 
    contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity onPress={() => navigation.navigate('START LEARNING')}>
      <Image source={teach1} resizeMode = "cover" style={styles.thumbnail} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('START LEARNING')}>
      <Image source={kids} style={styles.thumbnail} resizeMode = "cover"/>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('START LEARNING')}>
      <Image source={teach} style={styles.thumbnail} />
    </TouchableOpacity>
    <View style={styles.iconWrapper}>
      <TouchableOpacity onPress={() => navigation.navigate('START LEARNING')}>
        <Ionicons name="arrow-forward" size={40} color="#c23a22" />
      </TouchableOpacity>
    </View>
  </ScrollView>
</View>
<Text style={styles.text1}>SIGN DETECTION</Text>
      <View style={styles.featureSection}>
      <TouchableOpacity onPress={() => navigation.navigate('SIGN DETECTION')}> 
        <Image source={Ok} style={[styles.logo]} resizeMode = "cover"/>
      </TouchableOpacity>
      </View>
      <Text style={styles.text2}>TEST YOUR KNOWLEDGE</Text>
      <View style={styles.featureSection}>
      <TouchableOpacity onPress={() => navigation.navigate('QUIZ SCREEN')}> 
        <Image source={Exams} style={[styles.logo]} resizeMode = "cover"/>
      </TouchableOpacity>
      </View>
      <Text style={styles.text2}>LEARN FROM YOUR MISTAKES</Text>
      <View style={styles.featureSection}>
      <TouchableOpacity onPress={() => navigation.navigate('MISTAKES TRACKER')}> 
        <Image source={mistake} style={[styles.logo]} resizeMode = "cover"/>
      </TouchableOpacity>
      </View>
      <Text style={styles.text2}>TAKE A LOOK AT YOUR FAVORITES</Text>
      <View style={styles.featureSection}>
      <TouchableOpacity onPress={() => navigation.navigate('FAVORITES')}> 
        <Image source={like} style={[styles.logo]} resizeMode = "cover"/>
      </TouchableOpacity>
      </View>
      <Text style={styles.text2}>ABOUT US</Text>
      <View style={styles.featureSection}>
      <TouchableOpacity onPress={() => navigation.navigate('ABOUT US')}> 
        <Image source={About} style={[styles.logo]} resizeMode = "cover"/>
      </TouchableOpacity>
      </View>
        </SafeAreaView>
      </ScrollView>

      
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
    zIndex: 1000,
  },
  thumbnailContainer: {
    marginVertical: 25,
    flexDirection: 'row',
  },
  scrollContent: {
    alignItems: 'center', // Align items in the center
  },
  thumbnail: {
    width: 200,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: '#c23a22',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5', // Optional placeholder color
  },
  iconWrapper: {
    justifyContent: 'center', // Vertically center the icon
    alignItems: 'center', // Horizontally center the icon
    marginHorizontal: 10, // Add spacing between thumbnails and icon
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 80, // To prevent overlapping with footer
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greetingContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  userName: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    color: '#c23a22',
  },
  
  featureSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  featureItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: '#c23a22',
    borderWidth: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    
  },
  text:{
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    paddingTop: 10
  },
  text1:{
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    paddingBottom: 20,
  },
  text2:{
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    paddingBottom: 20,
    paddingTop: 25
  },
  footer: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#c23a22',
    paddingVertical: 10,
    borderRadius: 200
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default MainScreen;
