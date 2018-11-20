"use strict";

class CommonUtilities {
    
    static parseWsMsg(event) {
        let data;

        try {
            data = JSON.parse(event.data);
        } catch (error) {
            console.log("[WS] Error in parsing received message");
        }

        return data.text;
    }
}

export default CommonUtilities;