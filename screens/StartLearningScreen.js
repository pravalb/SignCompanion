import React, { useState, useEffect, useLayoutEffect  } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo';

const StartLearningScreen = ({ navigation }) => {
  const [progressData, setProgressData] = useState({
    alphabets: 0,
    colors: 0,
    numbers: 0,
    days: 0,
    family: 0,
    emotions: 0,
    commonverbs: 0,
    interrogativewords: 0,
    dailyusephrases: 0,
  });

  // Define the number of videos for each section
  const sectionVideos = {
    alphabets: 26, // 26 letters in the alphabet
    colors: 11, // Example: 10 colors
    numbers: 11, // Example: 10 numbers
    days: 7, // 7 days of the week
    family: 16, // Example: 10 family members
    emotions: 10, // Example: 10 emotions
    commonverbs: 10, // Example: 20 common verbs
    interrogativewords: 6, // Example: 10 interrogative words
    dailyusephrases: 17, // Example: 20 daily use phrases
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const savedVideoProgress = await AsyncStorage.getItem('videoProgress');
        if (savedVideoProgress) {
          const progressData = JSON.parse(savedVideoProgress);
          const sections = Object.keys(sectionVideos); // Get all section keys
  
          const updatedProgress = {}; // Store section-level progress here
  
          sections.forEach((section) => {
            const sectionProgressData = Object.keys(progressData)
              .filter((key) => key.startsWith(`${section}_`))
              .reduce((obj, key) => {
                obj[key] = progressData[key];
                return obj;
              }, {});
  
            const totalVideos = sectionVideos[section]; // Total videos in this section
            const completedVideos = Object.keys(sectionProgressData).length;
            const progress = completedVideos / totalVideos;
  
            updatedProgress[section] = progress; // Store progress for the section only
          });
  
          setProgressData(updatedProgress); // Update state with section-level progress
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };
  
    fetchProgress();
  }, []); // Run once on mount
  
  const resetProgress = async () => {
    try {
      await AsyncStorage.removeItem('videoProgress');
      setProgressData({
        alphabets: 0,
        colors: 0,
        numbers: 0,
        days: 0,
        family: 0,
        emotions: 0,
        commonverbs: 0,
        interrogativewords: 0,
        dailyusephrases: 0,
      });
      Alert.alert('Success', 'All progress has been reset.');
    } catch (error) {
      console.error('Error resetting progress:', error);
      Alert.alert('Error', 'Failed to reset progress.');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={resetProgress} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        {/* Map over the sections to render each one dynamically */}
        {Object.keys(progressData).map((section) => (
          <View style={styles.row} key={section}>
            <TouchableOpacity onPress={() => navigation.navigate(section.toUpperCase())} style={styles.iconButton}>
              <MaterialCommunityIcons name={getIconName(section)} size={50} color="#c23a22" />
              <Text style={styles.iconText}>{capitalizeFirstLetter(section)}</Text>
              <Progress.Circle
                size={50}
                thickness={5}
                color='#c23a22'
                showsText={true}
                style={styles.progress}
                progress={progressData[section]}
                formatText={() => `${Math.round(progressData[section] * 100)}%`}
                textStyle={styles.progressText}
              />
            </TouchableOpacity>
          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
    
  );
};

// Helper function to get the correct icon for each section
const getIconName = (section) => {
  switch (section) {
    case 'alphabets':
      return 'alphabetical';
    case 'colors':
      return 'palette';
    case 'numbers':
      return 'numeric';
    case 'days':
      return 'calendar-today';
    case 'family':
      return 'account-group';
    case 'emotions':
      return 'emoticon-happy';
    case 'commonverbs':
      return 'run-fast';
    case 'interrogativewords':
      return 'help-circle';
    case 'dailyusephrases':
      return 'message-text';
    default:
      return 'help-circle'; // Default icon in case something is missing
  }
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).replace(/([A-Z])/g, ' $1');
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  iconButton: {
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  iconText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  progress: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
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
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#c23a22',
    paddingVertical: 10,
    borderRadius: 200
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  }
});

export default StartLearningScreen;
