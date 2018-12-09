import React, {PureComponent} from 'react'
import {View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, FlatList, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FontIcon from 'react-native-vector-icons/FontAwesome'

import httpReq from '../utils/Fetch'
import ListUrl from '../service/ListUrl'
import RequestData from '../utils/RequestData'
const {width: screenWidth, height: screenHeight} =  Dimensions.get('window')

var cacheResults = {
    nextPage: 1,
    items: [], // 视频列表data
    total: 0
}

export default class List extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            listData: [],
            isLoadingTail: false,
            nextPage: 1,
            isRefreshing: false
        }
    }

    _getListData = (page=1) => {
        if (page !== 0) {
            this.setState({
                isLoadingTail: true,
                isRefreshing: false
            })
        }

        // httpReq({url})
        RequestData.get(ListUrl.listArr, {
            page: page,
        })
        .then(res => {
            var that=this
            if (res.success) {
                var items = cacheResults.items.slice()
                
                if (page !== 0) {
                    items = items.concat(res.data)
                    cacheResults.nextPage += 1
                } else {
                    items = res.data.concat(items)
                }
                
                items = items.concat(res.data)
                cacheResults.items = items
                cacheResults.total = res.total

                setTimeout(function() {
                    if (page !== 0) {
                        that.setState({
                            listData: cacheResults.items,
                            isLoadingTail: false
                        })
                    } else {
                        that.setState({
                            listData: cacheResults.items,
                            isRefreshing: false
                        }) 
                    }
                },200)
            }
        })
        .catch(error => {

           page !==0 ? this.setState({
                isLoadingTail: false
            }) : this.setState({isRefreshing: false})
            console.error(error);
        });
    }

    _onPressItem = (item) => {
        this.props.navigation.push('VideoDetail', {item})
    }
    _renderItem = ({item}) => (
        <ListItem
          id={item._id}
          title={item.title}
          thumb={item.thumb}
          onPressItem={this._onPressItem.bind(this, item)}
        />
    )

    _keyExtractor = (item, index) => index + ''

    _hasMore = () => {
        return cacheResults.items.length !== cacheResults.total
    }

    _getMoreListData = () => {
        // 没有更多数据 || 已经在加载中
        if (!this._hasMore() || this.state.isLoadingTail) {
            return
        }
        let page = cacheResults.page
        this._getListData(page)
    }

    _renderRefresh = () => {
        if (!this._hasMore() || this.state.isRefreshing) {
            return 
        }
        this.setState({
            isRefreshing: true
        })
        this._getListData(0)
    }

    _renderFooter = () => {
        if (!this._hasMore() && cacheResults.total !== 0) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有过更多了</Text>
                </View>
            )
        }
        return (
            <View style={styles.loadingWrapper}> 
                <Image source={require("../assets/images/loading.gif")} resizeMode={'contain'} 
                    style={styles.loadingIcon} />
                <Text style={{color:'#515151'}}>正在加载...</Text>
            </View>
        )
    }
    _emptyContent = () => {
        return (
            <View>
                <Text>this is selfDemo</Text>
            </View>
        )
    }
    componentDidMount () {
        this._getListData()
    }

    render () {
        return (
            <View style = {styles.container}> 
                <View style={styles.header}>
                    <Text style={styles.headerTitle}> 列表标题</Text>
                </View>
                <FlatList
                // 数据集合
                data={this.state.listData}
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
                onRefresh={this._renderRefresh}
                //初始加载的条数，不会被卸载
                initialNumToRender={3}
                />
            </View>
        )
    }
}

class ListItem extends React.PureComponent {
    constructor (props) {
        super(props)
    }
    _onPress = () => {
        this.props.onPressItem()
    }
    render () {
        return (
            <TouchableOpacity  onPress = {this._onPress} activeOpacity={0.8}>
                <View style={styles.item}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <ImageBackground  style={styles.thumb} source={{uri: this.props.thumb}}>
                        <Icon name="ios-play" size={28} style={styles.play}/>
                    </ImageBackground >
                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Icon name="ios-heart-empty" size={28} style={styles.up}/>
                            {/* <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />; */}
                            <Text style={styles.handleText}>喜欢</Text>
                        </View>
                        <View style={styles.handleBox}>
                            <FontIcon name="comment-o" size={28} style={styles.commentIcon}/>
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FCFF',
        // justifyContent:"center",
        // alignItems:"center"
    },
    header: {
        paddingTop:12,
        paddingBottom:12,
        backgroundColor:'#ee735c'
    },
    headerTitle:{
        color:"#fff",
        fontSize:16,
        textAlign:"center",
        fontWeight:"600"
    },
    item: {
        width: screenWidth,
        marginBottom:10,
        backgroundColor:'#fff',
    },
    thumb:{
        width:screenWidth,
        height: screenWidth *.56,
        resizeMode: 'cover'
    },
    title:{
        padding:10,
        fontSize:18,
        color:'#333'
    },
    itemFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    handleBox:{
        padding:10,
        flex:1,
        flexDirection:"row",
        width:screenWidth / 2 -0.5,
        justifyContent: 'center',
        backgroundColor:'#fff'
    },
    play:{
        position: "absolute",
        bottom: 14,
        right:14,
        width:46,
        height:46,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth:1,
        borderRadius: 23,
        color: '#ed7b66'
    },
    handleText: {
        paddingLeft:12,
        fontSize:18,
        color:'#333',
    },
    up:{
        fontSize:22,
        color:"#333",
    },
    commentIcon:{
        fontSize:22,
        color:"#333"
    },
    loadingMore: {
        marginVertical: 5
    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    },
    loadingWrapper:{
        flexDirection:'row', justifyContent:'center', alignItems:'center', height:40
    },
    loadingIcon:{
        width:20, height:20, marginRight: 5, height:40
    }
})