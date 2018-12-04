import MainTab from './TabNavigator'
import VideoDetail from '../components/subPage/VideoDetail'
// import VideoDetail from './pages/subPages/VideoDetail'
// import NewsSearch from './pages/subPages/NewsSearch'
const RouteConfig = {
  MainTab: {
      screen: MainTab,
      navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
  },
  VideoDetail: {
      screen: VideoDetail,
      navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
  }
  //   NewsDetail: {
//       screen: NewsDetail,
//       navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
//   },
//   VideoDetail: {
//       screen: VideoDetail,
//       navigationOptions: ({navigation}) => ({header:null, gesturesEnable:true})
//   },
//   NewsSearch: {
//       screen: NewsSearch,
//       navigationOptions: ({navigation}) => ({header: null, gesturesEnable: true})
//   }
}

export default RouteConfig;