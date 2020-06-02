var fs = require('fs');
var HTML = fs.readFileSync('root/html/raptor_name.html', 'utf8');

describe('Raptor Name Page', () => {
    test('Raptor Name Filter works true', () => {
        document.body.innerHTML = HTML;
        require('../raptor_name');
        const raptorName = 'Fun Bot';
        expect(isRaptorNameValid(raptorName)).toBe(true);
        jest.resetModules();
    });

    test('Raptor Name Filter works false', () => {
        document.body.innerHTML = HTML;
        require('../raptor_name');
        listOfBadWords = ['fu ck', 'shit', 'ass', '  pis s  '];
        for (i = 0; i < listOfBadWords.length; i++) {
            const raptorName = listOfBadWords[i];
            expect(isRaptorNameValid(raptorName)).toBe(false);
        }
        jest.resetModules();
    });
});
