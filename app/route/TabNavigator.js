import React, {PureComponent} from 'react'
import {
  Image,
  StyleSheet, 
} from 'react-native'

import { createBottomTabNavigator  } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Video from '../components/Video'
import List from '../components/List'
import Account from '../components/Account'
export default MainTab = createBottomTabNavigator (
  {
    'List': {
      screen: List,
      navigationOptions: ({navigation, screenProps}) => ({
        header: '列表',
        headerTitle: '列表',
        headerStyle:styles.navigator,
        headerTitleStyle:styles.navigatorTitle,
        gesturesEnabled:true,
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          let iconName = `md-list${focused ? '' : ''}`;
          return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        }
      })
    },
    'Video': {
      screen: Video,
      navigationOptions: ({navigation, screenProps}) => ({
        header: '首页',
        headerTitle: '首页',
        headerStyle:styles.navigator,
        headerTitleStyle:styles.navigatorTitle,
        gesturesEnabled:true,
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          let iconName = `ios-home${focused ? '' : ''}`;
          return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        }
      })
    },
    'Account': {
      screen: Account,
      navigationOptions: ({navigation, screenProps}) => ({
        header: '账户',
        headerTitle: '账户',
        headerStyle:styles.navigator,
        headerTitleStyle:styles.navigatorTitle,
        gesturesEnabled:true,
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          let iconName = `ios-person${focused ? '' : ''}`;
          return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        }
      }),
      tabBarOptions: {
          activeTintColor: '#4BC1D2',
          inactiveTintColor: '#000',
          showIcon: true,
          showLabel: true,
          upperCaseLabel: false,
          pressColor: '#788493',
          pressOpacity: 0.8,
          style: {
              backgroundColor: '#fff',
              paddingBottom: 0,
              borderTopWidth: 0.5,
              borderTopColor: '#ccc',
          },
          labelStyle: {
              fontSize: 12,
              margin: 1
          },
          indicatorStyle: {height: 0},
        },
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: false,
        lazy: true,
        backBehavior: 'none',
    },
  },
  {
    backBehavior:'none',
    tabBarOptions:{
      activeTintColor:'#ee735c', // label和icon的前景色 活跃状态下（选中）。
      inactiveTintColor:'#515151', // label和icon的前景色 不活跃状态下(未选中)。
      labelStyle:{
          fontSize: 10,
      }, //label的样式。
      iconStyle:{
        paddingTop:10,
      }
    } 
  }
)
const styles = StyleSheet.create({
    navigatorTitle:{
        fontSize:20,
        color:'white',
    },
    navigator:{
        backgroundColor:'#d81e06',
    },
    tabbarImage:{
        width:25,
        height:25,
        marginBottom:-3,
    },
  })