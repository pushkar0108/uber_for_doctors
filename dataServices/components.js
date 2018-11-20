"use strict";

import { AsyncStorage } from "react-native";

let defaultStructure = {
    autoIncrementKey: 0,
    data: []
};
class Components {

    static add({ params }){
        console.log("#### [Components] [add] request received with params: ", params);

        params.mountRate = Number(params.mountRate);

        return new Promise((resolve, reject) => {
            Components
                .list()
                .then((result = defaultStructure) => {

                    result.data.push(Object.assign({}, params, {
                        id: ++result.autoIncrementKey
                    }));

                    return AsyncStorage.setItem('COMPONENTS', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [Components] [add] [response] ", response);

                    return resolve(response); 
                })
                .catch(error => {
                    console.log("######## [Components] [add] [error] ", error);

                    return reject(error);
                });
        });
    }

    static edit({ params }){
        console.log("#### [Components] [edit] request received with params: ", params);

        params.mountRate = Number(params.mountRate);

        return new Promise((resolve, reject) => {
            Components
                .list()
                .then(result => {
                    let currentComponent = result.data.find(component => component.id === params.id);
                    Object.assign(currentComponent, params);

                    return AsyncStorage.setItem('COMPONENTS', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [Components] [edit] [response] ", response);

                    return resolve(response);
                })
                .catch(error => {
                    console.log("######## [Components] [edit] [error] ", error);

                    return reject(error);
                });
        });
    }

    static list({ filters } = {}){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('COMPONENTS', (error, response) => {

                if(error){
                    console.log("######## [Components] [list] [error] ", error);
                    return reject(error);
                }

                response = response ? JSON.parse(response) : defaultStructure;
                console.log("######## [Components] [list] [response] ", response);

                if(filters && filters.party_id && response){
                    response.data = response.data.filter(component => {
                        return component.party_id === filters.party_id;
                    });
                }

                return resolve(response);
            });
        });
    }

    static map({ filters } = {}){
        return new Promise((resolve, reject) => {
            Components
                .list({ filters })
                .then(result => {
                    let componentMap = result.data.reduce((accumulator, row) => {
                        accumulator[row.id] = row;
                        return accumulator;
                    }, {});

                    console.log("######## [Components] [map] [componentMap] ", componentMap);
                    return resolve(componentMap);
                })
                .catch(error => {
                    console.log("######## [Components] [map] [error] ", error);

                    return reject(error);
                });
        });
    }

}


// Components.list();

// Components.edit({
//     params: {
//         id: 1,
//         name: "ROBOTO FIRM",
//         description: "This is my first Components",
//         phone: "8860001449"
//     }
// });

// Components.add({
//     params: { 
//         name: 'PCB3344',
//         party_id: 3,
//         description: 'Dsfsfdf sd dfs',
//         mountRate: '.45' 
//     }
// });

export default Components;