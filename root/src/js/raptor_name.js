var submitButton = document.getElementById('raptorNameSubmit');

submitButton.addEventListener('click', event => {
    var raptorNameText = document.getElementsByName('raptorName')[0].value;
    console.log(document.getElementsByName('raptorName'));
    console.log(raptorNameText);
    var raptorName = {
        name: raptorNameText,
    };

    fetch('http://localhost:3000/raptor/name/set', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(raptorName),
    })
        .then(() => {
            localStorage.setItem('raptor_name', raptorNameText);
            window.location.href = '/root/html/index.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
