import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Questions from './questions.json';
import { useStateValue } from './stateProvider';

const Option = (props) => {
  const [{ score }, dispatch] = useStateValue();

  const updateScore = (Score) => {
    dispatch({
      type: 'UPDATE_SCORE',
      score: Score,
    });
  };

  const correctAnswerIdx = Questions.questions[props.qnIndex].correctIndex;

  const handleOptionPress = () => {
    if (props.answered) return;
    const isCorrect = props.optionIdx === correctAnswerIdx;
    const feedbackType = isCorrect ? 'correct' : 'wrong';
    props.onAnswered(props.optionIdx, feedbackType);

    if (!isCorrect && props.onWrongAnswer) {
      props.onWrongAnswer({
        question: Questions.questions[props.qnIndex].question,
        selectedAnswer: props.value,
        correctAnswer: Questions.questions[props.qnIndex].answers[correctAnswerIdx],
      });
    }

    updateScore(isCorrect ? 1 : 0);
  };

  const isCorrectOption = props.optionIdx === correctAnswerIdx;
  const isSelectedWrongOption =
    props.selectedOption === props.optionIdx && props.feedback === 'wrong';

  return (
    <TouchableOpacity onPress={handleOptionPress} disabled={props.answered}>
      <View
        style={[
          styles.Option,
          props.isVideo && styles.VideoOption,
          isSelectedWrongOption && { backgroundColor: '#f94449' }, // Red for wrong
          props.feedback && isCorrectOption && { backgroundColor: '#5ba447' }, // Green for correct
        ]}
      >
        {props.isVideo ? (
          <Video
            source={{ uri: props.value.uri }}
            style={{ height: '100%', width: '100%' }}
            disableBack
            disableFullscreen
            repeat={true}
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
    borderWidth: 1,
    paddingHorizontal: 30,
    margin: 10,
    marginBottom: -3,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDECEC',
  },
  VideoOption: {
    height: 150,
  },
  OptionText: {
    fontSize: 26,
  },
});
