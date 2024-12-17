/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useLayoutEffect  } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';

export default function WrongQuizScreen({navigation}) {
  const [wrongAnswers, setWrongAnswers] = useState([]);

  // Helper function to remove duplicates
  const removeDuplicates = (answers) => {
    const seen = new Set();
    return answers.filter((item) => {
      const identifier = item.question || 'unknown';
      if (seen.has(identifier)) {
        return false;
      }
      seen.add(identifier);
      return true;
    });
  };

  // Load wrong answers from AsyncStorage
  useEffect(() => {
    const loadWrongAnswers = async () => {
      try {
        const savedWrongAnswers = await AsyncStorage.getItem('wrongAnswers');
        if (savedWrongAnswers) {
          const parsedAnswers = JSON.parse(savedWrongAnswers);
          const uniqueAnswers = removeDuplicates(parsedAnswers); // Remove duplicates
          setWrongAnswers(uniqueAnswers);
        }
      } catch (error) {
        console.error('Error loading wrong answers:', error);
      }
    };

    loadWrongAnswers();
  }, []);

  // Clear wrong answers from AsyncStorage and state
  const clearWrongAnswers = async () => {
    Alert.alert(
      'Confirm Clear',
      'Are you sure you want to clear all wrong answers?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('wrongAnswers');
              setWrongAnswers([]);
              Alert.alert('Success', 'Wrong answers cleared successfully.');
            } catch (error) {
              console.error('Error clearing wrong answers:', error);
              Alert.alert('Error', 'Failed to clear wrong answers.');
            }
          },
        },
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={clearWrongAnswers} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {wrongAnswers.length === 0 ? (
          <Text style={styles.emptyState}>
            No wrong answers recorded yet.
          </Text>
        ) : (
          wrongAnswers.map((item, index) => (
            <View key={index} style={styles.wrongAnswerItem}>
              <Text style={styles.questionText}>
                Q{index + 1}: {item.question || 'Question not available'}
              </Text>
              <Text style={styles.subHeader1}>Correct Answer:</Text>
              {item.correctAnswer?.uri ? (
                <Video
                  source={{ uri: item.correctAnswer.uri }}
                  style={styles.video}
                  controls={true}
                  repeat={true}
                  resizeMode="cover" 
                />
              ) : (
                <Text style={styles.missingVideo}>
                  Correct answer video not available
                </Text>
              )}
              <Text style={styles.subHeader}>Your Answer:</Text>
              {item.selectedAnswer?.uri ? (
                <Video
                  source={{ uri: item.selectedAnswer.uri }}
                  style={styles.video}
                  controls={true}
                  repeat={true}
                  resizeMode="cover" 
                />
              ) : (
                <Text style={styles.missingVideo}>
                  Your answer video not available
                </Text>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    marginRight: 15,
    padding: 10,
    backgroundColor: '#c23a22',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptyState: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins-SemiBold'
  },
  wrongAnswerItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-SemiBold'
  },
  subHeader: {
    fontSize: 16,
    fontFamily:'Poppins-SemiBold',
    color: '#f94449',
    marginTop: 10,
  },
  subHeader1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5ba447',
    marginTop: 10,
  },
  video: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  missingVideo: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
