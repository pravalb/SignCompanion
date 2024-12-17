import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Animated } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Option from './Options.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Questions from './questions.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function QuizScreen({ route, navigation }) {
  const { index } = route.params;
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const progress = useState(new Animated.Value(0))[0];

  // Load wrong answers from AsyncStorage when the component mounts
  useEffect(() => {
    const loadWrongAnswers = async () => {
      try {
        const savedWrongAnswers = await AsyncStorage.getItem('wrongAnswers');
        if (savedWrongAnswers) {
          setWrongAnswers(JSON.parse(savedWrongAnswers));
        }
      } catch (error) {
        console.error('Error loading wrong answers:', error);
      }
    };

    loadWrongAnswers();
  }, []);

  // Save wrong answers to AsyncStorage whenever they change
  useEffect(() => {
    const saveWrongAnswers = async () => {
      try {
        await AsyncStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));
      } catch (error) {
        console.error('Error saving wrong answers:', error);
      }
    };

    saveWrongAnswers();
  }, [wrongAnswers]);

  // Update progress on question change
  useEffect(() => {
    Animated.timing(progress, {
      toValue: (index + 1) / Questions.questions.length,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [index]);

  // Reset feedback and selected option when the index changes
  useEffect(() => {
    setAnswered(false);
    setSelectedOption(null);
    setFeedback(null);
  }, [index]);

  const handleWrongAnswer = (selectedAnswerIdx) => {
    const currentQuestion = Questions.questions[index];
    const correctAnswerUri = currentQuestion.answers[currentQuestion.correctIndex].uri;
    const selectedAnswerUri = currentQuestion.answers[selectedAnswerIdx]?.uri;

    const wrongAnswer = {
      question: currentQuestion.question,
      correctAnswer: { uri: correctAnswerUri },
      selectedAnswer: { uri: selectedAnswerUri },
    };

    setWrongAnswers((prev) => [...prev, wrongAnswer]);
  };

  const handleOptionAnswered = (selectedIdx, feedbackType) => {
    setAnswered(true);
    setSelectedOption(selectedIdx);
    setFeedback(feedbackType);

    if (feedbackType === 'wrong') {
      handleWrongAnswer(selectedIdx);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (index + 1 >= Questions.questions.length) {
              navigation.navigate('CongratsScreen');
            } else {
              navigation.navigate('QUIZ SCREEN', {
                index: index + 1,
              });
            }
          }}
        >
          <Icon name="arrow-forward" size={30} color="#c23a22" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.Question}>{Questions.questions[index].question}</Text>

        {Questions.questions[index].answers.map((option, i) => (
          <Option
            value={option}
            navigation={navigation}
            optionIdx={i}
            qnIndex={index}
            key={i}
            isVideo={true}
            selectedOption={selectedOption}
            onAnswered={handleOptionAnswered}
            feedback={feedback}
            answered={answered}
            correctAnswerIdx={Questions.questions[index].correctIndex}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#EDECEC',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#c23a22',
    borderRadius: 5,
  },
  icon: {
    paddingLeft: 350,
  },
  questionNo: {
    color: 'red',
    fontSize: 25,
    margin: 20,
  },
  Question: {
    fontSize: 25,
    margin: 5,
  },
  nextButton: {
    height: 50,
    width: '20%',
    backgroundColor: '#3700B3',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 20,
    borderRadius: 15,
  },
  nextText: {
    color: 'white',
    fontWeight: '900',
  },
});
