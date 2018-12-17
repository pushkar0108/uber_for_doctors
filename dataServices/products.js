"use strict";

import { AsyncStorage } from "react-native";

let defaultStructure = {
    autoIncrementKey: 0,
    data: []
};

class Products {

    static add({ params }){
        console.log("#### [Products] [add] request received with params: ", params);

        return new Promise((resolve, reject) => {
            Products
                .list()
                .then((result = defaultStructure) => {

                    result.data.push(Object.assign({}, params, {
                        id: ++result.autoIncrementKey
                    }));

                    return AsyncStorage.setItem('PRODUCTS', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [Products] [add] [response] ", response);

                    return resolve(response); 
                })
                .catch(error => {
                    console.log("######## [Products] [add] [error] ", error);

                    return reject(error);
                });
        });
    }

    static edit({ params }){
        return new Promise((resolve, reject) => {
            Products
                .list()
                .then(result => {
                    let currentProduct = result.data.find(product => product.id === params.id);
                    Object.assign(currentProduct, params);

                    return AsyncStorage.setItem('PRODUCTS', JSON.stringify(result));
                })
                .then(response => {
                    console.log("######## [Products] [edit] [response] ", response);

                    return resolve(response);
                })
                .catch(error => {
                    console.log("######## [Products] [edit] [error] ", error);

                    return reject(error);
                });
        });
    }

    static list({ filters } = {}){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('PRODUCTS', (error, response) => {

                if(error){
                    console.log("######## [Products] [list] [error] ", error);
                    return reject(error);
                }

                response = response ? JSON.parse(response) : defaultStructure;
                console.log("######## [Products] [list] [response] ", response);
                
                if(filters && filters.party_id && response){
                    response.data = response.data.filter(product => {
                        return product.party_id === filters.party_id;
                    });
                }

                response.data.reverse();
                return resolve(response);
            });
        });
    }

    static map({ filters } = {}){
        return new Promise((resolve, reject) => {
            Products
                .list({filters})
                .then(result => {
                    let productMap = result.data.reduce((accumulator, row) => {
                        accumulator[row.id] = row;
                        return accumulator;
                    }, {});

                    console.log("######## [Products] [map] [productMap] ", productMap);
                    return resolve(productMap);
                })
                .catch(error => {
                    console.log("######## [Products] [map] [error] ", error);

                    return reject(error);
                });
        });
    }

}


// Products.list();

// Products.edit({
//     params: {
//         id: 1,
//         name: "ROBOTO FIRM",
//         description: "This is my first Products",
//         phone: "8860001449"
//     }
// });

// Products.add({
//     params: { 
//         name: 'PCB3344',
//         party_id: 3,
//         description: 'Dsfsfdf sd dfs',
//         mountRate: '.45' 
//     }
// });

export default Products;