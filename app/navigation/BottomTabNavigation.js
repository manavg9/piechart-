import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Route from '../screens/Route'
import Saved from '../screens/Saved'

const BottomTabNavigation = () => {
const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Route" component={Route} />
      <Tab.Screen name="Saved" component={Saved} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation

const styles = StyleSheet.create({})




