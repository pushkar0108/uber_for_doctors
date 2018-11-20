"use strict";

let token;

class HTTPService {

    static fetchStatus(response) {
        if (response.status >= 200 && response.status < 300) {  
            return Promise.resolve(response)  
        } else { 
            let body = {};
            try {
                body = JSON.parse(response._bodyText);
            }catch(e){}
            return Promise.reject(new Error(body.error, response.statusText))  
        } 
    }

    static fetchPost(uri, body) {
        let a = fetch(uri, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(body)
        })
        .then(HTTPService.fetchStatus)
        .then(response => response.json())
        .catch(error => {
            console.log("fetchPost error: ", error);
            return Promise.reject(error);
        });

        return a;
    }

    static fetchPatch(uri, body, appToken) {
        return fetch(uri, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify(body)
        })
        .then(HTTPService.fetchStatus)
        .then(response => response.json());
    }

    static fetchGet(uri, data) {
        console.log("[fetchGet] data.token: ", data.token);
        let y;

        if(data.token){
            y = "a " + data.token;
            y = y.replace('"', "");
            y = y.replace('"', "");

            token = y;
        }

        return fetch(uri, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
        })
        .then(HTTPService.fetchStatus)
        .then(response => response.json());
    }

}

export default HTTPService;