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
    };
})();
