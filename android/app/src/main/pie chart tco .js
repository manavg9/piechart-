import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, processColor,SafeAreaView, TouchableOpacity, Image, StyleSheet, Alert, TextInput, ScrollView, ImageBackground, BackHandler, ToastAndroid, KeyboardAvoidingView,Modal, Button } from 'react-native';
import { ProgressDialogs } from '../../utils/ProgressDialogs';
import { PieChart } from "react-native-charts-wrapper";



class PieChartTco extends Component {
    constructor(props) {
        super(props);
        this.state = {

          sliceName:'',
          sliceValue:'',
          selectedSliceDataVisibility:false,
          xcoordinate:0,
          ycoordinate:0,
          
        legend: {
          enabled: false,
          textSize: 8,
          form: "CIRCLE",
          horizontalAlignment: "RIGHT",
          verticalAlignment: "CENTER",
          orientation: "VERTICAL",
          wordWrapEnabled: true,
            
          },
        
          data: {
            dataSets: [
              {
                values:[],

                label: "",
                config: {
                  
                  colors:[processColor('seagreen'), processColor('lightgrey'), processColor('skyblue'), processColor('darkorange'),],
                  valueTextSize: 12,
                  valueTextColor: processColor("transparent"),
                  sliceSpace: 3,
                  selectionShift: 13,
                  
                  xValuePosition: "OUTSIDE_SLICE",
                  yValuePosition: "OUTSIDE_SLICE",
                  valueFormatter: "#.#'%'",
                  valueLineColor: processColor("green"),
                  valueLinePart1Length: 0.5,
                  
                  
                },
            }
            ]  

        },
        totalValue: 362,
      highlights: [{ x: 2 ,y:2}],
      description: {
        text: "",
        textSize: 15,
        textColor: processColor("darkgray"),
      },
      
    };
      

    }

    handleSelect(event) {
      console.log(" Slice ------------------) ",event.nativeEvent);
      console.log('x coord =',event.nativeEvent);
      if (event.nativeEvent.data != null&&event.nativeEvent.data !=undefined) {
         console.log("Click on Slice ------------------) ",event.nativeEvent);
         this.setState({ selectedSliceDataVisibility:true, sliceName: event.nativeEvent.data.label,sliceValue:  event.nativeEvent.data.value});
      
      } else {
         console.log("Click on blank data ------------------) ",event.nativeEvent);
          this.setState({ selectedSliceDataVisibility:false, sliceName:'',sliceValue:'' });
      }
      
    }

    handlePress(evt){
      console.log(`x coord = ${evt.nativeEvent.locationX}`,);
      console.log(`y coord = ${evt.nativeEvent.locationY}`)
      let x=Math.ceil(evt.nativeEvent.locationX);
      let y=Math.ceil(evt.nativeEvent.locationY)
      this.setState({
        
             xcoordinate : x,
             ycoordinate :y,

      })
      console.log('show x coordinate',this.state.xcoordinate,this.state.ycoordinate);
    }
       


      setColor(sliceName) {
        switch (sliceName) {
 
         case "Battery Replacement":
           return 'seagreen';
 
         case "Maintenance":
           return 'black';
 
         case "Insurance":
           return 'skyblue';
 
         case "Electricity":
           return 'darkorange';
 
         case "Fuel":
           return 'darkorange';
   
         default  : 
          return 'darkblue'
       }
     }

