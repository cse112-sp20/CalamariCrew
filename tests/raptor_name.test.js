import { isRaptorNameValid, saveName } from '../root/src/js/raptor_name.js';
var fs = require('fs');
var HTML = fs.readFileSync('root/html/setup/raptor_name.html', 'utf8');

delete window.location;
window.location = { reload: jest.fn() };

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
describe('Raptor Name Change', () => {
    test('Raptor Name Change works', () => {
        document.body.innerHTML = HTML;
    
        // Setting before name
        localStorage.setItem('raptor_name', 'BeforeChange');
        var button = document.createElement('button');
        button.id = 'raptorNameSubmit';

        require('../root/src/js/raptor_name');
        var nameElement = document.getElementsByName('raptorName')[0];
        nameElement.value = 'AfterNameChange';
        expect(saveName()).toBe('AfterNameChange');
        

        jest.resetModules();
    })
})
