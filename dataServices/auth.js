"use strict";

import { AsyncStorage } from "react-native";

import HTTPService from "../utils/httpService";
import Endpoints from "../utils/endpoints";

class Auth {

    static login({ body }){
        console.log("#### [Auth] [login] request received with body: ", body);

        return HTTPService.fetchPost(Endpoints.login, body)
            .then(result => {
                console.log('#### [Auth] [login] success:', result);
                AsyncStorage.setItem('TOKEN', JSON.stringify(result.token));
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [login] error:', error);
                return Promise.reject(error);
            });
    }

    static signup({ body }){
        console.log("#### [Auth] [signup] request received with body: ", body);

        return HTTPService.fetchPost(Endpoints.signup, body)
            .then(result => {
                console.log('#### [Auth] [signup] success:', result);
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [signup] error:', error);
                return Promise.reject(error);
            });
    }

    static verifyOTP({ body }){
        console.log("#### [Auth] [verifyOTP] request received with body: ", body);

        return HTTPService.fetchPost(Endpoints.verifyOTP, body)
            .then(result => {
                console.log('#### [Auth] [verifyOTP] success:', result);
                AsyncStorage.setItem('TOKEN', JSON.stringify(result.token));
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [verifyOTP] error:', error);
                return Promise.reject(error);
            });
    }

    static requestDoc({ body }){
        console.log("#### [Auth] [requestDoc] request received with body: ", body);

        return HTTPService.fetchPost(Endpoints.requestDoc, body)
            .then(result => {
                console.log('#### [Auth] [requestDoc] success:', result);
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [requestDoc] error:', error);
                return Promise.reject(error);
            });
    }

    static endDoctorVisit({ body }){
        console.log("#### [Auth] [endDoctorVisit] request received with body: ", body);

        return HTTPService.fetchPost(Endpoints.endDoctorVisit, body)
            .then(result => {
                console.log('#### [Auth] [endDoctorVisit] success:', result);
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [endDoctorVisit] error:', error);
                return Promise.reject(error);
            });
    }

    static sendChatMessage({ body }){
        console.log("#### [Auth] [sendChatMessage] request received with body: ", body);

        return HTTPService.fetchPost(Endpoints.sendChatMessage, body)
            .then(result => {
                console.log('#### [Auth] [sendChatMessage] success:', result);
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [sendChatMessage] error:', error);
                return Promise.reject(error);
            });
    }

    static getUserDetails(){
        console.log("#### [Auth] [getUserDetails] request : ");

        return Auth.getToken()
            .then(token => {
                return HTTPService.fetchGet(Endpoints.me, {
                    token: token
                });
            })
            .then(result => {
                console.log('#### [Auth] [getUserDetails] success:', result);
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [getUserDetails] error:', error);
                return Promise.reject(error);
            });
    }

    static getInbox(){
        console.log("#### [Auth] [getInbox] request received: ");

        return HTTPService.fetchGet(Endpoints.getInbox, {})
            .then(result => {
                console.log('#### [Auth] [getInbox] success:', result);
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [getInbox] error:', error);
                return Promise.reject(error);
            });
    }

    static getFormData({ params }){
        console.log("#### [Auth] [getFormData] request params: ", params);
        let url = Endpoints.getFormData + "?form_id=" + params.formId;

        return HTTPService.fetchGet(url, params)
            .then(result => {
                console.log('#### [Auth] [getFormData] success:', result);
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [getFormData] error:', error);
                return Promise.reject(error);
            });
    }

    static getDoctorList({ params }){
        console.log("#### [Auth] [getDoctorList] request params: ", params);

        return HTTPService.fetchGet(Endpoints.getDoctorList, params)
            .then(result => {
                console.log('#### [Auth] [getDoctorList] success:', result);
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [getDoctorList] error:', error);
                return Promise.reject(error);
            });
    }

    static getRoomData({ roomId, params }){
        console.log("#### [Auth] [getRoomData] request params: ", params);
        let url = Endpoints.getRoomData + "?roomId=" + roomId;

        return HTTPService.fetchGet(url, params)
            .then(result => {
                console.log('#### [Auth] [getRoomData] success:', result);
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [getRoomData] error:', error);
                return Promise.reject(error);
            });
    }

    static getToken() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('TOKEN', (error, response) => {
                console.log("33333333333 error, response: ", error, response);
                if(error || !response){
                    console.log("######## [Auth] [getToken] [error] ", error);
                    return reject(error);
                }

                console.log("response token type: ", typeof response);
                console.log("response token : ",  "a ".concat(response));
                console.log("######## [Auth] [getToken] [response] ", response.slice(1, -1));
                return resolve(response);
            });
        });
    }

    static updateUserDetails({ body }){
        console.log("#### [Auth] [updateUserDetails] request body: ", body);

        return Auth.getToken()
            .then(token => {
                return HTTPService.fetchPatch(Endpoints.me, body, token);
            })
            .then(result => {
                console.log('#### [Auth] [updateUserDetails] success:', result);
                return result;
            })
            .catch(error => {
                console.log('#### [Auth] [updateUserDetails] error:', error);
                return Promise.reject(error);
            });
    }

}

export default Auth;