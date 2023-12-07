import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from '@react-navigation/native';

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
import colours from './screens/colours.js';
import numbers from './screens/Numbers.js';
import days from './screens/Days.js';
import emotions from './screens/Emotions.js';
import daily from './screens/daily.js';
import introgative from './screens/introgative.js';
import commonverbs from './screens/commonverbs.js';
import quizScreen from './screens/quizScreen';
import CongratScreen from './screens/congratScreen';
import {StateProvider} from './screens/stateProvider.js';
import reducer, {initialState} from './screens/reducer';
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
      <Stack.Screen name="START LEARNING" component={StartLearningScreen} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      <Stack.Screen name="ALPHABETS" component={Alphabets} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
       <Stack.Screen name="DAYS" component={days} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      <Stack.Screen name="FAMILY" component={Family} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      <Stack.Screen name="COLORS" component={colours} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      <Stack.Screen name="NUMBERS" component={numbers} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      <Stack.Screen name="EMOTIONS" component={emotions} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      <Stack.Screen name="COMMON VERBS" component={commonverbs} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      <Stack.Screen name="INTROGATIVE WORDS" component={introgative} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      <Stack.Screen name="DAILY USE PHRASES" component={daily} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      <Stack.Screen name="QuestionScreen" component={quizScreen} initialParams={{index: 0}} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      <Stack.Screen name="CongratsScreen" component={CongratScreen} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      <Stack.Screen name="PROFILE" component={Profile} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
      
      <Stack.Screen name="ABOUT" component={AboutScreen} options={{ headerStyle: { 
        backgroundColor: '#c23a22', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center', 
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      }}}/>
    </Stack.Navigator>
    </StateProvider>
  );
};

export default AppNavigator