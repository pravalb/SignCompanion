import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import SignupLogo from '../assets/images/Signup.png';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FirstTimeUserScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('📅  Date of Birth');
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
  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView>
      <View>
        <Image source={SignupLogo} style={[styles.logo]} resizeMode = "contain"/>
      </View>
      <View style={{
        flexDirection:'row',
        borderColor:"#c23a22",
        borderWidth: 1,
        borderRadius: 5,
        padding:10,
        marginBottom:25
        }}>

<Text> <Icon name="person" size={30}/> </Text>    
      <TextInput placeholder=' Full Name' style={{
        color:"black", 
        flex:1, 
        paddingVertical:0, 
        fontSize:20,
        fontWeight:'bold'}}
        onChangeText={(text) => {
          setFullName(text);
        }}
        />
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
      <TextInput placeholder=' Email ID' style={{
        color:"black", 
        flex:1, 
        paddingVertical:0, 
        fontSize:20,
        fontWeight:'bold'}}
       keyboardType="email-address"
       onChangeText={(text) => {
        setEmail(text);
        setEmailError(''); // Clear the error when the user starts typing again
      }}
      />
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
      <TextInput placeholder=' Confirm Password' style={{
        color:"black", 
        flex:1, 
        paddingVertical:0, 
        fontSize:20,
      fontWeight:'bold'}}
        secureTextEntry={true}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setPasswordError(''); // Clear the error when the user starts typing again
        }}
        />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>
      <View style={{
        flexDirection:'row',
        borderColor:"#c23a22",
        borderWidth: 1,
        borderRadius: 5,
        padding:10,
        marginBottom:25
        }}>
    
    <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={{
            color:"black", 
            marginLeft:5,
            marginTop:5,
            fontSize:20,
            fontWeight:'bold'}}>
              {dobLabel}
            </Text>
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
      <TouchableOpacity onPress={handleSignupPress} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
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
  width: 300,
  height: 300,
  marginBottom: 10,
  marginLeft:55,
  marginTop:10,
},
});

export default FirstTimeUserScreen;
