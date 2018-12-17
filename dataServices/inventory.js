"use strict";

import { AsyncStorage } from "react-native";

let defaultStructure = {
    autoIncrementKey: 0,
    data: []
};

class Inventory {

    static add({ params }){
        console.log("#### [Inventory] [add] request received with params: ", params);

        return new Promise((resolve, reject) => {
            Inventory
                .list()
                .then((result = defaultStructure) => {

                    result.data.push(Object.assign({}, params, {
                        id: ++result.autoIncrementKey
                    }));

                    return AsyncStorage.setItem('INVENTORY', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [Inventory] [add] [response] ", response);

                    return resolve(response); 
                })
                .catch(error => {
                    console.log("######## [Inventory] [add] [error] ", error);

                    return reject(error);
                });
        });
    }

    static edit({ params }){
        return new Promise((resolve, reject) => {
            Inventory
                .list()
                .then(result => {
                    let currentRow = result.data.find(row => row.id === params.id);
                    Object.assign(currentRow, params);

                    return AsyncStorage.setItem('INVENTORY', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [Inventory] [edit] [response] ", response);

                    return resolve(response);
                })
                .catch(error => {
                    console.log("######## [Inventory] [edit] [error] ", error);

                    return reject(error);
                });
        });
    }

    static list({ filters } = {}){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('INVENTORY', (error, response) => {

                if(error){
                    console.log("######## [Inventory] [list] [error] ", error);
                    return reject(error);
                }

                response = response ? JSON.parse(response) : defaultStructure;
                console.log("######## [Inventory] [list] [response] ", response);
                
                if(filters && filters.party_id && response){
                    response.data = response.data.filter(row => {
                        return row.party_id === filters.party_id;
                    });
                }

                response.data.reverse();
                return resolve(response);
            });
        });
    }

    static map({ filters } = {}){
        return new Promise((resolve, reject) => {
            Inventory
                .list({ filters })
                .then(result => {
                    let inventoryMap = result.data.reduce((accumulator, row) => {
                        accumulator[row.id] = row;
                        return accumulator;
                    }, {});

                    console.log("######## [Inventory] [map] [inventoryMap] ", inventoryMap);
                    return resolve(inventoryMap);
                })
                .catch(error => {
                    console.log("######## [Inventory] [map] [error] ", error);

                    return reject(error);
                });
        });
    }

    static currentValues({ filters } = {}){
        return new Promise((resolve, reject) => {
            Inventory
                .list({ filters })
                .then(result => {
                    let currentValues = result.data.reduce((accumulator, row) => {
                        if(!accumulator[row.component_id]){
                            accumulator[row.component_id] = 0;
                        }
                        
                        if(row.type){
                            accumulator[row.component_id] = accumulator[row.component_id] + Number(row.qty);
                        }else{
                            accumulator[row.component_id] = accumulator[row.component_id] - Number(row.qty);
                        }
                        
                        return accumulator;
                    }, {});

                    console.log("######## [Inventory] [currentValues] [currentValues] ", currentValues);
                    return resolve(currentValues);
                })
                .catch(error => {
                    console.log("######## [Inventory] [map] [error] ", error);

                    return reject(error);
                });
        });
    }

}


// Inventory.list();

// Inventory.edit({
//     params: {
//         id: 1,
//         name: "ROBOTO FIRM",
//         description: "This is my first Inventory",
//         phone: "8860001449"
//     }
// });

// Inventory.add({
//     params: { 
//         name: 'PCB3344',
//         party_id: 3,
//         description: 'Dsfsfdf sd dfs',
//         mountRate: '.45' 
//     }
// });

export default Inventory;