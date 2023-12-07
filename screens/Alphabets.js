import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import * as Progress from 'react-native-progress';
import ProgressCalculator from '../ProgressCalculator.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressCalculator, setProgressCalculator] = useState(new ProgressCalculator());
  const videos = [
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26710.mp4', name: 'A' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26711.mp4', name: 'B' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26712.mp4', name: 'C' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26713.mp4', name: 'D' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26714.mp4', name: 'E' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26715.mp4', name: 'F' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26716.mp4', name: 'G' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26717.mp4', name: 'H' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26718.mp4', name: 'I' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26719.mp4', name: 'J' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26720.mp4', name: 'K' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26721.mp4', name: 'L' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26722.mp4', name: 'M' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26723.mp4', name: 'N' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26724.mp4', name: 'O' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26725.mp4', name: 'P' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26726.mp4', name: 'Q' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26727.mp4', name: 'R' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26728.mp4', name: 'S' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26729.mp4', name: 'T' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26730.mp4', name: 'U' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26731.mp4', name: 'V' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26732.mp4', name: 'W' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26733.mp4', name: 'X' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26734.mp4', name: 'Y' },
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26735.mp4', name: 'Z' },  
  ];

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedProgress = await AsyncStorage.getItem('progress');
        if (savedProgress !== null) {
          setProgress(parseFloat(savedProgress));
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };

    loadProgress();
  }, []);

  const saveProgress = async () => {
    try {
      await AsyncStorage.setItem('progress', progress.toString());
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleVideoCompletion = () => {
    // Assuming each video contributes 10% to progress
    const videoProgress = (1 / videos.length) * 100;
    console.log('Video completion triggered. Progress:', videoProgress);
    setProgress((prevProgress) => {
      const newProgress = prevProgress + videoProgress;
       const cappedProgress = newProgress > 100 ? 100 : newProgress; // Ensure progress doesn't exceed 100%
      saveProgress(); // Save the progress when it changes
      return cappedProgress;// Ensure progress doesn't exceed 100%
    });
  };
  
  useEffect(() => {
    // Update progress when progressCalculator changes
    console.log('Effect triggered. Progress:', progressCalculator.getCurrentValue());
    setProgress(progressCalculator.getCurrentValue());
  }, [progressCalculator]);

  const playNextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
  };
  
  const playbackVideo = () => {
    const backIndex = (currentVideoIndex - 1) % videos.length;
    setCurrentVideoIndex(backIndex);
  };
  

  return (
    <View>
      <Text style={styles.Text}>{videos[currentVideoIndex].name}</Text>
      <VideoPlayer
        source={videos[currentVideoIndex]}
        style={styles.backgroundVideo}
        controls={true}
        onEnd={handleVideoCompletion}
      />
      <TouchableOpacity onPress={playNextVideo} style={styles.button}> 
        <Text style={styles.buttonText}>Next Video</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={playbackVideo} style={styles.button}> 
        <Text style={styles.buttonText}>Previous Video</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly', borderWidth: 2,
      borderColor: '#840000',  
      borderRadius: 50, marginTop:70}}>
      <Text style={styles.Text}>PROGRESS</Text>
      <Progress.Pie progress={progress/100} size={70} color='#840000' marginBottom='10' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: '#c23a22',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  Text: {
    marginTop:-70,
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

export default App;
