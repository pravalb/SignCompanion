import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('favorites');
        if (savedFavorites !== null) {
          const parsedFavorites = JSON.parse(savedFavorites);
          // Sort by most recent addition (assuming items are added to the end)
          const sortedFavorites = parsedFavorites.reverse(); 
          setFavorites(sortedFavorites);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Display video title */}
      <Text style={styles.itemText}>{item.name}</Text>
      
      {/* Video player */}
      <Video
        source={{ uri: item.uri }} // Pass video URI
        style={styles.videoPlayer} // Apply styles for video player
        controls={true} // Enable controls (play, pause, seek, etc.)
        resizeMode="cover" // Ensure the video fits within the container
        repeat={true}
      />
    </View>
  );

  return (
    
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.uri}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 10,
  },
  videoPlayer: {
    width: '100%',
    height: 200, // Adjust based on your design
    backgroundColor: '#000',
  },
});

export default Favorites;
