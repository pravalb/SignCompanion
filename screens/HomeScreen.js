import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import babelConfig from '../babel.config';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://media.istockphoto.com/id/1388451454/vector/sign-language-tutor-isolated-cartoon-vector-illustration.jpg?s=612x612&w=0&k=20&c=OwWBLnuy8PtfDG5GVESTVDkJG8Lw5p2iWxpV8Idb7qI=' }}
        style={styles.logo}
        resizeMode="contain" // Ensures the image scales proportionally
      />
      <Text style={styles.appName}>SignConnect</Text>
      <Text style={styles.appText}>Explore, Learn and Engage with sign language</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('User Login')} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20, // Ensures proper padding for different screen sizes
  },
  logo: {
    width: '100%', // Makes the image responsive
    height: undefined,
    aspectRatio: 1, // Keeps the aspect ratio of the image
    marginBottom: Platform.OS === 'ios' ? -40 : -30, // Adjusts based on platform
  },
  appText: {
    fontSize: 20,
    color: 'black',
    fontFamily: "Poppins-Regular" , // Uses system font as fallback
    marginBottom: 10,
    marginTop : 15,
    textAlign: 'center',
  },
  appName: {
    fontSize: 35,
    color: '#c23a22',
    fontFamily: "Poppins-Bold" ,
    marginBottom: 5,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#c23a22',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000', // Adds a shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5, // Ensures shadow on Android
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;

