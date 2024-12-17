import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import FirstTimeUserScreen from './screens/FirstTimeUserScreen';
import MainScreen from './screens/MainScreen';
import StartLearningScreen from './screens/StartLearningScreen';
import Profile from './screens/Profile';
import AboutScreen from './screens/AboutScreen.js';
import Alphabets from './screens/Alphabets.js';
import Family from './screens/Family.js';
import Colours from './screens/colours.js';
import Numbers from './screens/Numbers.js';
import Days from './screens/Days.js';
import Emotions from './screens/Emotions.js';
import Daily from './screens/daily.js';
import Introgative from './screens/introgative.js';
import Commonverbs from './screens/commonverbs.js';
import Favorites from './screens/Favorites.js';
import QuizScreen from './screens/quizScreen';
import CongratScreen from './screens/congratScreen';
import WrongQuiz from './screens/WrongQuiz';
import SignDetect from './screens/SignDetect.js';
import {StateProvider} from './screens/stateProvider.js';
import reducer, {initialState} from './screens/reducer';
import { useEffect } from 'react';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="User Login" component={LoginScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="Forgot Password" component={ForgetPasswordScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={FirstTimeUserScreen}  options={{ headerShown: false }}/>
      <Stack.Screen headerStyle={{padding:20}} name="Home" component={MainScreen} options={{ headerShown:false}}/>
      <Stack.Screen name="START LEARNING" component={StartLearningScreen} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="ALPHABETS" component={Alphabets} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="DAYS" component={Days} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="FAMILY" component={Family} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="COLORS" component={Colours} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="NUMBERS" component={Numbers} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="EMOTIONS" component={Emotions} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="COMMONVERBS" component={Commonverbs} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="INTERROGATIVEWORDS" component={Introgative} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="DAILYUSEPHRASES" component={Daily} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="FAVORITES" component={Favorites} initialParams={{index: 0}} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="QUIZ SCREEN" component={QuizScreen} initialParams={{index: 0}} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen 
  name="MISTAKES TRACKER" 
  component={WrongQuiz} 
  initialParams={{ index: 0 }} 
  options={({ navigation }) => ({
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    },
    // Customize the back button behavior
    headerLeft: () => (
      <TouchableOpacity 
        onPress={() => navigation.navigate('Home')} // Navigate back to Home
        style={{ marginLeft: 10 }}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    ),
  })}
/>
      <Stack.Screen name="SIGN DETECTION" component={SignDetect} initialParams={{index: 0}} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      <Stack.Screen name="CongratsScreen" component={CongratScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="PROFILE" component={Profile} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
      
      <Stack.Screen name="ABOUT US" component={AboutScreen} options={{ 
    
    headerBackTitleVisible: false, // Removes back text
    headerStyle: { 
      backgroundColor: '#c23a22', 
    },
    headerTintColor: 'white', 
    headerTitleAlign: 'center', 
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
    }
  }}/>
    </Stack.Navigator>
    </StateProvider>
  );
};

export default AppNavigator