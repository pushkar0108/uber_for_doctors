"use strict";

import { AsyncStorage } from "react-native";

let defaultStructure = {
    autoIncrementKey: 0,
    data: []
};
class Party {

    static add({ params }){
        console.log("#### [Party] [add] request received with params: ", params);

        return new Promise((resolve, reject) => {
            Party
                .list()
                .then((result = defaultStructure) => {

                    result.data.push(Object.assign({}, params, {
                        id: ++result.autoIncrementKey
                    }));

                    return AsyncStorage.setItem('PARTIES', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [party] [add] [response] ", response);

                    return resolve(response); 
                })
                .catch(error => {
                    console.log("######## [party] [add] [error] ", error);

                    return reject(error);
                });
        });
    }

    static edit({ params }){
        return new Promise((resolve, reject) => {
            Party
                .list()
                .then(result => {
                    let currentParty = result.data.find(party => party.id === params.id);
                    Object.assign(currentParty, params);

                    return AsyncStorage.setItem('PARTIES', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [party] [edit] [response] ", response);

                    return resolve(response);
                })
                .catch(error => {
                    console.log("######## [party] [edit] [error] ", error);

                    return reject(error);
                });
        });
    }

    static list(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('PARTIES', (error, response) => {
                if(error){
                    console.log("######## [party] [list] [error] ", error);
                    return reject(error);
                }

                response = response ? JSON.parse(response) : defaultStructure;
                console.log("######## [party] [list] [response] ", response);
                return resolve(response);
            });
        });
    }

    static map({ filters } = {}){
        return new Promise((resolve, reject) => {
            Party
                .list({ filters })
                .then(result => {
                    let partyMap = result.data.reduce((accumulator, row) => {
                        accumulator[row.id] = row;
                        return accumulator;
                    }, {});

                    console.log("######## [Party] [map] [partyMap] ", partyMap);
                    return resolve(partyMap);
                })
                .catch(error => {
                    console.log("######## [Party] [map] [error] ", error);

                    return reject(error);
                });
        });
    }

}


// Party.list();

// Party.edit({
//     params: {
//         id: 1,
//         name: "ROBOTO FIRM",
//         description: "This is my first party",
//         phone: "8860001449"
//     }
// });

// Party.add({
//     params: {
//         name: "Rohan firm",
//         description: "This is my first party",
//         phone: "8860001449"
//     }
// });

export default Party;