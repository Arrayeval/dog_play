import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity,　Image, Dimensions} from 'react-native'
const {width: screenWidth, height: screenHeight} =  Dimensions.get('window')

export default class List extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <View style = {styles.mainContainer}> 
                <View style={styles.headerWrapper}>
                    <Text>列表标题</Text>
                </View>
                <View style= {styles.contentWrapper}>
                    <Text>内容区域</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    headerWrapper: {
        height:30
    }
})