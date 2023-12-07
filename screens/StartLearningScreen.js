import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';

const StartLearningScreen = ({ navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('ALPHABETS')} style={styles.button}> 
        <Text style={styles.buttonText}>ALPHABETS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('COLORS')} style={styles.button}> 
        <Text style={styles.buttonText}>COLORS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('NUMBERS')} style={styles.button}> 
        <Text style={styles.buttonText}>NUMBERS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DAYS')} style={styles.button}> 
        <Text style={styles.buttonText}>DAYS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FAMILY')} style={styles.button}> 
        <Text style={styles.buttonText}>FAMILY</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('EMOTIONS')} style={styles.button}> 
        <Text style={styles.buttonText}>EMOTIONS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('COMMON VERBS')} style={styles.button}> 
        <Text style={styles.buttonText}>COMMON VERBS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('INTROGATIVE WORDS')} style={styles.button}> 
        <Text style={styles.buttonText}>INTROGATIVE WORDS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DAILY USE PHRASES')} style={styles.button}> 
        <Text style={styles.buttonText}>DAILY USE PHRASES</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
  };

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 0,
    marginVertical: 10,
  },
  buttonText: {
    color: '#c23a22',
    fontSize: 40,
    fontFamily:"NovaSquareRegular",
    textAlign: 'center',
  },
  Text: {
    fontSize: 30,
    paddingTop: 100,
    paddingBottom:20,
    color: '#840000',
    fontFamily: "NovaSquareRegular" ,
    textAlign: 'center',
  },
  backgroundVideo: {
    flex: 1,
    paddingTop: 200,
    paddingRight: 200,
    paddingLeft: 200,
    paddingBottom: 100,
  },
});

export default StartLearningScreen;
