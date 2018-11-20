"use strict";

var postManSingleton = (function() {
    var postManInstance;

    var createPostMan = function() {
        var events = {};
        
        return  {
            publish: function(event, payload) {
                if(!events.hasOwnProperty(event)) {
                    return;
                }
                events[event].forEach(function(listener){
                    listener(payload || {});
                });

            },
            subscribe: function(event, listener) {
                if(!events.hasOwnProperty(event)) {
                    events[event] = [];
                }

                var index = events[event].push(listener)-1;
                return {
                    remove: function () {
                        delete events[event][index];
                    }
                }
            }
        }

    };

    return {
        getInstance: function() {
            if(!postManInstance){
                postManInstance = createPostMan();
            }
            return postManInstance;
        }
    }

}());

var postMan = postManSingleton.getInstance();

export default postMan;