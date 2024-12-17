import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from "react-native-vector-icons/Ionicons";
import { setDoc, doc } from 'firebase/firestore';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { launchImageLibrary } from 'react-native-image-picker';

const FirstTimeUserScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
    const handleSignupPress = () => {
    console.log('Name:', fullName);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    if (!email.endsWith('@gmail.com')) {
      setEmailError('Invalid Email address');
      return;
    } else {
      setEmailError('');
    }

    if (password.trim() !== confirmPassword.trim()) {
      setPasswordError("Passwords don't match");
      return;
    } else {
      setPasswordError('');
    }
  
    signUp(); // Call the signUp function only if both conditions are met
  };

  const auth = FIREBASE_AUTH;
  
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      // Set display name
      await updateProfile(user, { displayName: fullName });

      const userDoc = {
        fullName: fullName,
        email: email,
        dob: date.toDateString(),
        password: password,
      };
      await setDoc(doc(FIRESTORE_DB, 'users', user.uid), userDoc);
      
      console.log(response);
      alert('Registration Successful');
      navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'User Login' }],
      })
    );
  } catch (error) {
    console.log(error);
    alert('Sign Up Failed: ' + error.message);
  } finally {
    setLoading(false);
  }
};
  
const [secureEntery, setSecureEntery] = useState(true);
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
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
      </View>
      {/* form  */}
      <View style={styles.formContainer}></View>
      <View style={styles.inputContainer}>
      <Icon name={"person"} size ={30} color='#c23a22'/>
          <TextInput
            style={styles.textInput}
            placeholder="Full Name"
            placeholderTextColor="black"
            onChangeText={(text) => {
              setFullName(text);
            }}
          />
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
        <View style={styles.inputContainer}>
      <Entypo name={"calendar"} size ={30} color='#c23a22'/>
      <TouchableOpacity onPress={() => setOpen(true)}>
          <Text
            style={styles.textInput}
          > {dobLabel} </Text>
          </TouchableOpacity>
        </View>
      <DatePicker
      modal
      open={open}
      date={date}
      mode={'date'}
      maximumDate={new Date()}
      minimumDate={new Date('1980-01-01')}
      onConfirm={(date) => {
        setOpen(false);
        setDate(date);
        setDobLabel(date.toDateString());
      }}
      onCancel={() => {
        setOpen(false);
      }}
      />
        <View style = {styles.inputContainer}>
          <Entypo name={"lock"} size ={30} color='#c23a22'/>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor='black'
            secureTextEntry={secureEntery}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntery((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} color='#c23a22' />
          </TouchableOpacity>
        </View>
        <View style = {styles.inputContainer}>
          <Entypo name={"lock"} size ={30} color='#c23a22'/>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            placeholderTextColor='black'
            secureTextEntry={secureEntery}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setPasswordError(''); // Clear the error when the user starts typing again
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntery((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} color='#c23a22' />
          </TouchableOpacity>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>
        
      <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignupPress} >
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../assets/images/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity> 
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
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  formContainer: {
    marginTop: -20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#c23a22',
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
errorText: {
  color: 'red',
  fontSize:16,
  marginBottom: 10,
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
});

export default FirstTimeUserScreen; 