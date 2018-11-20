"use strict";

let baseUrl = "http://10.10.4.206:8000/api/";

export default {
    login: baseUrl + "patient/login",
    signup: baseUrl + "patient/signup",
    verifyOTP: baseUrl + "patient/otp_verify",
    requestDoc: baseUrl + "patient/doctor_request",

    me: baseUrl + "patient/me",
    getDoctorList: baseUrl + "patient/doctor_list",
    getRoomData: baseUrl + "patient/chat/messages",
    
    sendChatMessage: baseUrl + "patient/chat/send_text",
    endDoctorVisit: baseUrl + "patient/endchat",

    getInbox: baseUrl + "patient/inbox",
    getFormData: baseUrl + "patient/form"
};