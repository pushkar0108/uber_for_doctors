"use strict";

import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';

import AppContainer from './screens/appContainer';
import Login from './screens/login/main';
import FeelingSick from './screens/feelingSick/main';
import RequestDoc from './screens/feelingSick/requestDoc';


import Signup from './screens/signup/main';
import OTPVerify from './screens/signup/otpVerify';
import BasicDetails from './screens/signup/basicDetails';

import ChatRoom from './screens/chat/room';

import WebView from './screens/common/webView';
import FormView from './screens/common/formView';
import Inbox from './screens/inbox/main';
import Home from './screens/home/main';

import {
  createStackNavigator
} from 'react-navigation';


const AppStack = createStackNavigator({

  AppContainer: {
    screen: createStackNavigator({
      AppContainer: { 
        screen: AppContainer,
        navigationOptions: {
          header: null
        }
      },

      Login: { 
        screen: Login,
        navigationOptions: {
          header: null
        }
      },

      Signup: {
        screen: createStackNavigator({

          Signup: { 
            screen: Signup,
            navigationOptions: {
              header: null
            }
          },

          OTPVerify: { 
            screen: OTPVerify,
            navigationOptions: {
              header: null
            }
          },


          BasicDetails: { 
            screen: BasicDetails,
            navigationOptions: {
              header: null
            }
          }
    
        }),
        navigationOptions: {
          header: null
        }
      },

      FeelingSick: {
        screen: createStackNavigator({

          FeelingSick: { 
            screen: FeelingSick,
            navigationOptions: {
              header: null
            }
          },

          RequestDoc: { 
            screen: RequestDoc,
            navigationOptions: {
              header: null
            }
          }
    
        }),
        navigationOptions: {
          header: null
        }
      },

      Home: { 
        screen: Home,
        navigationOptions: {
          header: null
        }
      },

      WebView: { 
        screen: WebView,
        navigationOptions: {
          header: null
        }
      },

      FormView: { 
        screen: FormView,
        navigationOptions: {
          header: null
        }
      },

      ChatRoom: { 
        screen: ChatRoom,
        navigationOptions: {
          header: null
        }
      },

      Inbox: { 
        screen: Inbox,
        navigationOptions: {
          header: null
        }
      }

    }),
    navigationOptions: {
      header: null
    }
  }

});

  


//   TemplesDetails: {
//     screen: createStackNavigator({
//       TemplesDetails: { 
//         screen: TemplesDetails,
//         navigationOptions: {
//           header: null
//         }
//       },
//       Temples: { 
//         screen: Temples,
//         navigationOptions: {
//           header: null
//         }
//       },
//       TemplesList: { 
//         screen: TemplesList,
//         navigationOptions: {
//           header: null
//         }
//       },
      
//     }),
//     navigationOptions: {
//       header: null
//     }
//   },
//   Jain: { 
//     screen: Jain,
//     navigationOptions: {
//       header: null
//     }
//   },
  
//   Prayers: {
//     screen: createStackNavigator({
//       Prayers: { 
//         screen: Prayers,
//         navigationOptions: {
//           header: null
//         }
//       },
//       PrayersList: {
//         screen: PrayersList,
//         navigationOptions: {
//           header: null
//         }
//       },
//       PrayerDetails: {
//         screen: PrayerDetails,
//         navigationOptions: {
//           header: null
//         }
//       },
//     }),
//     navigationOptions: {
//       header: null
//     }
//   },
  
//   Tirthankar: {
//     screen: createStackNavigator({
//       Tirthankar: { 
//         screen: Tirthankar,
//         navigationOptions: {
//           header: null
//         }
//       },
//       TirthankarDetails: {
//         screen: TirthankarDetails,
//         navigationOptions: {
//           header: null
//         }
//       },
//       TirthankarInfo: {
//         screen: TirthankarInfo,
//         navigationOptions: {
//           header: null
//         }
//       }
//     }),
//     navigationOptions: {
//       header: null
//     }
//   },
//   Navkar: { 
//     screen: Navkar,
//     navigationOptions: {
//       header: null
//     }
//   },
  

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <AppStack />
  }
}