               componentDidMount() {
               
                // const newArray = this.props.PieChartData.map((item) => ({
                //   value: item.y,
                //   label: item.name,
                // }));
                this.setState({
                  data: {
                    dataSets: [
                      {
                        values: [{  label: 'Battery Replacement',value:500000, },
                         {  label: 'Maintenance',value: 1814119.12, },
                         {  label: 'Insurance',value: 769000.02, },
                         {  label: 'Electricity' , value: 1309090.91,}],
                        label: "",
                        config: {
                          
                          colors:[processColor('seagreen'), processColor('lightgrey'), processColor('skyblue'), processColor('darkorange'),],
                          valueTextSize: 15,
                          valueTextColor: processColor("black"),
                          sliceSpace: 5,
                          selectionShift: 10,
                          xValuePosition: "OUTSIDE_SLICE",
                          yValuePosition: "OUTSIDE_SLICE",
                          valueFormatter: "#.#",
                          valueLineColor: processColor("green"),
                          valueLinePart1Length: 0.75,
                        },
                      },
                    ],
                  },
                })
                }
                        render() {
                          console.log('piechartdat',this.props.PieChartData,this.state.data.dataSets.values);
                            return (
                              <SafeAreaView>

                                <TouchableOpacity onPress={(evt) => this.handlePress(evt) }>
                              <View
                                style={{
                                  // flexDirection: "column",
                                  marginTop: 15,
                                  height: "95%",
                                  width: "100%",
                                }}
                              >
                      
                              
                              <Modal
                                animationType={'fade'}
                                transparent={true}
                                visible={this.state.selectedSliceDataVisibility}
                                onRequestClose={() => {
                                  console.log('Modal has been closed.');
                                }}>
                                {this.state.selectedSliceDataVisibility?
                                <View 
                                style={{height:'90%', width:'100%',marginTop:50}}>
                                <TouchableOpacity 
                                onPress={() => 
                                  this.setState({
                                  selectedSliceDataVisibility:false,
                                  sliceData:null
                                    })
                                
                                }
                                style={{height:'100%',width:'100%', backgroundColor:'#fff',opacity:0.5}}/>
                                <View
                                  style={{borderColor:'green',borderWidth:1,borderRadius:5,
                                    backgroundColor: '#fff',
                                    top:this.state.ycoordinate,
                                    left:this.state.xcoordinate,
                                    position:'absolute',
                                    paddingHorizontal:10,
                                        paddingVertical:5
                                    // minWidth:70,
                                  }}>
                                  
                                  <Text style={{color:'black',fontSize:10}}>{this.state.sliceName}</Text>
                                  <Text style={{color:'black',fontSize:12,fontWeight:'bold'}}>{this.state.sliceValue}</Text>
                                </View>
                                </View>
                              :null}
                              </Modal>
                              
                                
                                <View
                                  style={{ justifyContent: "center", marginTop: 50, height: "60%" }}
                                >
                                  
                                
                                <PieChart
                                  style={{
                                      height:'100%',
                                      width:'95%'}}
                                  logEnabled={false}
                                  animation={
                                    { durationX : 500,
                                     durationY : 500,
                                     easingX: 'Linear',
                                     easingY: 'Linear',
                                   }
                                     }
                                  data={this.state.data}
                                  legend={this.state.legend}
                                  chartDescription={this.state.description}
                                  extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}
                                  entryLabelColor={processColor('white')}
                                  entryLabelTextSize={8}
                                  entryLabelFontFamily={'HelveticaNeue-Medium'}
                                  drawEntryLabels={false}
                                  rotationEnabled={true}
                                  // rotationAngle={45}
                                  description={{text:'Hello Uncle'}}
                                  usePercentValues={false}
                                  // styledCenterText={{text:'', color: processColor('blue'), fontFamily: 'OpenSans',fontWeight:'bold', size:25}}
                                  // centerTextRadiusPercent={10}
                                  holeRadius={10}
                                  // holeColor={processColor('red')}
                                  transparentCircleRadius={10}
                                  transparentCircleColor={processColor('darkorange')}
                                  maxAngle={362}
                                  onSelect={this.handleSelect.bind(this)}
                                  onChange={(event) => console.log(event.nativeEvent)}
                                />

                                <Button title='Move to Drawer' onPress={()=>this.props.navigation.navigate('DrawerNavigation')} />
                                  
                                </View>
                      
                      
                      
                              </View>
                              </TouchableOpacity>
                            </SafeAreaView>
    )
  }
}

export default PieChartTco
