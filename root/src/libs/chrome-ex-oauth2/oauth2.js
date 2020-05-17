/**
* ChromeAuth2 is an open-source library created by https://github.com/jjNford
* with contributions and branding by https://github.com/whoisjuan
*
* Redistribution of this work, with or without modification, is permitted if
* proper attributions to the original author and main contributors are added.
* The orginal author and main contributors encourage the use of their work but 
* do not endorse any specific project in which their work is used.


*Copyright-2017 2012: Original Author, JJ Ford and Contributor, Juan J Ramirez.

*Licensed under the Apache License, Version 2.0 (the "License");
*you may not use this file except in compliance with the License.
*You may obtain a copy of the License at

   	*http://www.apache.org/licenses/LICENSE-2.0
*/
//var crypto = require('crypto');

(function() {
    window.oauth2 = {
        access_token_url: 'https://github.com/login/oauth/access_token',
        authorization_url: 'https://github.com/login/oauth/authorize',
        client_id: '7bcb36f5f81ae16c2808',
        client_secret: '8335a4acc7f2b01a8464d0616f146b7024cd8f93',
        redirect_url: 'http://localhost:3000/oauth/register',
        scopes: ['repo'],
        //state: crypto.randomBytes(8).toString('hex'),
        //'Administration', 'Contents', 'Issues', 'Metadata', 'Members'
        key: 'oauth2_token',

        /**
         * Starts the authorization process.
         */
        start: function() {
            window.close();
            const url =
                this.authorization_url +
                '?client_id=' +
                this.client_id +
                '&scope=repo' +
                '&redirect_uri' +
                this.redirect_url;
            chrome.tabs.create({ url: url, active: true });
        },

        /**
         * Finishes the oauth2 process by exchanging the given authorization code for an
         * authorization token. The authroiztion token is saved to the browsers local storage.
         * If the redirect page does not return an authorization code or an error occures when
         * exchanging the authorization code for an authorization token then the oauth2 process dies
         * and the authorization tab is closed.
         *
         * @param url The url of the redirect page specified in the authorization request.
         */
        finish: function(url) {
            function removeTab() {
                chrome.tabs.getCurrent(function(tab) {
                    chrome.tabs.remove(tab.id);
                });
            }

            if (url.match(/\?error=(.+)/)) {
                removeTab();
            } else {
                var code = url.match(/\?code=([\w\/\-]+)/)[1];

                var that = this;
                var data = new FormData();
                data.append('client_id', this.client_id);
                data.append('client_secret', this.client_secret);
                data.append('code', code);

                // Send request for authorization token.
                var xhr = new XMLHttpRequest();
                xhr.addEventListener('readystatechange', function(event) {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            if (xhr.responseText.match(/error=/)) {
                                removeTab();
                            } else {
                                // Parsing JSON Response.
                                var response = xhr.responseText;
                                var jsonResponse = JSON.parse(response);
                                // Replace "access_token" with the parameter
                                // relevant to the API you're using.
                                var tokenOauth = jsonResponse.access_token;
                                var obj = { token: tokenOauth };
                                // Storing in Chrome Local Storage.
                                chrome.storage.local.set(obj, function() {
                                    // Notify that we saved.
                                    console.log('oAuth Token saved');
                                });
                                removeTab();
                            }
                        } else {
                            removeTab();
                        }
                    }
                });
                xhr.open('POST', this.access_token_url, true);
                //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
                //xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                //xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept');
                xhr.send(data);
            }
        },

        /**
         * Retreives the authorization token from Chrome Storage.
         */
        getToken: function() {
            chrome.storage.local.get('token', function(result) {
                return result.token;
            });
        },

        /**
         * Clears the authorization token from the Chrome storage.
         */
        clearToken: function() {
            chrome.storage.local.remove('token', function() {
                console.log('Token Cleared');
            });
        },
    };
})();
