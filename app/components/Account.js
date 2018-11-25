import React, {PureComponent} from 'react'
import {View, Text, TouchableOpacity,　Image, Dimensions} from 'react-native'
const {width: screenWidth, height: screenHeight} =  Dimensions.get('window')

export default class Account extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <View> 
                <Text>this is Account page</Text>
            </View>
        )
    }
}