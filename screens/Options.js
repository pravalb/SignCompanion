import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity,ScrollView, SafeAreaView} from 'react-native';
import Questions from './questions.json';
import {useStateValue} from './stateProvider';
import VideoPlayer from 'react-native-video-controls';
const Option = props => {
  const [{score}, dispatch] = useStateValue();
  const updateScore = Score => {
    dispatch({
      type: 'UPDATE_SCORE',
      score: Score,
    });
  };
  console.log(score);
  let correctAnswerIdx = Questions.questions[props.qnIndex].correctIndex;
  // let handleValidation = () => {
  //   if (props.optionIdx === correctAnswerIdx) {
  //     console.log('Correct Answer');
  //     setOptioncolor({borderColor: 'green'});
  //   } else {
  //     console.log('Wrong Answer');
  //     setOptioncolor({borderColor: 'red'});
  //   }
  // };
  return (
    <TouchableOpacity
      onPress={() => {
        props.optionIdx === correctAnswerIdx ? updateScore(1) : updateScore(0);
        if (props.qnIndex + 1 >= Questions.questions.length) {
          console.log('End of Quiz');
          props.navigation.navigate('CongratsScreen');
        } else {
          props.navigation.navigate('QuestionScreen', {
            index: props.qnIndex + 1,
          });
        }
      }}>
      <View style={[styles.Option, props.isVideo && styles.VideoOption]}>
        {props.isVideo ? (
          <VideoPlayer
            source={{ uri: props.value.uri }} // Assuming the video source is provided as a URI
            style={{ height: '100%', width: '100%' }}
            disableBack
            disableFullscreen
          />
        ) : (
        <Text style={styles.OptionText}>{props.value}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Option;

const styles = StyleSheet.create({
  Option: {
    borderColor: 'black',
    borderWidth: 3,
    paddingHorizontal:30,
    margin: 40,
    marginBottom: 3,
    borderRadius: 5,
    height: 95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDECEC',
  },
  VideoOption: {
    height: 200, // Adjust the height for video options
  },
  OptionText: {
    fontSize: 26,
  },
});