// ForgetPasswordScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import ForgotLogo from '../assets/images/Forgotpassword.png';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from 'react-native-vector-icons/Entypo';

const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.endsWith('@gmail.com')) {
      setEmailError('Invalid Email address');
      return;
    } else {
      setEmailError('');
    }

    try {
      const auth = FIREBASE_AUTH;
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
      // You can provide feedback to the user that the reset email has been sent
    } catch (error) {
      console.error(error);
      alert('Failed to send reset email: ' + error.message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={() => navigation.navigate('User Login')}>
        <Ionicons
          name={"arrow-back-outline"}
          color={'white'}
          size={20}
        />
      </TouchableOpacity>
        <View>
        <Image source={ForgotLogo} style={[styles.logo]} resizeMode = "contain"/>
        </View>
        <View style={styles.inputContainer}>
      <Entypo name={"mail"} size ={30} color='#c23a22'/>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="black"
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(''); // Clear the error when the user starts typing again
            }}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>
  
        <TouchableOpacity onPress={handleResetPassword} style={styles.loginButtonWrapper}>
          <Text style={styles.loginText}>Reset Password</Text>
        </TouchableOpacity>

        {resetEmailSent && (
          <Text style={styles.successText}>Password reset email sent successfully!</Text>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: '#c23a22',
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#c23a22',
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  loginButtonWrapper: {
    backgroundColor: '#c23a22',
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: "center",
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  successText: {
    color: 'green',
    fontSize: 12,
    marginTop: 20,
    textAlign: "center",
    fontFamily: 'Poppins-Regular',
  },
  logo:{
    width: '100%', // Makes the image responsive
    height: undefined,
    aspectRatio: 1, // Keeps the aspect ratio of the image
    marginBottom: Platform.OS === 'ios' ? 40 : 30, 
  },
});

export default ForgetPasswordScreen;
