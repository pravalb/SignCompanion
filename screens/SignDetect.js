import React, { useState }from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import { Linking, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

const SignDetect = () => {
  const handleLinkOpen = async () => {
    const url = 'http://192.168.1.92:8501';
    try {
      // Open the URL in the browser
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };
  const navigation = useNavigation();
  const [imageSource, setImageSource] = useState(require('../assets/images/Selfie.png'));

  // Function to change the image on click
  const changeImage = () => {
    // Toggle between two images on click
    setImageSource(prevState =>
      prevState === require('../assets/images/Selfie.png')
        ? require('../assets/images/upload.png')  // Change to image2
        : require('../assets/images/Selfie.png')  // Change back to image1
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          SignConnect is revolutionizing the way we interact with the Deaf community. By utilizing advanced Real-Time 📷 Sign Language Detection and Image-Based 🖼️ Sign Recognition. 
        </Text>
        <TouchableOpacity onPress={changeImage}>
          <Image source={imageSource} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLinkOpen}>
          <Text style={styles.buttonText}>Try Real-time Sign Detection</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 70,
    borderRadius: 10,
    marginTop: 10
  },
  button: {
    flexDirection: "row",
  borderWidth: 1,
  borderColor: '#c23a22',
  borderRadius: 100,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 10,
  gap: 10,
  },
  description: {
    paddingTop: 50,
    fontSize: 18,
    color: 'black',
    fontFamily:'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 30,
    paddingBottom: 20
  },
  buttonText: {
    color: '#c23a22',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default SignDetect;
