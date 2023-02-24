import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Data = ({navigation}) => {
  return (
    <View>
      <Text>Data</Text>
      <Button title='open bottom tabs' onPress={()=> navigation.navigate('BottomTabNavigation')}/>
    </View>
  )
}

export default Data

const styles = StyleSheet.create({})