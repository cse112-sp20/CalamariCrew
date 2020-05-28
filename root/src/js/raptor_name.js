var submitButton = document.getElementById('raptorNameSubmit');

submitButton.addEventListener('click', event => {
    const raptorName = document.getElementsByName('raptorName')[0].value;
    //console.log(document.getElementsByName('raptorName'));
    //console.log(raptorNameText);
    localStorage.setItem('raptor_name', raptorName);
    window.location.href = '/root/html/setup/choose_repo.html';

    // var raptorName = {
    //     name: raptorNameText,
    // };

    // fetch('http://localhost:3000/raptor/name/set', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(raptorName),
    // })
    //     .then(() => {
    //         localStorage.setItem('raptor_name', raptorNameText);
    //         window.location.href = '/root/html/setup/choose_repo.html';
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
});
