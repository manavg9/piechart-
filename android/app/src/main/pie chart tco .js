import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, processColor,SafeAreaView, TouchableOpacity, Image, StyleSheet, Alert, TextInput, ScrollView, ImageBackground, BackHandler, ToastAndroid, KeyboardAvoidingView,Modal } from 'react-native';
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
                  // xValuePosition: "OUTSIDE_SLICE",
                  // yValuePosition: "OUTSIDE_SLICE",
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
                                  flexDirection: "column",
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
                                <View style={{height:'90%', width:'100%',}}>
                                <TouchableOpacity 
                                onPress={() => 
                                  this.setState({
                                  selectedSliceDataVisibility:false,
                                  sliceData:null
                                    })
                                
                                }
                                style={{height:'100%',width:'100%', backgroundColor:'#fff',opacity:0.1,position:'absolute'}}/>
                                <View
                                  style={{borderColor:'green',borderWidth:1,borderRadius:5,
                                    backgroundColor: '#fff',
                                    top:this.state.ycoordinate+100,
                                    left:this.state.xcoordinate-10,
                                    position:'absolute',
                                    minWidth:70,
                                  }}>
                                  
                                  <Text style={{color:'black',fontSize:10}}>{this.state.sliceName}</Text>
                                  <Text style={{color:'black',fontSize:12,fontWeight:'bold'}}>{this.state.sliceValue+' %'}</Text>
                                </View>
                                </View>
                              :null}
                              </Modal>
                              
                                
                                <View
                                  style={{ justifyContent: "center", marginTop: 50, height: "60%" }}
                                >
                                  
                                  {!this.state.noData ? (
                                <PieChart
                                  style={{
                                      height:'100%',
                                      width:'95%'}}
                                  logEnabled={false}
                                  data={this.state.data}
                                  legend={this.state.legend}
                                  chartDescription={this.state.description}
                                  extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}
                                  entryLabelColor={processColor('white')}
                                  entryLabelTextSize={8}
                                  entryLabelFontFamily={'HelveticaNeue-Medium'}
                                  drawEntryLabels={false}
                                  rotationEnabled={true}
                                  rotationAngle={45}
                                  description={{text:'Hello Uncle'}}
                                  usePercentValues={false}
                                  styledCenterText={{text:'', color: processColor('blue'), fontFamily: 'OpenSans',fontWeight:'bold', size:25}}
                                  centerTextRadiusPercent={10}
                                  holeRadius={0}
                                  holeColor={processColor('red')}
                                  transparentCircleRadius={10}
                                  transparentCircleColor={processColor('#f0f0f088')}
                                  maxAngle={360}
                                  onSelect={this.handleSelect.bind(this)}
                                  onChange={(event) => console.log(event.nativeEvent)}
                                />
                                  ) : <TextInput
                                  value={'hello'}
                                  />}
                                </View>
                      
                      
                      
                              </View>
                              </TouchableOpacity>
                            </SafeAreaView>
    )
  }
}

export default PieChartTco
