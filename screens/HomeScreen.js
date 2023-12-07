import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://media.istockphoto.com/id/1388451454/vector/sign-language-tutor-isolated-cartoon-vector-illustration.jpg?s=612x612&w=0&k=20&c=OwWBLnuy8PtfDG5GVESTVDkJG8Lw5p2iWxpV8Idb7qI=' }}
        style={styles.logo}
      />
      <Text style={styles.appText}>Welcome to</Text>
      <Text style={styles.appName}>SignCompanion</Text>
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
    backgroundColor: '#fff',
  },
  logo: {
    width: 500,
    height: 500,
    marginBottom: -60,
    marginTop:-50,
  },
  appText: {
    fontSize: 50,
    color: '#840000',
    fontFamily: "Pacifico-Regular" ,
    marginBottom: -40,
  },
  appName: {
    fontSize: 50,
    color: '#840000',
    fontFamily: "Pacifico-Regular" ,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#c23a22',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
