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
    { uri: 'https://www.signingsavvy.com/media2/mp4-ld/22/22100.mp4', name: 'How are you?' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/32/32333.mp4', name: 'What is your name?' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/32/32330.mp4', name: 'My name is' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/29/29516.mp4', name: 'Nice to meet you' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/34/34257.mp4', name: 'How old are you?' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/21/21532.mp4', name: 'I am sorry' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/22/22743.mp4', name: 'See you later' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/9/9148.mp4', name: 'Good morning' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/9/9149.mp4', name: 'Good afternoon' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/35/35816.mp4', name: 'Good evening' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/36/36009.mp4', name: 'Good night' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/26/26042.mp4', name: 'What time is it?' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/25/25899.mp4', name: 'I am hungry' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/23/23159.mp4', name: 'I am thirsty' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/34/34746.mp4', name: 'I LOVE YOU' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/35/35307.mp4', name: 'THANK YOU' },
{ uri: 'https://www.signingsavvy.com/media2/mp4-ld/21/21562.mp4', name: 'HOW' },
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
