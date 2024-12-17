import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import FirstTimeUserScreen from './screens/FirstTimeUserScreen';
import AppNavigator from './AppNavigator';


const App = () =>{
  return(
    <NavigationContainer>
      <AppNavigator/>
      
    </NavigationContainer>  )
}

export default App;