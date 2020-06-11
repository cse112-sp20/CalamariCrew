var gh = (function() {
    'use strict';
    var signin_button;
    var tokenFetcher = (function() {
        // Replace clientId and clientSecret with values obtained by you for your
        // application https://github.com/settings/applications.
        var clientId = '0643ae6f6ee7a227b34b';
        // Note that in a real-production app, you may not want to store
        // clientSecret in your App code.
        var clientSecret = '77ac50effc036ac693d07008dc365f2b9b9c3e73';
        var redirectUri = chrome?.identity?.getRedirectURL('');
        var redirectRe = new RegExp(redirectUri + '[#?](.*)');

        var access_token = null;

        return {
            getToken: function(interactive, callback) {
                var options = {
                    interactive: interactive,
                    url:
                        'https://github.com/login/oauth/authorize' +
                        '?client_id=' +
                        clientId +
                        '&scope=repo' +
                        '&redirect_uri=' +
                        encodeURIComponent(redirectUri),
                };
                chrome.identity.launchWebAuthFlow(options, function(
                    redirectUri
                ) {
                    console.log(
                        'launchWebAuthFlow completed',
                        chrome.runtime.lastError,
                        redirectUri
                    );

                    if (chrome.runtime.lastError) {
                        callback(new Error(chrome.runtime.lastError));
                        return;
                    }

                    // Upon success the response is appended to redirectUri, e.g.
                    // https://{app_id}.chromiumapp.org/provider_cb#access_token={value}
                    //     &refresh_token={value}
                    // or:
                    // https://{app_id}.chromiumapp.org/provider_cb#code={value}
                    var matches = redirectUri.match(redirectRe);
                    if (matches && matches.length > 1)
                        handleProviderResponse(
                            parseRedirectFragment(matches[1])
                        );
                    else callback(new Error('Invalid redirect URI'));
                });

                function parseRedirectFragment(fragment) {
                    var pairs = fragment.split(/&/);
                    var values = {};

                    pairs.forEach(function(pair) {
                        var nameval = pair.split(/=/);
                        values[nameval[0]] = nameval[1];
                    });

                    return values;
                }

                function handleProviderResponse(values) {
                    console.log('providerResponse', values);
                    if (values.hasOwnProperty('access_token'))
                        setAccessToken(values.access_token);
                    // If response does not have an access_token, it might have the code,
                    // which can be used in exchange for token.
                    else if (values.hasOwnProperty('code'))
                        exchangeCodeForToken(values.code);
                    else
                        callback(
                            new Error(
                                'Neither access_token nor code avialable.'
                            )
                        );
                }

                function exchangeCodeForToken(code) {
                    var xhr = new XMLHttpRequest();
                    xhr.open(
                        'GET',
                        'https://github.com/login/oauth/access_token?' +
                            'client_id=' +
                            clientId +
                            '&client_secret=' +
                            clientSecret +
                            '&redirect_uri=' +
                            redirectUri +
                            '&code=' +
                            code
                    );
                    xhr.setRequestHeader(
                        'Content-Type',
                        'application/x-www-form-urlencoded'
                    );
                    xhr.setRequestHeader('Accept', 'application/json');
                    xhr.onload = function() {
                        // When exchanging code for token, the response comes as json, which
                        // can be easily parsed to an object.
                        if (this.status === 200) {
                            var response = JSON.parse(this.responseText);
                            console.log(response);
                            if (response.hasOwnProperty('access_token')) {
                                setAccessToken(response.access_token);
                            } else {
                                callback(
                                    new Error(
                                        'Cannot obtain access_token from code.'
                                    )
                                );
                            }
                        } else {
                            console.log('code exchange status:', this.status);
                            callback(new Error('Code exchange failed'));
                        }
                    };
                    xhr.send();
                }

                function setAccessToken(token) {
                    access_token = token;
                    console.log('Setting access_token: ', access_token);
                    localStorage.setItem('token', access_token);
                    window.location.href = '/root/html/setup/raptor_name.html';
                }
            },

            removeCachedToken: function(token_to_remove) {
                if (access_token == token_to_remove) access_token = null;
            },
        };
    })();
    /*
    function xhrWithAuth(method, url, interactive, callback) {
        var retry = true;
        var access_token;

        console.log('xhrWithAuth', method, url, interactive);
        getToken();

        function getToken() {
            tokenFetcher.getToken(interactive, function(error, token) {
                console.log('token fetch', error, token);
                if (error) {
                    callback(error);
                    return;
                }

                access_token = token;
                requestStart();
            });
        }

        function requestStart() {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
            xhr.onload = requestComplete;
            xhr.send();
        }

        function requestComplete() {
            console.log('requestComplete', this.status, this.response);
            if ((this.status < 200 || this.status >= 300) && retry) {
                retry = false;
                tokenFetcher.removeCachedToken(access_token);
                access_token = null;
                getToken();
            } else {
                callback(null, this.status, this.response);
            }
        }
    }
    */
    // Functions updating the User Interface:
    /*
    function showButton(button) {
        button.style.display = 'inline';
        button.disabled = false;
    }
    */
    /*
    function hideButton(button) {
        button.style.display = 'none';
    }
    */
    /*
    function disableButton(button) {
        button.disabled = true;
    }
    */
    // Handlers for the buttons's onclick events.
    function interactiveSignIn() {
        disableButton(signin_button);
        tokenFetcher.getToken(true, function(error, access_token) {
            if (error) {
                showButton(signin_button);
            }
        });
    }

    /*
        UNUSED FOR NOW. BUT IF WE WANT TO ALLOW USERS TO SIGN OUT, THIS IS
        HOW WE WOULD DO IT.
     */
    /*
    function revokeToken() {
        // We are opening the web page that allows user to revoke their token.
        window.open('https://github.com/settings/applications');
        // And then clear the user interface, showing the Sign in button only.
        // If the user revokes the app authorization, they will be prompted to log
        // in again. If the user dismissed the page they were presented with,
        // Sign in button will simply sign them in.
        user_info_div.textContent = '';
        hideButton(revoke_button);
        showButton(signin_button);
    }
    */
    return {
        //show signin button and allow login on click.
        onload: function() {
            //skip login screen if you already have necessary authentication
            let oauthToken = localStorage.getItem('token');
            let raptorName = localStorage.getItem('raptor_name');
            let repo = localStorage.getItem('repository');
            storeAndredirect(oauthToken, raptorName, repo);
            signin_button = document.querySelector('#signin');
            signin_button.onclick = interactiveSignIn;
            showButton(signin_button);
        },
    };
})();

export function disableButton(button) {
    button.disabled = true;
}

export function showButton(button) {
    button.style.display = 'inline';
    button.disabled = false;
}

export function storeAndredirect(oauthToken, raptorName, repo) {
    if (oauthToken && raptorName && repo) {
        localStorage.setItem('token', oauthToken);
        localStorage.setItem('raptor_name', raptorName);
        localStorage.setItem('repository', repo);
        window.location.href = '/root/html/index.html';
    } else if (oauthToken && raptorName) {
        localStorage.setItem('raptor_name', raptorName);
        localStorage.setItem('token', oauthToken);
        window.location.href = '/root/html/setup/choose_repo.html';
    } else if (oauthToken) {
        localStorage.setItem('token', oauthToken);
        window.location.href = '/root/html/setup/raptor_name.html';
    }
}

window.onload = gh.onload;
