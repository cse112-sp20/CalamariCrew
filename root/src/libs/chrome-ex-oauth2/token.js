var oauthToken = localStorage.getItem('token');

if (!oauthToken) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let token = xhttp.responseText;
            localStorage.setItem('token', token);
        } else if (this.readyState == 4 && this.status != 200) {
            window.location.href = "/root/html/auth.html";
        }
    };

    xhttp.open("GET", 'http://localhost:3000/oauth/token/fetch', true);

    xhttp.send();
}