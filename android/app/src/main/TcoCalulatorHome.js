
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, processColor, SafeAreaView, TouchableOpacity, Image, StyleSheet, Alert, TextInput, ScrollView, ImageBackground, BackHandler, ToastAndroid, KeyboardAvoidingView, Modal } from 'react-native';
import { ProgressDialogs } from '../../utils/ProgressDialogs';
import { IMAGES } from '../../Images/image';
import { COLORS } from '../../utils/AppColors';
import { CONSTANT } from '../../utils/Constant';
import DropDownModal from './DropDownModal';
import SelectDropdown from 'react-native-select-dropdown';
import PieChartTco from './PieChartTco';
import { loadStateWiseTariffData } from '../../actions/StateWiseTariffAction';
import { loadEvVehicleModelData } from '../../actions/EvVehicleModelAction';
import { loadIceVehicleModelData } from '../../actions/IceVehicleModelAction';
import { loadEvVehicleData } from '../../actions/EvVehicleDataAction';
import { loadIceVehicleData } from '../../actions/IceVehicleDataAction';
import { loadCalculateTcoData } from '../../actions/CalculateTcoDataAction';



class TcoCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCard1: false,
            showCard2: false,
            showCard3: false,
            showCard4: true,
            isDropDownModalVisible: false,
            isVehicleSegmentModalVisible: false,
            segment: 'Select',
            distanceTravelled: '',
            ownershipMt: 'Select',
            isLoading: true,
            dropDownArrayData: [],
            evVehicleModelData: '',
            iceVehicleModelData: '',
            iceVehicleDataArray:[],
            evVehicleDataArray:[],
            iceModels: '',
            evModels: '',
            tariff:'',
            selectedState:'',
            fuelCost:'',
            stateSubsidy:0,
            iceVehicleCost:'',
            mileageIce:'',
            upFrontSubsidy:0,
            evVehicleCost:0,
            actualEvCost:0,
            evRange:0,
            costPerKm:0,
            iceCostTenY:0,
            evCostTenY:0,
            // iceBreakDown: [{  label: 'Battery Replacement',value:0, },
            // {  label: 'Maintenance',value: 1814119.12, },
            // {  label: 'Insurance',value: 7690.02, },
            // {  label: 'Electricity' , value: 1309090.91,}],
            // evBreakDown:[{ label: 'Battery Replacement',value:0, },
            // {  label: 'Maintenance',value: 1814119.12, },
            // {  label: 'Insurance',value: 7690.02, },
            // {  label: 'Electricity' , value: 1309090.91, }],
            iceBreakDown: [],
            evBreakDown:[],
            pieChart1:false,
            pieChart2:false,

        }
    }

    componentDidMount() {
           this.props.StateWiseTariffApi();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }


    handleBackButton = () => {
        if (this.state.backPressed > 0) {
            BackHandler.exitApp();

            this.setState({
                backPressed: 0,
            });
        } else {
            this.setState({
                backPressed: this.state.backPressed + 1,
            });
            ToastAndroid.show('Press Again To Exit', ToastAndroid.SHORT);
            setTimeout(() => { }, 2000);
            return true;
        }
    };

    componentDidUpdate(prevProps) {

        if (this.props.StateWiseTariffData != prevProps.StateWiseTariffData) {
            if (this.props.StateWiseTariffData.type == 'TRUE') {
                console.log('state wise tariff data');
                console.log("data......", this.props.StateWiseTariffData)
                this.setState({
                    isLoading: false,
                    Tariff: this.props.StateWiseTariffData,
                });
            } else {
                console.log('DATA not LOAD');
                this.setState({
                    isLoading: false,
                });
            }
        }

        if (this.props.EvVehicleModelData != prevProps.EvVehicleModelData) {
            if (this.props.EvVehicleModelData.type == 'TRUE') {
                console.log('ev vehicle models data');
                console.log("data......", this.props.EvVehicleModelData)
                this.setState({
                    isLoading: false,
                    evVehicleModelData: this.props.EvVehicleModelData,
                });
            } else {
                console.log('DATA not LOAD');
                this.setState({
                    isLoading: false,
                });
            }
        }

        if (this.props.IceVehicleModelData != prevProps.IceVehicleModelData) {
            if (this.props.IceVehicleModelData.type == 'TRUE') {
                console.log('ice vehicle model data');
                console.log("data......", this.props.IceVehicleModelData)
                this.setState({
                    isLoading: false,
                    iceVehicleModelData: this.props.IceVehicleModelData,
                });
            } else {
                console.log('DATA not LOAD');
                this.setState({
                    isLoading: false,
                });
            }
        }

        if (this.props.IceVehicleData != prevProps.IceVehicleData) {
            if (this.props.IceVehicleData.type == 'TRUE') {
                console.log('ice vehicle model data');
                console.log("data......", this.props.IceVehicleData)
                this.setState({
                    isLoading: false,
                    iceVehicleDataArray: this.props.IceVehicleData.value,
                    iceVehicleCost:this.props.IceVehicleData.value.vehicle_cost,
                    mileageIce:this.props.IceVehicleData.value.mileage,
                });
            } else {
                console.log(' ice vehicle data DATA not LOAD');
                this.setState({
                    isLoading: false,
                });
            }
        }

        if (this.props.EvVehicleData != prevProps.EvVehicleData) {
            if (this.props.EvVehicleData.type == 'TRUE') {
                console.log('ev vehicle data');
                console.log("data......", this.props.EvVehicleData)
                this.setState({
                    isLoading: false,
                    evVehicleDataArray: this.props.EvVehicleData.value,
                    upFrontSubsidy:this.props.EvVehicleData.value.subsidy,
                    evRange:this.props.EvVehicleData.value.range,
                    evVehicleCost:this.props.EvVehicleData.value.vehicle_cost,
                    actualEvCost:this.props.EvVehicleData.value.vehicle_cost-this.props.EvVehicleData.value.subsidy,

                });
            } else {
                console.log('Ev vehicle data not LOAD');
                this.setState({
                    isLoading: false,
                });
            }
        }

        if (this.props.TcoCalculatorData!= prevProps.TcoCalculatorData) {
            if (this.props.TcoCalculatorData.type == 'TRUE') {
                console.log('tco calulator data in componetn did update');
                console.log("data......", this.props.TcoCalculatorData)
                this.setState({
                    isLoading: false,
                    iceBreakDown:this.props.TcoCalculatorData.value.cost_breakdown_ice,
                    costPerKm:this.props.TcoCalculatorData.value.cost_per_km,
                    iceCostTenY:this.props.TcoCalculatorData.value.tenYearsCostICE,
                    evCostTenY:this.props.TcoCalculatorData.value.tenYearsCostEV,
                    evBreakDown:this.props.TcoCalculatorData.value.cost_breakdown_ev,
                    pieChart1:true,
                    pieChart2:true,
                });
            } else {
                console.log('DATA not LOAD');
                this.setState({
                    isLoading: false,
                });
            }
        }



    }

      clickCalculate = (ownershipMt, segment, distanceTravelled,iceModels,fuelCost,evModels,stateSubsidy,selectedState) => {
        console.log('Parameterssssssssssssssss=================', ownershipMt);


        if (ownershipMt == 'Select') {
            Alert.alert('Alert', CONSTANT.selectedLanguage == 'English' ? 'Please select Ownership Type' : 'कृपया स्वामित्व प्रकार चुनें');
            return
        }

        if (segment == 'Select') {
            Alert.alert('Alert', CONSTANT.selectedLanguage == 'English' ? 'Please select Vehicle Segment' : 'कृपया वाहन खंड का चयन करें');
            return
        }

        if (distanceTravelled == '') {
            Alert.alert('Alert', CONSTANT.selectedLanguage == 'English' ? 'Please enter the distance travelled' : 'कृपया वाहन खंड का चयन करें');
            return
        }

        if (iceModels == '') {

            Alert.alert ('Alert', CONSTANT.selectedLanguage == 'English' ? 'Please Select Ice Vehicle Model' : 'कृपया ईंधन लागत दर्ज करें')
            return
           }

        if (fuelCost == '') {
            Alert.alert ('Alert', CONSTANT.selectedLanguage == 'English' ? 'Please enter the fuel Cost' : 'कृपया ईंधन लागत दर्ज करें')
            return
        }

        if (evModels=='') {

         Alert.alert ('Alert', CONSTANT.selectedLanguage == 'English' ? 'Please Select Ev Vehicle Model' : 'कृपया ईंधन लागत दर्ज करें')
             return
        }

        if (stateSubsidy==0) {

            Alert.alert ('Alert', CONSTANT.selectedLanguage == 'English' ? 'Please enter the State level Subsidy' : 'कृपया ईंधन लागत दर्ज करें')
            return
        }
        
         if (selectedState=='') {

            Alert.alert ('Alert', CONSTANT.selectedLanguage == 'English' ? 'Please select the state' : 'कृपया ईंधन लागत दर्ज करें')
            return
        }

        

    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({ ...this.state, selectedEntry: null })
        } else {
            this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
        }

        console.log(event.nativeEvent)
    }

    onCloseDropDownModal = (visibility) => {
        this.setState({
            isDropDownModalVisible: visibility,
            isVehicleSegmentModalVisible: visibility,

        })
    }

    selectdropDownData = (ownershipType, vehicleSegment) => {
        this.setState({
            ownershipMt: ownershipType,
            vehicleSegmentMt: vehicleSegment

        })
    }


    validText = (text) => {
        if (text != '' && text != null && text != undefined) { return }
    }



    render() {

        // console.log('data',this.props.CountryData);
        console.log('tco data console',
        this.state.stateSubsidy, this.state.selectedState, this.state.tariff,this.state.ownershipMt,this.state.iceVehicleCost, this.state.mileageIce,this.state.evVehicleCost,
            this.state.evRange,this.state.evVehicleCost,this.state.upFrontSubsidy,this.state.iceModels,this.state.iceVehicleModelData,this.state.evModels,this.state.segment,this.state.distanceTravelled,this.state.fuelCost,this.state.costPerKm,this.state.iceBreakDown);
        const { modalVisible } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'lightgrey' }}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} >


                    {/* Top Toolbar design */}
                    <View
                        style={{
                            width: '99.5%',
                            backgroundColor: COLORS.appColor1,
                            elevation: 5,
                            marginHorizontal: 1,
                            borderBottomEndRadius: 25,
                            borderBottomStartRadius: 25,
                        }}>

                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                height: 40,
                                marginVertical: 10,
                            }}>
                            <View style={{ justifyContent: 'center', width: '15%' }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.goBack();
                                    }}
                                    style={{
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        width: 50,
                                        marginStart: 10,
                                        height: 50,
                                    }}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('../../Images/down_arrow.png')}
                                        style={{
                                            height: 20,
                                            alignSelf: 'center',
                                            width: 20,
                                            tintColor: 'white',
                                            transform: [{ rotate: '90deg' }],
                                        }}

                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    width: '85%',
                                    paddingRight: 50,
                                }}>
                                <Text
                                    style={{
                                        alignSelf: 'center',
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                    }}>
                                    {CONSTANT.selectedLanguage == 'English'
                                        ? "TCO Calculator"
                                        : 'टी सी ओ कैलकुलेटर'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView>

                        <View style={{ padding: 15 }}>

                            {/* CARD VIEW 1 TCO Calculator */}
                            <View style={{ backgroundColor: 'white', borderRadius: 10, elevation: 2 }}>

                                <TouchableOpacity
                                    onPress={() =>
                                        this.setState({
                                            showCard1: !this.state.showCard1,
                                            // showCard2: false,
                                            // showCard3: false
                                        })
                                    }>
                                    <View style={{ height: 45, backgroundColor: 'cyan', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ alignSelf: 'center', fontWeight: '500', color: 'black', }}>
                                            {CONSTANT.selectedLanguage == 'English' ? "TCO Calculator" : 'टी सी ओ कैलकुलेटर'}</Text>
                                        <Image
                                            style={{ height: 15, width: 15, position: 'absolute', right: 10, alignSelf: 'center' }}
                                            source={IMAGES.downArrow}
                                        />
                                    </View>

                                </TouchableOpacity>


                                {this.state.showCard1 ?
                                    (<>

                                        {/* ownership type field */}

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Select Ownership Type" : 'स्वामित्व प्रकार का चयन करें'}</Text>

                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', flexDirection: 'row', }}>


                                            <SelectDropdown
                                                data={[
                                                    { value: 'Select', id: '1' },
                                                    { value: 'Private (Self-Owned)', id: '2' },
                                                    { value: 'Commercial (Public-Use)', id: '3' },
                                                ]}
                                                onSelect={(selectedItem, index) => {
                                                    console.log('select', selectedItem);
                                                    this.setState({
                                                        ownershipMt: selectedItem.value,
                                        
                                                    });

                                                }}
                                                defaultButtonText={CONSTANT.selectedLanguage == 'English' ? "Select" : "चुनना"}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem.value;
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    return item.value;
                                                }}
                                                buttonStyle={{
                                                    width: '100%',
                                                    height: 50,

                                                    alignSelf: 'center',
                                                    backgroundColor: '#fffff',
                                                    borderRadius: 10,
                                                    borderColor: '#444',
                                                }}
                                                buttonTextStyle={{
                                                    color: 'gray',
                                                    textAlign: 'left',
                                                    fontSize: 19,
                                                    // backgroundColor:'yellow'

                                                }}
                                                renderDropdownIcon={() => {
                                                    return (
                                                        <Image
                                                            resizeMode="contain"
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                marginRight: 3,
                                                                // tintColor: 'black',
                                                            }}
                                                            source={require('../../Images/down_arrow.png')}
                                                        />
                                                    );
                                                }}

                                                dropdownIconPosition={'right'}
                                                dropdownStyle={{
                                                    backgroundColor: '#EFEFEF',
                                                    elevation: 5,
                                                    alignSelf: 'center',
                                                }}
                                                rowStyle={{
                                                    color: '#000000',
                                                    backgroundColor: '#EFEFEF',
                                                    borderBottomColor: '#C5C5C5',
                                                }}
                                                rowTextStyle={{ color: '#000000', textAlign: 'left', marginStart: 17 }}

                                            />

                                        </View>


                                        {/* <TouchableOpacity style={{ justifyContent: 'center' }} 
                                        onPress={() => { this.setState({
                                        isDropDownModalVisible: !this.state.isDropDownModalVisible,
                                            dropDownArrayData: [
                                                    { value: 'Select', id: '1' },
                                                    { value: 'Private (Self-Owned)', id: '2' },
                                                    { value: ' Commercial (Public-Use)', id: '3' },
                                                    
                                                ]
                                        })
                                        }}>
                                            <DropDownModal
                                            isDropDownModalVisible={this.state.isDropDownModalVisible}
                                            onCloseDropDownModal={this.onCloseDropDownModal}
                                            selectdropDownData={this.selectdropDownData}
                                            // modalData={  [
                                            //     { value: 'Select', id: '1' },
                                            //     { value: 'Private (Self-Owned)', id: '2' },
                                            //     { value: ' Commercial (Public-Use)', id: '3' },
                                                
                                            // ]}
                                            modalData={this.state.dropDownArrayData}
                                            
                                            />

                                            <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', flexDirection: 'row' }}>

                                                <Text style={{ alignSelf: 'center', marginStart: 15 }}>{this.state.ownershipMt}</Text>
                                                <Image style={{ height: 15, width: 15, position: 'absolute', right: 10, alignSelf: 'center' }} source={IMAGES.downArrow} />

                                            </View>

                                        </TouchableOpacity> */}

                                        {/* vehilce segment field */}

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Select Vehicle Segment " : 'वाहन खंड का चयन करें'}</Text>


                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', flexDirection: 'row', }}>


                                            <SelectDropdown
                                                data={[
                                                    { segment: 'Select', id: 1 },
                                                    { segment: '2W', id: 2 },
                                                    { segment: '3W', id: 3 },
                                                    { segment: '4W', id: 4 },
                                                ]}
                                                onSelect={(selectedItem, index) => {
                                                    console.log('select', selectedItem);
                                                    this.setState({
                                                        segment: selectedItem.segment,
                                                    })

                                                    this.props.EvVehicleModelDataApi("EV" + selectedItem.segment)
                                                    this.props.IceVehicleModelDataApi("ICE" + selectedItem.segment)
                                                    // this.closeStateModal(selectedItem)
                                                }}
                                                defaultButtonText={CONSTANT.selectedLanguage == 'English' ? "Select" : "चुनना"}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem.segment;
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    return item.segment;
                                                }}
                                                buttonStyle={{
                                                    width: '100%',
                                                    height: 50,

                                                    alignSelf: 'center',
                                                    backgroundColor: '#fffff',
                                                    borderRadius: 10,
                                                    borderColor: '#444',
                                                }}
                                                buttonTextStyle={{
                                                    color: 'gray',
                                                    textAlign: 'left',
                                                    fontSize: 19,
                                                    // backgroundColor:'yellow'

                                                }}
                                                renderDropdownIcon={() => {
                                                    return (
                                                        <Image
                                                            resizeMode="contain"
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                marginRight: 3,
                                                                // tintColor: 'black',
                                                            }}
                                                            source={require('../../Images/down_arrow.png')}
                                                        />
                                                    );
                                                }}

                                                dropdownIconPosition={'right'}
                                                dropdownStyle={{
                                                    backgroundColor: '#EFEFEF',
                                                    elevation: 5,
                                                    alignSelf: 'center',
                                                }}
                                                rowStyle={{
                                                    color: '#000000',
                                                    backgroundColor: '#EFEFEF',
                                                    borderBottomColor: '#C5C5C5',
                                                }}
                                                rowTextStyle={{ color: '#000000', textAlign: 'left', marginStart: 17 }}

                                            />

                                        </View>


                                        {/* per day distance travelled input field */}

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Per day distance travelled" : 'प्रति दिन की दूरी तय की'}</Text>

                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                            <TextInput
                                                style={{ marginStart: 10, width: '70%' }}
                                                keyboardType='numeric'
                                                onChangeText={distanceTravelled => {
                                                    this.setState({ distanceTravelled }, () =>
                                                        console.log(
                                                            'distance travelled..update-=========',
                                                            this.state.distanceTravelled,
                                                        ),
                                                    );
                                                }}
                                            />
                                            <View style={{ backgroundColor: 'grey', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '20%', justifyContent: 'center' }}><Text style={{ textAlign: 'center', color: 'white' }}>km</Text></View>
                                        </View>
                                    </>)
                                    : null}



                            </View>

                            {/* CARD VIEW 2 ICE VEHICLE */}
                            <View style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 15 }}>

                                <TouchableOpacity onPress={() => this.setState({
                                    showCard2: !this.state.showCard2,
                                    // showCard1: false,
                                    // showCard3: false
                                })}>
                                    <View style={{ height: 45, backgroundColor: 'pink', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ alignSelf: 'center', fontWeight: '500', color: 'black', }}>
                                            {CONSTANT.selectedLanguage == 'English' ? "ICE Vehicle" : 'आईसीई वाहन'}</Text>
                                        <Image
                                            style={{ height: 15, width: 15, position: 'absolute', right: 10, alignSelf: 'center' }}
                                            source={IMAGES.downArrow}
                                        />
                                    </View>
                                </TouchableOpacity>


                                {this.state.showCard2 ?
                                    (<>
                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Select ICE Vehicle model" : 'आईसीई वाहन मॉडल का चयन करें'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', justifyContent: 'center' }}>
                                            <SelectDropdown
                                                data={this.props.IceVehicleModelData.value}
                                                onSelect={(selectedItem, index) => {
                                                    console.log('select', selectedItem);
                                                    this.setState({
                                                        iceModels: selectedItem.vehicle_model,

                                                    },console.log('gggehjejej',selectedItem.mileage,this.state.mileageIce));
                                                    this.props.IceVehicleDataApi('ICE' + this.state.segment, selectedItem.vehicle_model)
                                                    // this.setState({
                                                    //     iceVehicleCost:selectedItem.vehicle_cost,
                                                    //     mileageIce:selectedItem.mileage,
                                                    // })

                                                    // console.log("..................",this.props.IceVehicleData);

                                                }}
                                                defaultButtonText={CONSTANT.selectedLanguage == 'English' ? "Select" : "चुनना"}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem.vehicle_model;
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    return item.vehicle_model;
                                                }}
                                                buttonStyle={{
                                                    width: '100%',
                                                    height: 50,

                                                    alignSelf: 'center',
                                                    backgroundColor: '#fffff',
                                                    borderRadius: 10,
                                                    borderColor: '#444',
                                                }}
                                                buttonTextStyle={{
                                                    color: 'gray',
                                                    textAlign: 'left',
                                                    fontSize: 19,
                                                    // backgroundColor:'yellow'

                                                }}
                                                renderDropdownIcon={() => {
                                                    return (
                                                        <Image
                                                            resizeMode="contain"
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                marginRight: 3,
                                                                // tintColor: 'black',
                                                            }}
                                                            source={require('../../Images/down_arrow.png')}
                                                        />
                                                    );
                                                }}

                                                dropdownIconPosition={'right'}
                                                dropdownStyle={{
                                                    backgroundColor: '#EFEFEF',
                                                    elevation: 5,
                                                    alignSelf: 'center',
                                                }}
                                                rowStyle={{
                                                    color: '#000000',
                                                    backgroundColor: '#EFEFEF',
                                                    borderBottomColor: '#C5C5C5',
                                                }}
                                                rowTextStyle={{ color: '#000000', textAlign: 'left', marginStart: 17 }}

                                            />

                                        </View>

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Cost of ICE Vehicle selected " : 'चयनित आईसीई वाहन की लागत'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={{ marginStart: 17 }}>{this.state.iceVehicleCost}</Text>
                                            <View style={{ backgroundColor: 'darkorange', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '20%', justifyContent: 'center', alignSelf: 'flex-end' }}><Text style={{ textAlign: 'center', color: 'white' }}>INR</Text></View>
                                        </View>

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Mileage of ICE vehicle selected" : 'चयनित ICE वाहन का माइलेज'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>

                                            <Text style={{ marginStart: 17 }}>{this.state.mileageIce}</Text>

                                            <View style={{ backgroundColor: 'darkorange', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '20%', justifyContent: 'center', alignSelf: 'flex-end' }}><Text style={{ textAlign: 'center', color: 'white' }}>INR</Text></View>
                                        </View>

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Fuel cost for ICE Vehicle" : 'आईसीई वाहन के लिए ईंधन लागत'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                            <TextInput
                                                style={{ marginStart: 12, width: '70%' }}
                                                keyboardType='numeric'
                                                onChangeText={fuelCost => this.setState({fuelCost})}
                                            />
                                            <View style={{ backgroundColor: 'darkorange', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '20%', justifyContent: 'center', alignSelf: 'flex-end' }}><Text style={{ textAlign: 'center', color: 'white' }}>INR</Text></View>
                                        </View>
                                    </>)
                                    : null}

                            </View>

                            {/* CARD VIEW 3 EV VEHICLE */}
                            <View style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 15 }}>

                                <TouchableOpacity onPress={() => this.setState({
                                    showCard3: !this.state.showCard3,
                                    // showCard2: false,
                                    // showCard1: false
                                })}>
                                    <View style={{ height: 45, backgroundColor: 'aquamarine', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ alignSelf: 'center', fontWeight: '500', color: 'black', }}>
                                            {CONSTANT.selectedLanguage == 'English' ? "EV Vehicle" : 'ईवी वाहन'}</Text>
                                        <Image
                                            style={{ height: 15, width: 15, position: 'absolute', right: 10, alignSelf: 'center' }}
                                            source={IMAGES.downArrow}
                                        />
                                    </View>
                                </TouchableOpacity>

                                {this.state.showCard3 ?
                                    (<>
                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Select EV Vehicle model" : 'ईवी वाहन मॉडल का चयन करें'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', justifyContent: 'center' }}>

                                            <SelectDropdown
                                                data={this.props.EvVehicleModelData.value}
                                                onSelect={(selectedItem, index) => {
                                                    console.log('select', selectedItem);
                                                    this.setState({
                                                        evModels: selectedItem.vehicle_model,
                                                    });
                                                    this.props.EvVehicleDataApi('EV' + this.state.segment, selectedItem.vehicle_model, this.state.ownershipMt)

                                                }}
                                                defaultButtonText={CONSTANT.selectedLanguage == 'English' ? "Select" : "चुनना"}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem.vehicle_model;
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    return item.vehicle_model;
                                                }}
                                                buttonStyle={{
                                                    width: '100%',
                                                    height: 50,

                                                    alignSelf: 'center',
                                                    backgroundColor: '#fffff',
                                                    borderRadius: 10,
                                                    borderColor: '#444',
                                                }}
                                                buttonTextStyle={{
                                                    color: 'gray',
                                                    textAlign: 'left',
                                                    fontSize: 19,
                                                    // backgroundColor:'yellow'

                                                }}
                                                renderDropdownIcon={() => {
                                                    return (
                                                        <Image
                                                            resizeMode="contain"
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                marginRight: 3,
                                                                // tintColor: 'black',
                                                            }}
                                                            source={require('../../Images/down_arrow.png')}
                                                        />
                                                    );
                                                }}

                                                dropdownIconPosition={'right'}
                                                dropdownStyle={{
                                                    backgroundColor: '#EFEFEF',
                                                    elevation: 5,
                                                    alignSelf: 'center',
                                                }}
                                                rowStyle={{
                                                    color: '#000000',
                                                    backgroundColor: '#EFEFEF',
                                                    borderBottomColor: '#C5C5C5',
                                                }}
                                                rowTextStyle={{ color: '#000000', textAlign: 'left', marginStart: 17 }}

                                            />

                                        </View>

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Cost of EV Vehicle selected" : 'चयनित ईवी वाहन की लागत'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                                            <Text style={{ marginStart: 17 }}>{this.state.evVehicleCost}</Text>
                                            <View style={{ backgroundColor: 'seagreen', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '20%', justifyContent: 'center', alignSelf: 'flex-end' }}><Text style={{ textAlign: 'center', color: 'white' }}>INR</Text></View>
                                        </View>

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "State level subisdy" : 'राज्य स्तरीय सब्सिडी'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TextInput
                                                style={{ marginStart: 15, width: '70%' }}
                                                keyboardType='numeric'
                                                placeholder='0'
                                                onChangeText={stateSubsidy => this.setState({stateSubsidy})}
                                            />
                                            <View style={{ backgroundColor: 'seagreen', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '20%', justifyContent: 'center', alignSelf: 'flex-end' }}><Text style={{ textAlign: 'center', color: 'white' }}>INR</Text></View>
                                        </View>

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Actual cost of Electric Vehicle" : 'इलेक्ट्रिक वाहन की वास्तविक लागत'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', justifyContent: 'space-between',alignItems:'center',flexDirection:'row' }}>
                                          
                                        <Text style={{ marginStart: 17 }}>{this.state.actualEvCost-this.state.stateSubsidy}</Text>

                                            <View style={{ backgroundColor: 'seagreen', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '20%', justifyContent: 'center', alignSelf: 'flex-end' }}><Text style={{ textAlign: 'center', color: 'white' }}>INR</Text></View>
                                        </View>

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Vehicle Range" : 'वाहन रेंज'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', justifyContent: 'space-between',alignItems:'center',flexDirection:'row' }}>
                                        
                                        <Text style={{ marginStart: 17 }}>{this.state.evRange}</Text>
                                            <View style={{ backgroundColor: 'seagreen', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '20%', justifyContent: 'center', alignSelf: 'flex-end' }}><Text style={{ textAlign: 'center', color: 'white' }}>INR</Text></View>
                                        </View>

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Upfront subsidy under FAME India Phase II Scheme" : 'फेम इंडिया फेज II योजना के तहत अग्रिम सब्सिडी'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', justifyContent: 'space-between',alignItems:'center',flexDirection:'row' }}>

                                        <Text style={{ marginStart: 17 }}>{this.state.upFrontSubsidy}</Text>
                                            <View style={{ backgroundColor: 'seagreen', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '20%', justifyContent: 'center', alignSelf: 'flex-end' }}><Text style={{ textAlign: 'center', color: 'white' }}>INR</Text></View>
                                        </View>

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "Select state" : 'राज्य चुनें'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', justifyContent: 'center' }}>
                                        <SelectDropdown
                                                data={this.props.StateWiseTariffData.value}
                                                onSelect={(selectedItem, index) => {
                                                    console.log('select', selectedItem.ev_tariff,selectedItem);
                                                    this.setState({
                                                       tariff:selectedItem.ev_tariff,
                                                       selectedState:selectedItem.state_name,
                                                    },console.log('tariff data',this.state.Tariff));

                                                }}
                                                defaultButtonText={CONSTANT.selectedLanguage == 'English' ? "Select State" : "चुनना"}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem.state_name;
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    return item.state_name;
                                                }}
                                                buttonStyle={{
                                                    width: '100%',
                                                    height: 50,

                                                    alignSelf: 'center',
                                                    backgroundColor: '#fffff',
                                                    borderRadius: 10,
                                                    borderColor: '#444',
                                                }}
                                                buttonTextStyle={{
                                                    color: 'gray',
                                                    textAlign: 'left',
                                                    fontSize: 19,
                                                    // backgroundColor:'yellow'

                                                }}
                                                renderDropdownIcon={() => {
                                                    return (
                                                        <Image
                                                            resizeMode="contain"
                                                            style={{
                                                                width: 15,
                                                                height: 15,
                                                                marginRight: 3,
                                                                // tintColor: 'black',
                                                            }}
                                                            source={require('../../Images/down_arrow.png')}
                                                        />
                                                    );
                                                }}

                                                dropdownIconPosition={'right'}
                                                dropdownStyle={{
                                                    backgroundColor: '#EFEFEF',
                                                    elevation: 5,
                                                    alignSelf: 'center',
                                                }}
                                                rowStyle={{
                                                    color: '#000000',
                                                    backgroundColor: '#EFEFEF',
                                                    borderBottomColor: '#C5C5C5',
                                                }}
                                                rowTextStyle={{ color: '#000000', textAlign: 'left', marginStart: 17 }}

                                            />
                                        </View>

                                        <Text style={{ marginStart: 20, color: 'black', marginTop: 10 }}>{CONSTANT.selectedLanguage == 'English' ? "EV home charging tariff (As per State Tariff Order)" : 'ईवी होम चार्जिंग टैरिफ (राज्य टैरिफ आदेश के अनुसार)'}</Text>
                                        <View style={{ width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, margin: 5, borderWidth: 1.5, borderColor: 'steelblue', marginBottom: 20 , justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                        <Text style={{ marginStart: 17 }}>{this.state.tariff}</Text>
                                            <View style={{ backgroundColor: 'seagreen', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '20%', justifyContent: 'center', alignSelf: 'flex-end' }}><Text style={{ textAlign: 'center', color: 'white' }}>INR</Text></View>
                                        </View>
                                    </>)
                                    : null}

                            </View>


                           
                        </View>

                        
                        {/* Calculate Button */}
                        <TouchableOpacity style={{ marginTop: 10 }} 

                           onPress={() => {this.clickCalculate(this.state.ownershipMt, this.state.segment, this.state.distanceTravelled,this.state.iceModels,this.state.fuelCost,this.state.evModels,this.state.stateSubsidy,this.state.selectedState);
                            
                            this.props.CalculateTcoDataApi(this.state.stateSubsidy, this.state.selectedState, this.state.tariff,this.state.ownershipMt,this.state.iceVehicleCost, this.state.mileageIce,this.state.evVehicleCost,
                                this.state.evRange,this.state.evVehicleCost,this.state.upFrontSubsidy,this.state.iceModels,this.state.evModels,this.state.segment,this.state.distanceTravelled,this.state.fuelCost)

                                // this.setState({
                                //     showCard3: false,
                                //     showCard2: false,
                                //     showCard1: false,
                                // })
                                }}>

                            <View style={{ height: 60, backgroundColor: 'seagreen', justifyContent: 'center', borderRadius: 10, alignSelf: 'center', padding: 15, width: '93%' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 18 }}>{CONSTANT.selectedLanguage == 'English' ? "Calculate" : 'गणना'}</Text>
                            </View>

                        </TouchableOpacity>


                        {/* Card View 4 Total Ownership Cost */}

                        <View style={{ padding: 15 }}>
                            <View style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 15 }}>

                                <TouchableOpacity onPress={() => this.setState({
                                    // showCard3: false,
                                    // showCard2: false,
                                    // showCard1: false,
                                    showCard4: !this.state.showCard4
                                })}>
                                    <View style={{ height: 65, backgroundColor: 'aquamarine', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ alignSelf: 'center', fontWeight: '500', color: 'black', }}>
                                            {CONSTANT.selectedLanguage == 'English' ? "Total Cost of Ownership" : 'मालिकाने की कुल कीमत'}</Text>
                                        <Image
                                            style={{ height: 15, width: 15, position: 'absolute', right: 10, alignSelf: 'center' }}
                                            source={IMAGES.downArrow}
                                        />
                                    </View>
                                </TouchableOpacity>

                                {this.state.showCard4 ?
                                    (<>

                                        <View style={{ alignSelf: 'center', backgroundColor: 'lightsteelblue', height: 120, width: '80%', marginTop: 20, marginBottom: 20, borderRadius: 10, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold', marginTop: 12 }}> {CONSTANT.selectedLanguage == 'English' ? "Cost per km (across 10 years lifetime)" : 'लागत प्रति किमी (10 साल के जीवनकाल में)'}</Text>

                                            <View style={{ width: '80%', height: 50, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                                <View style={{ width: '47%', alignSelf: 'center', height: 50, borderRadius: 10, borderWidth: 1.5, borderColor: 'steelblue',justifyContent: 'space-between',alignItems:'center',flexDirection:'row', backgroundColor: 'white' }}>
                                                 <Text style={{ marginStart: 17 }}>{this.state.costPerKm.ICE}</Text>
                                                    <View style={{ backgroundColor: 'darkorange', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '25%', justifyContent: 'center', alignSelf: 'flex-end' }}><Text style={{ textAlign: 'center', color: 'white' }}>ICE</Text></View>
                                                </View>

                                                <View style={{ width: '47%', alignSelf: 'center', height: 50, borderRadius: 10, borderWidth: 1.5, borderColor: 'steelblue',justifyContent: 'space-between',alignItems:'center',flexDirection:'row', backgroundColor: 'white' }}>
                                                <Text style={{ marginStart: 17 }}>{this.state.costPerKm.EV}</Text>
                                                    <View style={{ backgroundColor: 'seagreen', height: 47, borderBottomRightRadius: 10, borderTopRightRadius: 10, width: '25%', justifyContent: 'center', alignSelf: 'flex-end' }}><Text style={{ textAlign: 'center', color: 'white' }}>EV</Text></View>
                                                </View>

                                            </View>
                                        </View>
                                    </>)
                                    : null}

                            </View>
                        </View>


                        {/* card view ice piechart */}
                    
                      
                        <View style={{ padding: 15 }}>

                           
                             {this.state.pieChart1 ?
                             
                            <View style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 15 }}>

                                {/* <TouchableOpacity onPress={() => this.setState({


                                })}> */}
                                    <View style={{ height: 55, backgroundColor: 'pink', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ marginStart: 20, fontWeight: '500', color: 'black', }}>
                                            {CONSTANT.selectedLanguage == 'English' ? "10 Years ICE Cost: ₹ ": '10 साल आईसीई लागत'}{this.state.iceCostTenY}</Text>

                                    </View>
                                {/* </TouchableOpacity> */}

                                <Text style={{ alignSelf: 'center', marginTop: 10, color: 'black' }}>{CONSTANT.selectedLanguage == 'English' ? "ICE Cost Breakdown in INR (Estimation for 10 years): ₹ ": 'भारतीय रुपये में ICE लागत ब्रेकडाउन (10 वर्षों के लिए अनुमान)'}</Text>
                            
                                
                                
                                <PieChartTco PieChartData={this.state.iceBreakDown} />
                                

                            </View>
                           
                           :null}
                    

                            {/* card view ev piechart */}
                             
                            {this.state.pieChart2 ?

                            <View style={{ backgroundColor: 'white', borderRadius: 10, marginTop: 15 }}>

                                <TouchableOpacity onPress={() => this.setState({


                                })}>
                                    <View style={{ height: 55, backgroundColor: 'aquamarine', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ marginStart: 20, fontWeight: '500', color: 'black', }}>
                                            {CONSTANT.selectedLanguage == 'English' ? "10 Years EV Cost: ₹ " : '10 साल की ईवी लागत'}{this.state.evCostTenY} </Text>

                                    </View>
                                </TouchableOpacity>

                                <Text style={{ alignSelf: 'center', marginTop: 10, color: 'black' }}> {CONSTANT.selectedLanguage == 'English' ? "EV Cost Breakdown in INR (Estimation for 10 years): ₹ " : 'भारतीय रुपये में EV लागत ब्रेकडाउन (10 वर्षों के लिए अनुमान)'}</Text>
                                { this.state.pieChart2 ?
                                <PieChartTco PieChartData={this.state.evBreakDown} />
                                :null}
                            </View>
                            :null}

                        </View>



                        <View style={{ height: 100 }}></View>
                    </ScrollView>


                </KeyboardAvoidingView>

            </SafeAreaView>
         
           );
        }
     }
            const styles = StyleSheet.create({

                backgroundImage: {
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                },
                backgroundImgStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center'
                },
                textInputStyle: {
                    alignSelf: 'center',
                    fontSize: 17,
                    color: 'black',
                    height: '90%',
                    marginLeft: 5
                },
                logoImgStyle: {
                    width: '30%',
                    height: '27%',
                    marginTop: '5%',
                    alignItems: 'center',
                    marginLeft: '35%'
                },
                imageDrawableStyle: {
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignContent: 'center',
                },

                textInputView: {
                    width: '85%',
                    height: 50,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    borderRadius: 30,
                    borderWidth: 0.5,
                    borderColor: 'gray',
                    backgroundColor: 'white'
                },
                simpleLine: {
                    backgroundColor: 'gray',
                    height: 1,
                    width: '85%',
                    marginTop: 10,
                    alignSelf: 'center'
                },

                modalView: {
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                }



            });


            const mapStateToProps = state => ({
                StateWiseTariffData: state.StateWiseTariffDataResponse,
                EvVehicleModelData: state.EvVehicleModelDataResponse,
                IceVehicleModelData: state.IceVehicleModelDataResponse,
                EvVehicleData: state.EvVehicleDataResponse,
                IceVehicleData: state.IceVehicleDataResponse,
                TcoCalculatorData:state.CalculateTcoDataResponse,
            });

            const dispatchStateToProps = dispatch => ({
                StateWiseTariffApi: (state) => {
                    dispatch(loadStateWiseTariffData(state));
                },
                EvVehicleModelDataApi: (vehicle_type) => {
                    dispatch(loadEvVehicleModelData(vehicle_type))
                },

                IceVehicleModelDataApi: (vehicle_type) => {
                    dispatch(loadIceVehicleModelData(vehicle_type))
                },

                EvVehicleDataApi: (evType, evModal, ownerType) => {
                    dispatch(loadEvVehicleData(evType, evModal, ownerType))
                },
                IceVehicleDataApi: (iceType, iceModal) => {
                    dispatch(loadIceVehicleData(iceType, iceModal))
                },
                CalculateTcoDataApi: (slSubisdy, state, evTariff, ownerType, cost_ice_vehicle, mileage_ice_vehicle, ev_vehicle_cost,
                    range, actual_ev_cost, subsidy, ice_vehicle_model, ev_vehicle_model, vehicle_segment, distance, fuel_cost_for_ice_vehicle) => {

                    dispatch(loadCalculateTcoData(slSubisdy, state, evTariff, ownerType, cost_ice_vehicle, mileage_ice_vehicle, ev_vehicle_cost,
                        range, actual_ev_cost, subsidy, ice_vehicle_model, ev_vehicle_model, vehicle_segment, distance, fuel_cost_for_ice_vehicle))
                },
            });
            export default connect(mapStateToProps, dispatchStateToProps)(TcoCalculator);
