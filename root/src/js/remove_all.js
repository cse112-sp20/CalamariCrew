var rm = document.getElementById('remove_all');
var delayInMilliseconds = 1700; //1 second

function restartGif(imgElement) {
    let element = document.getElementById(imgElement);
    element.style.zIndex = 3;

    if (element) {
        var imgSrc = element.src;
        element.src = imgSrc;
    }
}

if (rm) {
    rm.addEventListener('click', () => {
        restartGif('meteor');
        setTimeout(removeAllData, delayInMilliseconds);
    });
}

function removeAllData() {
    window.localStorage.removeItem('github_username');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('raptor_name');
    // fetch('http://localhost:3000/clear');
    document.getElementById('clearAll').click();
    window.location.href = '/root/html/setup/auth.html';
}

exports.removeAllData = removeAllData;
exports.restartGif = restartGif;
