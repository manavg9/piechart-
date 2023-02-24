import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet, Text, View ,Button} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PieChartTco from './android/app/src/main/pie chart tco ';
import HomeScreen from './app/screens/HomeScreen';
import NotificationsScreen from './app/screens/NotificationsScreen';
import DrawerNavigation from './app/navigation/DrawerNavigation';
import BottomTabNavigation from './app/navigation/BottomTabNavigation';

const App = () => {

const Stack = createStackNavigator();
  

  return (
     <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}>
      
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="PieChart" component={PieChartTco} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />



        
    
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

