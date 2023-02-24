import React, { Component } from 'react'
import { Text, StyleSheet, View ,Button } from 'react-native'

export default class HomeScreen extends Component {
    
    // constructor(props) {
    //     super(props)
      
    //     this.state = {
    //        first
    //     }
    //   }
  render() {
    return (
      
        <View style={{ flex: 1, alignItems: 'center',justifyContent:'center' ,backgroundColor:'gainsboro' }}>
        <Text style={{fontWeight:'600',color:'black',position:'absolute',top:40,fontSize:18}}>HomeScreen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
        
      
    )
  }
}

const styles = StyleSheet.create({})

