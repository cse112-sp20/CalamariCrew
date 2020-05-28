var oauthToken = localStorage.getItem('token');
var raptorName = localStorage.getItem('raptor_name');
var repo = localStorage.getItem('repository');

if (raptorName && oauthToken && repo) {
    window.location.href = '/root/html/index.html';
} else {
    async function fetchResource(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            let data = await response.text();
            return data;
        } catch (err) {
            return '';
        }
    }

    async function setResources() {
        if (!oauthToken) {
            oauthToken = await fetchResource(
                // 'http://localhost:3000/oauth/token/fetch'
                'http://localhost:3000/fetch/token'
            );
        }

        if (!raptorName) {
            raptorName = await fetchResource(
                // 'http://localhost:3000/raptor/name/fetch'
                'http://localhost:3000/fetch/raptor-name'
            );
        }
    }

    setResources().then(() => {
        if (oauthToken && raptorName && repo) {
            localStorage.setItem('token', oauthToken);
            localStorage.setItem('raptor_name', raptorName);
            localStorage.setItem('repository', repo);
            window.location.href = '/root/html/index.html';
        } else if (oauthToken && raptorName) {
            localStorage.setItem('token', oauthToken);
            localStorage.setItem('raptor_name', raptorName);
            window.location.href = '/root/html/setup/choose_repo.html';
        } else if (oauthToken) {
            localStorage.setItem('token', oauthToken);
            window.location.href = '/root/html/setup/succ_auth.html';
        }
    });
}
