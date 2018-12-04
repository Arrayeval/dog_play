import React, {PureComponent} from 'react'
import {View, Text, TouchableOpacity,　Image, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
const {width: screenWidth, height: screenHeight} =  Dimensions.get('window')

export default class VideoDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            rate: 1,
            muted: false,
            resizeMode:'contain',  // cover,contain,stretch
            repeat: false,
            videoloaded: false,
            videoProgress: 0.01,
            videoTotal: 0,
            currentTime: 0,
            playing: false
        }
    }
  
    // 资源刚加载
    _onLoadStart = () => {
        
    }

    // 边放边加载
    _onLoad = () => {
      
    }

    // 播放的过程中
    _onProgress = (data) => {
        !this.state.videoloaded && this.setState({videoloaded: true})
        let duration = data.playableDuration
        let currentTime = data.currentTime
        let percent = Number((currentTime / duration).toFixed(2))
        let newState = {
            videoTotal: duration,
            currentTime: Number(data.currentTime.toFixed(2)),
            videoProgress: percent,
            playing: false
        }
        if (!this.state.videoloaded) {
            newState.videoloaded = true 
        }
        if (!this.state.playing) {
           newState.playing = true
        }
        this.setState(newState)
    }

    // 播放完毕
    _onEnd = () => {
        this.setState({
            videoProgress: 1,
            playing: false
        })
    }
    _rePlay = () => {
        this.refs.videoPlayer.seek(0)
    }
    // 播放失败
    _onError = () => {

    }

    render () {
        const { navigation } = this.props
        const item = navigation.getParam('item', 'NOItem');
        return (
            <View style={styles.container}> 
                <View style={styles.header}>
                    <Icon name="ios-arrow-back" size={34} style={styles.icon}  
                        onPress={() => this.props.navigation.navigate('List')}></Icon>
                    <Text>{item.title}</Text>
                </View>
                <View style={styles.videoBox}>
                    <Video ref="videoPlayer" 
                        style={styles.video}
                        source={{uri: item.videoUrl}}
                        volume={5}
                        paused={false}
                        rate={this.state.rate}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        repeat={this.state.repeat}
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoad} 
                        onProgress={this._onProgress}
                        onEnd={this._onEnd}
                        onError={this._onError}
                    />
                    {/*加载*/}
                    {
                        !this.state.videoloaded &&  <View style={styles.loadingWrapper}>
                        <Image source={require("../../assets/images/loading_runing.png")} resizeMode={'contain'} 
                          style={styles.loadingIcon} />
                      </View>
                    }
                    {/*暂停,播放按钮*/}
                    {
                        !this.state.videoloaded && !this.state.playing ?
                        <Icon onPress={this._rePlay} name="ios-play" size={34} style={styles.playIcon}/> : null
                    }
                    <View style={styles.progressBox}>
                        <View style={[styles.progressBar, {width: screenWidth * this.state.videoProgress}]}></View>
                    </View>
                </View>
            </View>
         )
    }
}
const styles = {
    container: {
    },
    header: {
        flexDirection:'row',
        alignItems:'center',
        height:50,
        paddingTop:12,
        paddingBottom:12,
        backgroundColor:'#ee735c',
        paddingLeft:10
    },
    icon:{
        color: '#fff'
    },
    videoBox:{
        width:screenWidth,
        height:200,
        backgroundColor:'#000'
    },
    video:{
        width:screenWidth,
        height:200,
        backgroundColor:'#000'
    },
    loadingWrapper:{
        position:'absolute',
        left:0,
        top:80,
        height:200,
        width:screenWidth,
        // backgroundColor:'#fff',
        alignSelf:'center',
        backgroundColor:'transparent',
        justofyContent:'center',
        alignItems:'center'
    },
    loadingIcon:{
        width:50,
        height:50
    },
    progressBox:{
        width: screenWidth,
        height:2,
        backgroundColor: '#ccc'
    },
    progressBar:{
        width:1,
        height:2,
        backgroundColor:'#ff6600'
    },
    playIcon:{
        position: "absolute",
        top:70,
        left: screenWidth / 2 - 30,
        width:60,
        height:60,
        paddingTop:12,
        paddingLeft:25,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth:1,
        borderRadius: 30,
        color: '#ed7b66' 
    }
}