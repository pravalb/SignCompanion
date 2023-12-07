import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import LoginLogo from '../assets/images/Login.png';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLoginPress = () => {
    if (!email.endsWith('@gmail.com')) {
      setEmailError('Invalid Email address');
      return;
    } else {
      setEmailError('');
    }

    signIn(); // Call the signIn function
  };
  const handleForgetPasswordPress = () => {
    // Navigate to the ForgetPasswordScreen
    navigation.navigate('Forgot Password');
  };
  const auth = FIREBASE_AUTH;
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Login Successful');
      
      // Only navigate if sign-in is successful
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } catch (error) {
      console.log(error);
      alert('Sign in Failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView>
      <View>
        <Image source={LoginLogo} style={[styles.logo]} resizeMode = "contain"/>
      </View>
      <View style={{
        flexDirection:'row',
        borderColor:"#c23a22",
        borderWidth: 1,
        borderRadius: 5,
        padding:10,
        marginBottom:25
        }}>
      <Text> <Icon name="mail" size={30}/> </Text>
      <TextInput placeholder= ' Email ID' style={{
        color:"black", 
        flex:1, 
        paddingVertical:0, 
        fontSize:20,
        fontWeight:'bold'}}
       keyboardType="email-address"
       onChangeText={(text) => {
        setEmail(text);
        setEmailError(''); // Clear the error when the user starts typing again
      }}/>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>
      <View style={{
         flexDirection:'row',
         borderColor:"#c23a22",
         borderWidth: 1,
         borderRadius: 5,
         padding:10,
         marginBottom:25
        }}>
      <Text> <Icon name="lock" size={30}/> </Text>
      <TextInput placeholder=' Password' style={{
        color:"black", 
        flex:1, 
        paddingVertical:0, 
        fontSize:20,
      fontWeight:'bold'}}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        />

        <TouchableOpacity onPress={handleForgetPasswordPress}>
          <Text style={{color:'#c23a22', fontSize:20,fontWeight:'bold', paddingRight:20}}>Forgot?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>   
      <Text style={{textAlign:'center', color:'#840000', fontWeight:'bold', marginBottom: 10, fontSize: 20}}>New to the app?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
      <Text style={{textAlign:'center', color:'#840000', fontWeight:'bold', fontSize: 20}}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
button: {
  backgroundColor: '#c23a22',
  paddingVertical: 15,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginBottom: 30,
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 25,
  textAlign: 'center',
},
errorText: {
  color: 'red',
  fontSize:16,
  marginBottom: 10,
},
logo:{
  width: 400,
  height: 400,
  marginTop: 25,
  marginBottom: 10,
  alignContent:'center',
},
});

export default LoginScreen;