"use strict";

import { AsyncStorage } from "react-native";
import DSInventory from "./inventory";

let defaultStructure = {
    autoIncrementKey: 0,
    data: []
};

class Orders {

    static add({ params }){
        console.log("#### [Orders] [add] request received with params: ", params);

        params.qty = Number(params.qty);
        params.additionalCharges = Number(params.additionalCharges);

        let autoIncrementKey;

        return new Promise((resolve, reject) => {
            Orders
                .list()
                .then((result = defaultStructure) => {

                    result.data.push(Object.assign({}, params, {
                        id: ++result.autoIncrementKey
                    }));

                    autoIncrementKey = result.autoIncrementKey; // We will be using this key to add as order_id

                    return AsyncStorage.setItem('ORDERS', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [Orders] [add] [response] ", response);

                    let promise = Promise.resolve();
                    params.rates.map(row => {
                        promise = promise.then(() => {
                            return DSInventory.add({
                                params: {
                                    party_id: params.party_id,
                                    component_id: row.component_id,
                                    order_id: autoIncrementKey, 
                                    qty: params.qty * row.qty,
                                    type: false,
                                    remark: "Inventory updated via order creation"
                                }
                            }).then(res => {
                                console.log("#### [Orders] [add] [Inventory update] success with res: ", res);
                            })
                            .catch(err => {
                                console.log("#### [Orders] [add] [Inventory update] failed with err: ", err);
                                return Promise.resolve(response); // Resolving promise in case of inventory fail for any one
                            });
                        });
                    });

                    return promise;
                })
                .then(response => {
                    return resolve(response);
                })
                .catch(error => {
                    console.log("######## [Orders] [add] [error] ", error);

                    return reject(error);
                });
        });
    }

    static edit({ params }){
        return new Promise((resolve, reject) => {
            Orders
                .list()
                .then(result => {
                    let currentOrder = result.data.find(order => order.id === params.id);
                    Object.assign(currentOrder, params);

                    return AsyncStorage.setItem('ORDERS', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [Orders] [edit] [response] ", response);

                    return resolve(response);
                })
                .catch(error => {
                    console.log("######## [Orders] [edit] [error] ", error);

                    return reject(error);
                });
        });
    }

    static list({ filters } = {}){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('ORDERS', (error, response) => {

                if(error){
                    console.log("######## [Orders] [list] [error] ", error);
                    return reject(error);
                }

                response = response ? JSON.parse(response) : defaultStructure;
                console.log("######## [Orders] [list] [response] ", response);
                
                if(filters && filters.party_id && response){
                    response.data = response.data.filter(order => {
                        return order.party_id === filters.party_id;
                    });
                }

                return resolve(response);
            });
        });
    }

    static map({ filters } = {}){
        return new Promise((resolve, reject) => {
            Orders
                .list({ filters })
                .then(result => {
                    let orderMap = result.data.reduce((accumulator, row) => {
                        accumulator[row.id] = row;
                        return accumulator;
                    }, {});

                    console.log("######## [Orders] [map] [orderMap] ", orderMap);
                    return resolve(orderMap);
                })
                .catch(error => {
                    console.log("######## [Orders] [map] [error] ", error);

                    return reject(error);
                });
        });
    }

}


// Orders.list();

// Orders.edit({
//     params: {
//         id: 1,
//         name: "ROBOTO FIRM",
//         description: "This is my first Orders",
//         phone: "8860001449"
//     }
// });

// Orders.add({
//     params: { 
//         name: 'PCB3344',
//         party_id: 3,
//         description: 'Dsfsfdf sd dfs',
//         mountRate: '.45' 
//     }
// });

export default Orders;