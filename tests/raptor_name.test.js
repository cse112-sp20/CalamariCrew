import { isRaptorNameValid } from '../root/src/js/raptor_name.js';
var fs = require('fs');
var HTML = fs.readFileSync('root/html/setup/raptor_name.html', 'utf8');

describe('Raptor Name Page', () => {
    test('Raptor Name Filter works true', () => {
        document.body.innerHTML = HTML;
        require('../root/src/js/raptor_name');
        const raptorName = 'Fun Bot';
        expect(isRaptorNameValid(raptorName)).toBe(true);
        jest.resetModules();
    });

    test('Raptor Name Filter works false', () => { 
        document.body.innerHTML = HTML;
        require('../root/src/js/raptor_name');
        const listOfBadWords = ['fuck', 'shit', 'ass', '  piss  '];
        var i;
        for (i = 0; i < listOfBadWords.length; i++) {
            const raptorName = listOfBadWords[i];
            expect(isRaptorNameValid(raptorName)).toBe(false);
        }
        jest.resetModules();
    });
});
