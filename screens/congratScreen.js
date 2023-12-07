import React from 'react';
import {StyleSheet, Text, View, Linking, Button, Image} from 'react-native';
import {useStateValue} from './stateProvider.js';
import Questions from './questions.json';
import Celebration from '../assets/images/Celebration.png';
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
  
    </View>
  );
};

export default CongratScreen;

const styles = StyleSheet.create({
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
    color:'#840000',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily:"NovaSquareRegular"
  },
  scoreStyle: {
    position: 'relative',
    bottom: 105,
    fontSize: 45,
    fontWeight: '800',
  },
});