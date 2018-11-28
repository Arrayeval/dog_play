import React, {PureComponent} from 'react'
import {View, Text, ImageBackground, StyleSheet, TouchableHighlight, FlatList, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FontIcon from 'react-native-vector-icons/FontAwesome'

import httpReq from '../utils/Fetch'
import ListUrl from '../service/ListUrl'
import RequestData from '../utils/RequestData'
const {width: screenWidth, height: screenHeight} =  Dimensions.get('window')


export default class List extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            listData: []
        }
    }

    _getListData = () => {
        // httpReq({url})
        RequestData.get(ListUrl.listArr)
        .then(responseJson => {
            this.setState({listData: responseJson.data})
          return responseJson.movies;
        })
        .catch(error => {
          console.error(error);
        });
    }

    _onPressItem = () => {

    }

    _renderItem = ({item}) => (
        <ListItem
          id={item._id}
          thumb={item.thumb}
          onPressItem={this._onPressItem}
        />
    )

    _keyExtractor = (item, index) => index + ''

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
                data={this.state.listData}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                />
            </View>
        )
    }
}

class ListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id)
    }
    render () {
        return (
            <TouchableHighlight onPress = {this._onPress}>
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
            </TouchableHighlight>
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
    }
})