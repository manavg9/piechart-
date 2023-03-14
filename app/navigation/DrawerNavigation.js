import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Profile from '../screens/Profile'
import Data from '../screens/Data'
import MapViewScreen from '../screens/MapViewScreen'


const DrawerNavigation = () => {
const Drawer = createDrawerNavigator();

  return (
    
      <Drawer.Navigator initialRouteName="Profile">
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="MapViewScreen" component={MapViewScreen} />
        <Drawer.Screen name="Data" component={Data} /> 
      </Drawer.Navigator>

  )

}

export default DrawerNavigation

const styles = StyleSheet.create({})