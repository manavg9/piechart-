import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import {CONSTANT} from '../utils/Constant';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { Marker,Polyline,AnimatedRegion,Animated } from "react-native-maps";



    const MapViewScreen = () => {

    const[lat,setLat]=useState(0)
    const[long,setLong]=useState(0)

    const findLocation = () => 

        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        })
            .then(data => {
            // console.log('data', data);
                if (data == 'enabled' || data == 'already-enabled') {
                  getlatLong();
                }
            })
            .catch(err => {
                console.log('error1', err);
                findLocation();
               
         });

         const convertLatLongToAddress = (lat, long) => {
            
              fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + 'AIzaSyAdoRNXLiibDLh7OvNM6x65yjo5Q26ogEo')
                  .then((response) => response.json())
                  .then((responseJson) => {

                        console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
  
                      CONSTANT.APP_LOCATION_TEXT=(responseJson.results[0].formatted_address.length > 32 ? responseJson.results[0].formatted_address.substring(0, 32) + '...' : responseJson.results[0].formatted_address)
                      //CONSTANT.CHARGING_STATION_SEARCH_TEXT= responseJson.results[0].formatted_address,
  
                   
                  })
         } 
               

         const  getlatLong = () => {
          
            Geolocation.getCurrentPosition(
            info => {
                var latitude = parseFloat(info.coords.latitude);
                var longitude = parseFloat(info.coords.longitude);
                console.log('latitude,longitude',latitude,longitude);
                // CONSTANT.APP_LAT=latitude,
                // CONSTANT.APP_LONG=longitude,

                setLat(latitude)
                setLong(longitude)
                  
                
                convertLatLongToAddress(lat,long)

            },
            error => {
                console.log('error', error);
                if (error.code == 1) {
                    Alert.alert('Location Permission', 
                    'Location Access is required to display nearby charging stations available in your area',
                    
                    [
                      {
                        text: 'open settings',
                        onPress: () => {
                          this.setState({ isLocationAlert: false });
          
                          if (Platform.OS === 'ios') {
                            Linking.openURL('app-settings:');
                          } else {
                            Linking.openSettings();
                          }
                        },
                        style: 'default',
                      },
                
                    ]);
                    console.log('Location fetch error', error);
                    this.setState({ latitude: 0, longitude: 0, isLocationAlert: true });
                  }
                else if (error.message == 'Location request timed out') {
                    getlatLong();
                }
              }
              )
};
              

  useEffect(() =>{findLocation()},[])

  const currentLocationRegion = {
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const destinationRegion = {
    latitude: 28.6139,
    longitude: 77.2090,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
    {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsMyLocationButton={true}
        loadingEnabled={true}
        loadingIndicatorColor={'darkblue'}
        loadingBackgroundColor={'cyan'}
        moveOnMarkerPress={true}
        showIndoorLevelPicker={true}
        showsTraffic={true}
        showsUserLocation={true}
        mapType={'standard'} >
          <Polyline
        coordinates={[currentLocationRegion, destinationRegion]} 
        strokeColor={"#000"}
        strokeColors={[
          '#7F0000',
          '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
          '#B24112',
          '#E5845C',
          '#238C23',
          '#7F0000'
        ]}
        strokeWidth={3}
        lineDashPattern={[1]}
        lineCap={'butt'}
      />
        <Marker
        coordinate={{
          latitude:  lat,
          longitude: long,
        }}
        pinColor={'coral'}
        
      />
    </MapView>
      
    </View>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default MapViewScreen

