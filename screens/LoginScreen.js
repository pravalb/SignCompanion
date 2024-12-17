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
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import GoogleSignin from '../googleSigninConfig'; // Import the configuration

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
        signIn();
    };

    const handleForgetPasswordPress = () => {
        navigation.navigate('Forgot Password');
    };

    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Login Successful');
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

    const [secureEntry, setSecureEntry] = useState(true);

    const handleGoogleLogin = async () => {
      setLoading(true);
      try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log('User Info:', userInfo);
  
          // Correctly extract idToken
          const idToken = userInfo.data?.idToken; 
          console.log('ID Token:', idToken);
  
          if (!idToken) {
              throw new Error('ID token not available.');
          }
  
          // Proceed with backend or navigation
          navigation.dispatch(
              CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
              })
          );
      } catch (error) {
          console.error('Google Sign-In Error:', error);
          alert('Google Sign-In failed: ' + error.message);
      } finally {
          setLoading(false);
      }
  };
  
  

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.textContainer}>
                <Text style={styles.headingText}>Hey,</Text>
                <Text style={styles.headingText}>Welcome</Text>
                <Text style={styles.headingText}>Back</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Entypo name={"mail"} size={30} color='#c23a22' />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your email"
                        placeholderTextColor='black'
                        keyboardType="email-address"
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailError('');
                        }}
                        value={email}
                    />
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <View style={styles.inputContainer}>
                    <Entypo name={"lock"} size={30} color='#c23a22' />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your password"
                        placeholderTextColor='black'
                        secureTextEntry={secureEntry}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
                        <SimpleLineIcons name={"eye"} size={20} color='#c23a22' />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleForgetPasswordPress}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLoginPress} style={styles.loginButtonWrapper}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.continueText}>or continue with</Text>
            <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleButtonContainer}>
                <Image source={require("../assets/images/google.png")} style={styles.googleImage} />
                <Text style={styles.googleText}>Google</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
                <Text style={styles.accountText}>Don’t have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  formContainer:{
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#c23a22',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical:5,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "black",
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 10,
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
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: '#c23a22',
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  signupText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
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