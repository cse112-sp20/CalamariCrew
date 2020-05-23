var submitButton = document.getElementById('raptorNameSubmit');
// import Filter from 'bad-words';

submitButton.addEventListener('click', event => {
    var raptorNameText = document.getElementsByName('raptorName')[0].value;
    // filter = new Filter();
    // if (filter.isProfane("Fuck")) {
    //     alert("Name must be appropriate");
    //     return false;
    // }
    const bad_words = ['FUCK', 'FK', 'SHIT', 'ASS'];
    if (bad_words.includes(raptorNameText.trim().toUpperCase())) {
        alert('Name must be appropriate');
        return false;
    }
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
