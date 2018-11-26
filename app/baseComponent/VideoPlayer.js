// 视频播放组件
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity,　Image, Dimensions} from 'react-native'

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
