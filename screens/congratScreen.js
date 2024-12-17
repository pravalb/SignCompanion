import React from 'react';
import {StyleSheet, Text, View, Linking, Button, Image} from 'react-native';
import {useStateValue} from './stateProvider.js';
import Questions from './questions.json';
import Celebration from '../assets/images/Celebration.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const CongratScreen = ({navigation}) => {
  const [{user, score}] = useStateValue();
  const widthAndHeight = 150;
  const series = [score, Questions.questions.length - score];
  const sliceColor = ['#00FF00'];
  return (
    <View style={styles.cogratsScreen}>
      <View>
        <Image source={Celebration} style={[styles.logo]} resizeMode = "contain"/>
      </View>
      <Text style={styles.congratsText}>
        Congratulations {user}, You've scored {score} points
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('MISTAKES TRACKER')} style={styles.button}>
      <Text style={styles.buttonText}>Review Mistakes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CongratScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#c23a22',
    borderRadius: 100,
    marginTop: 20,
    paddingHorizontal: 30
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: "center",
    padding: 10,
  },
  cogratsScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 400,
    height: 400,
    marginTop: 25,
    marginBottom: 10,
    alignContent:'center',
  },
  congratsText: {
    fontSize: 26,
    color:'#c23a22',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily:"Poppins-SemiBold"
  },
  scoreStyle: {
    position: 'relative',
    bottom: 105,
    fontSize: 45,
    fontWeight: '800',
  },
});