import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Profilepic from '../assets/images/Profile.png';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { onAuthStateChanged, signOut} from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      if (authUser) {
        // User is signed in.
        // You can use authUser.email, authUser.uid, etc. for user information
        setUser(authUser);
      } else {
        // No user is signed in.
        setUser(null);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      // Clear user data in your component state
      setUser(null);
      // Navigate back to the home screen
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };
  return (
    <View>
      <Image source={Profilepic} style={[styles.logo]} resizeMode="contain" />
      {user ? (
        <>
        <Text style={styles.text}>Full Name: {user.displayName}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.button}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.text}>User not logged in</Text>
      )}
      {/* Add more user information as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  icon:{
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 400,
    height: 400,
    marginTop: 0,
    marginBottom: 5,
    alignContent: 'center',
  },
  button: {
    marginTop:120,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    color: '#c23a22',
    fontFamily:'Poppins-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Profile;
