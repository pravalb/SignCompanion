import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import * as Progress from 'react-native-progress';
import ProgressCalculator from '../ProgressCalculator.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colors = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressCalculator, setProgressCalculator] = useState(new ProgressCalculator());

  const videos = [
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/34/34502.mp4', name: 'RED' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/22/22144.mp4', name: 'BLUE' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/34/34497.mp4', name: 'GREEN' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/34/34499.mp4', name: 'YELLOW' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/21/21610.mp4', name: 'ORANGE' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/30/30562.mp4', name: 'PURPLE' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/34/34509.mp4', name: 'BLACK' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/34/34525.mp4', name: 'WHITE' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/34/34511.mp4', name: 'GRAY' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/34/34504.mp4', name: 'BROWN' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/22/22812.mp4', name: 'PINK' },
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

export default colors;