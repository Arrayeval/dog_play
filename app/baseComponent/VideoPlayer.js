// 视频播放组件
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity,　Image, Dimensions} from 'react-native'

import PropsTypes from 'prop-types'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'

const screenWidth = Dimensions.get('window').width
const defaultVideoHeight = screenWidth * 9 / 16

export default class VideoPlayer extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <View style={styles.videoContainer}>
        <Text >this is VideoPlayer Page</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
})
