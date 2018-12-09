import React, {PureComponent} from 'react'
import {View, Text, TouchableOpacity, ScrollView,　Image, Dimensions, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import RequestData from '../../utils/RequestData'
import ListUrl from '../../service/ListUrl'
const {width: screenWidth, height: screenHeight} =  Dimensions.get('window')

export default class VideoDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            videoOk: true,
            rate: 1,               // 播放速度
            muted: false,          // 静音
            resizeMode:'contain',  // cover,contain,stretch
            repeat: false,         // 是否重复播放
            videoLoaded: false,    // 加载完成
            videoProgress: 0.01,   // 进度条（通过当前时间与总时间的比值计算）
            videoTotal: 0,         // 总时间   
            currentTime: 0,        // 当前时间
            playing: false,        // 正在播放
            paused: false,         // 暂停
            comments: []
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
        // !this.state.videoLoaded && this.setState({videoLoaded: true})
        let duration = data.playableDuration
        let currentTime = data.currentTime
        let percent = Number((currentTime / duration).toFixed(2))
        let newState = {
            videoTotal: duration,
            currentTime: Number(data.currentTime.toFixed(2)),
            videoProgress: percent
        }
        if (!this.state.videoLoaded) {
            newState.videoLoaded = true 
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
        this.setState({videoOk: false})
    }

    _pause = () => {
        if (!this.state.paused) {
            this.setState({paused: true})
        }
    }

    _resume = () => {
        if (this.state.paused) {
            this.setState({paused: false})
        }
    }

    _fetchData = () => {
        let that = this
        let url = ListUrl.comment
        RequestData.get(url, {
            creation: 123
        }).then((data) => {
            if (data.success && data) {
                let comments = data.data
                if (comments && comments.length > 0){
                    that.setState({
                        comments: comments
                    })
                }
            }
        }).catch(err => {
            alert(JSON.stringify(err))
            console.log(err)
        })
    }

    _renderItem = (row) => (
        <View key={row._id} style={styles.replayBox}>
            <Image style={styles.replayAvatar} source={{uri:row.item.repayBy.avatar}}/>
            <View style={styles.replay}>
                <Text style={styles.replayNickname}>{row.item.repayBy.nickname}</Text>
                <Text style={styles.replayComment}>{row.item.repayBy.comment}</Text>
            </View>  
        </View>
    )
    
    _keyExtractor = (item, index) => index + ''
    

    componentDidMount () {
        this._fetchData()
    }

    render () {
        const { navigation } = this.props
        const item = navigation.getParam('item', 'NOItem');
        return (
            <View style={styles.container}> 
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backWrapper}  onPress={() => this.props.navigation.navigate('List')}>
                        <Icon name="ios-arrow-back" size={30} style={styles.icon}></Icon>
                        <Text style={styles.backText}>返回</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{item.title}</Text>
                </View>
                {/*视频*/}
                <View style={styles.videoBox}>
                    <Video ref="videoPlayer" 
                        style={styles.video}
                        source={{uri: item.videoUrl}}
                        volume={5}
                        paused={this.state.paused}
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
                    {/*视频资源加载失败*/}
                    {
                        !this.state.videoOk && <Text style={styles.failText}>视频出错了！很抱歉</Text>
                    }

                    {/*加载*/}
                    {
                        !this.state.videoLoaded &&  <View style={styles.loadingWrapper}>
                        <Image source={require("../../assets/images/loading_runing.png")} resizeMode={'contain'} 
                          style={styles.loadingIcon} />
                      </View>
                    }
                    {/*暂停,播放按钮*/}
                    {/* {
                        !this.state.videoLoaded && !this.state.playing ?
                        <Icon onPress={this._rePlay} name="ios-play" size={34} style={styles.playIcon}/> : null
                    } */}
                    {/*蒙层*/}
                    {
                        this.state.videoLoaded && this.state.playing ? 
                        <TouchableOpacity onPress={this._pause} style={styles.pauseBtn}>
                        {
                            this.state.paused? 
                            <Icon onPress={this._resume} size={34} name="ios-play" style={styles.resumeIcon}></Icon>
                            : <Text></Text>
                        }
                        </TouchableOpacity>: null
                    }
                    <View style={styles.progressBox}>
                        <View style={[styles.progressBar, {width: screenWidth * this.state.videoProgress}]}></View>
                    </View>
                </View>
                {/*评论区*/}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    style={styles.scrollView}>
                    <View style={styles.infoBox}>
                        <Image style={styles.avatar} source={{uri:item.author.avatar}}/>
                        <View style={styles.descBox}>
                            <Text style={styles.nickname}>{item.author.nickname}</Text>
                            <Text style={styles.title}>{item.author.commend}</Text>
                        </View>        
                    </View>
                    {/*评论区*/}
                    <FlatList
                        // 数据集合
                        data={this.state.comments}
                        // 渲染每条
                        renderItem={this._renderItem}
                        // key
                        keyExtractor={this._keyExtractor}
                        // 决定距离底部多远调用
                        onEndReachedThreshold={0.2}
                        // 当列表被滚动到距离内容最底部不足onEndReacchedThreshold设置的距离时调用此函数
                        onEndReached={this._getMoreListData}
                        ListFooterComponent={this._renderFooter}
                        // ListEmptyComponent={this._emptyContent}
                        refreshing={this.state.isRefreshing}
                        //初始加载的条数，不会被卸载
                        initialNumToRender={3}
                        />
                </ScrollView>
            </View>
         )
    }
}
const styles = {
    container: {
    },
    header: {
        flexDirection:'row',
        justofyContent:"center",
        alignItems:'center',
        height:50,
        paddingTop:12,
        paddingBottom:12,
        backgroundColor:'#ee735c',
        paddingLeft:10,
        paddingRight:10,
        borderBottomWidth:1,
        borderColor:'rgba(0,0,0,0.1)'
    },
    headerTitle:{
        width: screenWidth - 120,
        textAlign: 'center',
        position:'relative',
        left:70,
        height:40,
        lineHeight:40,
        color:"rgb(255,255,255)",
        fontSize:18
    },
    backWrapper:{
        position:'absolute',
        left:12,
        top:10,
        width:50,
        flexDirection:'row',
        alignItems:'center'
    },
    backText:{
        marginLeft:10,
        color: '#fff',
        fontSize:16
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
    },
    pauseBtn:{
        position: 'absolute',
        left:0,
        top:0,
        zIndex:2000,
        width:screenWidth,
        height:200,
        backgroundColor: 'transparent'
    },
    resumeIcon:{
        position: "absolute",
        top:70,
        left: screenWidth / 2 - 30,
        width:60,
        height:60,
        paddingTop:12,
        paddingLeft:25,
        backgroundColor: '#ddd',
        borderColor: '#fff',
        borderWidth:1,
        borderRadius: 30,
        color: '#ed7b66' 
    },
    failText:{
        position: "absolute",
        top:100,
        left: 0,
        width: screenWidth,
        textAlign: 'center',
        color: '#fff'
    },
    infoBox:{
        width: screenWidth,
        flexDirection: 'row',
        justofyContent: 'center',
        marginTop:10
    },
    avatar:{
        width:60,
        height:60,
        marginRight:10,
        marginLeft:10,
        borderRadius:30,
        backgroundColor:'red'
    },
    descBox:{
        flex:1
    },
    nickname:{
        fontSize:18
    },
    title:{
        marginTop:8,
        fontSize:16,
        color:'rgba(64,64,64,0.2)'
    },
    replayBox:{
        flexDirection:'row',
        justofyContent: 'flex-start',
        marginTop:10
    },
    replayAvatar:{
        width:40,
        height:40,
        marginRight:10,
        marginLeft:10,
        borderRadius:20,
    },
    replayNickname:{
        color: '#666'
    },
    replayContent:{
        marginTop:4,
        color: '#666'
    },
    replay:{
        flex:1
    }
}