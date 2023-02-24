import React, { Component } from 'react'
import { Text, StyleSheet, View ,Button} from 'react-native'

export default class NotificationsScreen extends Component {
  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontWeight:'600',color:'black',position:'absolute',top:40,fontSize:18}}>NotificationsScreen</Text>
        <Button onPress={() => this.props.navigation.navigate('PieChart')} title="Open PieChart" />
      </View>
    )
  }
}

const styles = StyleSheet.create({})