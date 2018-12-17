"use strict";

import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';


import Party from './screens/party/main';
import PartyAddEdit from './screens/party/addEdit';

import Components from './screens/components/main';
import ComponentAddEdit from './screens/components/addEdit';

import Payments from './screens/payments/main';
import PaymentAddEdit from './screens/payments/addEdit';

import Orders from './screens/orders/main';
import OrderAddEdit from './screens/orders/addEdit';
import OrderDetails from './screens/orders/details';

import Inventory from './screens/inventory/main';
import InventoryAddEdit from './screens/inventory/addEdit';

import Products from './screens/products/main';
import ProductAddEdit from './screens/products/addEdit';

import {
  createStackNavigator
} from 'react-navigation';


const AppStack = createStackNavigator({

  Party: {
    screen: createStackNavigator({
      Party: {
        screen: Party,
        navigationOptions: {
          header: null
        }
      },

      PartyAddEdit: { 
        screen: PartyAddEdit,
        navigationOptions: {
          header: null
        }
      },

      Components: {
        screen: createStackNavigator({
          Components: { 
            screen: Components,
            navigationOptions: {
              header: null
            }
          },
    
          ComponentAddEdit: { 
            screen: ComponentAddEdit,
            navigationOptions: {
              header: null
            }
          }
    
        }),
        navigationOptions: {
          header: null
        }
      },

      Payments: {
        screen: createStackNavigator({
          Payments: { 
            screen: Payments,
            navigationOptions: {
              header: null
            }
          },
    
          PaymentAddEdit: { 
            screen: PaymentAddEdit,
            navigationOptions: {
              header: null
            }
          }
    
        }),
        navigationOptions: {
          header: null
        }
      },

      Orders: {
        screen: createStackNavigator({
          Orders: { 
            screen: Orders,
            navigationOptions: {
              header: null
            }
          },
    
          OrderAddEdit: { 
            screen: OrderAddEdit,
            navigationOptions: {
              header: null
            }
          },

          OrderDetails: { 
            screen: OrderDetails,
            navigationOptions: {
              header: null
            }
          }
    
        }),
        navigationOptions: {
          header: null
        }
      },

      Inventory: {
        screen: createStackNavigator({
          Inventory: { 
            screen: Inventory,
            navigationOptions: {
              header: null
            }
          },
    
          InventoryAddEdit: { 
            screen: InventoryAddEdit,
            navigationOptions: {
              header: null
            }
          }
    
        }),
        navigationOptions: {
          header: null
        }
      },

      Products: {
        screen: createStackNavigator({
          Products: { 
            screen: Products,
            navigationOptions: {
              header: null
            }
          },
    
          ProductAddEdit: { 
            screen: ProductAddEdit,
            navigationOptions: {
              header: null
            }
          }
    
        }),
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

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <AppStack />
  }
}