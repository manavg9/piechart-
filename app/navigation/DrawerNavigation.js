import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Profile from './Profile'
import Data from './Data'

const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator();

  return (
    
      <Drawer.Navigator initialRouteName="Profile">
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Data" component={Data} />

        
      </Drawer.Navigator>

  )

}

export default DrawerNavigation

const styles = StyleSheet.create({})