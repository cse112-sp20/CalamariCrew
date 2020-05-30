var submitButton = document.getElementById('raptorNameSubmit');

// const DOMPurify = require('dompurify');

function isRaptorNameValid(raptorNameText) {
    const bad_words = [
        'anal',
        'anus',
        'arse',
        'ass',
        'ballsack',
        'balls',
        'bastard',
        'bitch',
        'biatch',
        'bloody',
        'blowjob',
        'blow job',
        'bollock',
        'bollok',
        'boner',
        'boob',
        'bugger',
        'bum',
        'butt',
        'buttplug',
        'clitoris',
        'cock',
        'coon',
        'crap',
        'cunt',
        'damn',
        'dick',
        'dildo',
        'dyke',
        'fag',
        'feck',
        'fellate',
        'fellatio',
        'felching',
        'fuck',
        'f u c k',
        'fudgepacker',
        'fudge packer',
        'flange',
        'Goddamn',
        'God damn',
        'hell',
        'homo',
        'jerk',
        'jizz',
        'knobend',
        'knob end',
        'labia',
        'lmao',
        'lmfao',
        'muff',
        'nigger',
        'nigga',
        'omg',
        'penis',
        'piss',
        'poop',
        'prick',
        'pube',
        'pussy',
        'queer',
        'scrotum',
        'sex',
        'shit',
        's hit',
        'sh1t',
        'slut',
        'smegma',
        'spunk',
        'tit',
        'tosser',
        'turd',
        'twat',
        'vagina',
        'wank',
        'whore',
        'wtf',
    ];
    if (bad_words.includes(raptorNameText.trim().toLowerCase())) {
        // alert('Name must be appropriate');
        return false;
    }
}
submitButton.addEventListener('click', event => {
    var raptorNameText = document.getElementsByName('raptorName')[0].value;

    if (!isRaptorNameValid(raptorNameText)) {
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
