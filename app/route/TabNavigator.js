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
export default MainTab = createBottomTabNavigator ({
  List: {
    screen: List,
    navigationOptions: ({navigation, screenProps}) => ({
      header: null,
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
    Video: {
    screen: Video,
    navigationOptions: ({navigation, screenProps}) => ({
      header: null,
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

  Account: {
    screen: Account,
    navigationOptions: ({navigation, screenProps}) => ({
      header: null,
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
})
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