"use strict";

import { AsyncStorage } from "react-native";

let defaultStructure = {
    autoIncrementKey: 0,
    data: []
};

class Payments {

    static add({ params }){
        console.log("#### [Payments] [add] request received with params: ", params);

        return new Promise((resolve, reject) => {
            Payments
                .list()
                .then((result = defaultStructure) => {

                    result.data.push(Object.assign({}, params, {
                        id: ++result.autoIncrementKey
                    }));

                    return AsyncStorage.setItem('PAYMENTS', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [Payments] [add] [response] ", response);

                    return resolve(response); 
                })
                .catch(error => {
                    console.log("######## [Payments] [add] [error] ", error);

                    return reject(error);
                });
        });
    }

    static edit({ params }){
        console.log("#### [Payments] [edit] request received with params: ", params);

        return new Promise((resolve, reject) => {
            Payments
                .list()
                .then(result => {
                    let currentPayment = result.data.find(payment => payment.id === params.id);
                    Object.assign(currentPayment, params);

                    return AsyncStorage.setItem('PAYMENTS', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [Payments] [edit] [response] ", response);

                    return resolve(response);
                })
                .catch(error => {
                    console.log("######## [Payments] [edit] [error] ", error);

                    return reject(error);
                });
        });
    }

    static list({ filters } = {}){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('PAYMENTS', (error, response) => {

                if(error){
                    console.log("######## [Payments] [list] [error] ", error);
                    return reject(error);
                }

                response = response ? JSON.parse(response) : defaultStructure;
                console.log("######## [Payments] [list] [response] ", response);

                if(filters && filters.party_id && response){
                    response.data = response.data.filter(payment => {
                        return payment.party_id === filters.party_id;
                    });
                }

                return resolve(response);
            });
        });
    }

    static map({ filters } = {}){
        return new Promise((resolve, reject) => {
            Payments
                .list({ filters })
                .then(result => {
                    let componentMap = result.data.reduce((accumulator, row) => {
                        accumulator[row.id] = row;
                        return accumulator;
                    }, {});

                    console.log("######## [Payments] [map] [paymentMap] ", componentMap);
                    return resolve(componentMap);
                })
                .catch(error => {
                    console.log("######## [Payments] [map] [error] ", error);

                    return reject(error);
                });
        });
    }

}


// Payments.list();

// Payments.edit({
//     params: {
//         id: 1,
//         name: "ROBOTO FIRM",
//         description: "This is my first Payments",
//         phone: "8860001449"
//     }
// });

// Payments.add({
//     params: { 
//         name: 'PCB3344',
//         party_id: 3,
//         description: 'Dsfsfdf sd dfs',
//         mountRate: '.45' 
//     }
// });

export default Payments;