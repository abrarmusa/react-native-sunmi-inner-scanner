/**
 * Created by januslo on 2017/5/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    BackHandler,
    Dimensions,
    Navigator,
    Button
} from 'react-native';

import {SunmiScannerView} from 'react-native-sunmi-inner-scanner';
var {height, width} = Dimensions.get('window');
export default class scannerPrevew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            mute:0,
            interval:500
        }
    }
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
    }


    render() {
        return <View style={styles.container}>
            <Text>Scan Result: {this.state.result}</Text>
            <Button title={this.state.mute?"not mute":"mute"} onPress={()=>{
                    this.setState({
                    mute:this.state.mute?0:1
                    })
            }
            }></Button>
            <View style={{flex:1}}>
                <SunmiScannerView style={styles.scanner} mute={this.state.mute} scanInterval={this.state.interval}  onCodeScan={(data)=>{
                this.setState({
                result:JSON.stringify(data)+" [mute:"+this.state.mute+"]"
                })
            }
            }>
                </SunmiScannerView>
            </View>
        </View>
    }
    _onBackAndroid=()=>{
        const navigator= this.props.navigator;
        if(navigator){
            navigator.pop();
        }
        return true;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    scanner: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#0000aa',
        borderWidth: 1
    }
});