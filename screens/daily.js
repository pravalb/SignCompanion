import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Daily = () => {
  const navigation = useNavigation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoProgress, setVideoProgress] = useState({});
  const [favorites, setFavorites] = useState([]);

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
    const loadState = async () => {
      try {
        const savedVideoProgress = await AsyncStorage.getItem('videoProgress');
        const savedCurrentIndex = await AsyncStorage.getItem('currentVideoIndex');
        const savedFavorites = await AsyncStorage.getItem('favorites');

        if (savedVideoProgress !== null) {
          setVideoProgress(JSON.parse(savedVideoProgress));
        }
        if (savedCurrentIndex !== null) {
          setCurrentVideoIndex(parseInt(savedCurrentIndex, 10));
        }
        if (savedFavorites !== null) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading state:', error);
      }
    };

    loadState();
  }, []);

  const saveFavorites = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const toggleFavorite = (video) => {
    const isFavorite = favorites.some((fav) => fav.uri === video.uri);
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.uri !== video.uri);
    } else {
      updatedFavorites = [...favorites, video];
    }
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };


  const saveState = async () => {
    try {
      await AsyncStorage.setItem('videoProgress', JSON.stringify(videoProgress));
      await AsyncStorage.setItem('currentVideoIndex', currentVideoIndex.toString());
    } catch (error) {
      console.error('Error saving state:', error);
    }
  };

  const handleVideoCompletion = () => {
    const videoName = `dailyusephrases_${videos[currentVideoIndex].name}`; // Prefix with section identifier
    if (!videoProgress[videoName]) {
      const updatedProgress = { ...videoProgress, [videoName]: true };
      setVideoProgress(updatedProgress);
      saveState();
    }
  };

  const playNextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
  };

  const playbackVideo = () => {
    const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    setCurrentVideoIndex(prevIndex);
  };

  const totalVideos = videos.length;
  const completedVideos = Object.keys(videoProgress).length;

  const progress = (completedVideos / totalVideos) * 100;

  const handleVideoSelect = (selectedIndex) => {
    setCurrentVideoIndex(selectedIndex);
  };

 
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Video Picker for selecting video */}
        <Picker
          mode = "dropdown"
          selectedValue={currentVideoIndex}
          onValueChange={(itemValue) => handleVideoSelect(itemValue)}
          style={styles.picker}
          itemStyle={{ color: 'black', fontSize: 20, fontFamily: "Poppins-Bold" }}
        >
          {videos.map((video, index) => (
            <Picker.Item key={index} label={video.name} value={index} />
          ))}
        </Picker>

        {/* Text Pop-up for the selected video */}
       
        <View style={styles.navigationButtonsWrapper}>
        <TouchableOpacity onPress={playbackVideo} style={styles.backButtonWrapper}>
          <MaterialIcons name={"arrow-back-ios"} size={20} color="#c23a22" />
        </TouchableOpacity>

        <TouchableOpacity onPress={playNextVideo} style={styles.backButtonWrapper}>
        <MaterialIcons name={"arrow-forward-ios"} size={20} color="#c23a22" />
        </TouchableOpacity>
        </View>


        {/* Space between Picker and Video Player */}
        <View style={styles.videoContainer}>
          {/* Video Player */}
          <Video
            key={videos[currentVideoIndex].uri}  // Add key to force re-render on video change
            source={videos[currentVideoIndex]}
            style={styles.backgroundVideo}
            controls={true}
            onEnd={handleVideoCompletion}
            resizeMode="cover" 
          />
        </View>

        <TouchableOpacity
          onPress={() => toggleFavorite(videos[currentVideoIndex])}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {favorites.some((fav) => fav.uri === videos[currentVideoIndex].uri)
              ? 'Remove from Favorites'
              : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FAVORITES')} style={styles.button}>
          <Text style={styles.buttonText}>Go to Favorites</Text>
        </TouchableOpacity>

        {/* Progress Bar */}
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 100,  // Ensures there's space at the bottom for buttons
  },
  navigationButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space the buttons out
    alignItems: 'center',  // Ensures the icons are vertically aligned
    marginVertical: 30,  // Adds space between the buttons and the video player
    paddingHorizontal: 40, // Adds some padding on the sides
  },
  buttonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    marginVertical: 20, // Adds space around the video player
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    marginVertical: 10,
  },
  buttonText: {
    color: '#c23a22',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
  backgroundVideo: {
    width: '100%',
    height: 300,  // Adjusted height for the video
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#c23a22',
    borderRadius: 50,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 20, // Adds space below the picker
    color: '#c23a22',
  },
  selectedVideoText: {
    fontSize: 18,
    color: '#840000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Daily;
