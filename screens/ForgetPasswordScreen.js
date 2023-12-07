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
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View>
        <Image source={ForgotLogo} style={[styles.logo]} resizeMode = "contain"/>
        </View>
        <View style={{
          flexDirection: 'row',
          borderColor: "#c23a22",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 25
        }}>
          <TextInput
            placeholder='✉︎   Email ID'
            style={{
              color: "black",
              flex: 1,
              paddingVertical: 0,
              fontSize: 20,
              fontWeight: 'bold'
            }}
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(''); // Clear the error when the user starts typing again
            }}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        {resetEmailSent && (
          <Text style={styles.successText}>Password reset email sent successfully!</Text>
        )}
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
    fontSize: 16,
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    fontSize: 16,
    marginTop: 10,
  },
  logo:{
    width: 400,
    height: 400,
    marginBottom: 10,
    alignContent:'center',
  },
});

export default ForgetPasswordScreen;
