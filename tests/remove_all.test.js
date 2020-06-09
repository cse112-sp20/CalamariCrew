import { removeAllData, restartGif } from '../root/src/js/remove_all.js';
var fs = require('fs');
var HTML = fs.readFileSync('root/html/user_settings.html', 'utf8');

delete window.location;
window.location = { reload: jest.fn() };


describe('Remove All Test', () => {
    test('Remove All Works', () => {
        document.body.innerHTML = HTML;
        localStorage.setItem('github_username', 'test_username')
        localStorage.setItem('token', 'test_token')
        localStorage.setItem('raptor_name', 'test_name');
        // Setting before name

        var clearButton = document.getElementById('clearAll');
        var clearButtonClicked = false;
        clearButton.addEventListener('click', () => {
            clearButtonClicked = true;
        })      
        removeAllData();
        // Verify that these items have been deleted
        expect(localStorage.getItem('github_username')).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('raptor_name')).toBeNull();
        // Trigger to clear accessories has been sent
        expect(clearButtonClicked).toBe(true);

        jest.resetModules();
    })
    
})
describe('Restart Gif Test', () => {
    test('Restart Gif Works', () => {
        document.body.innerHTML = HTML;
        var imageId = 'meteor';
        restartGif(imageId);
        var image = document.getElementById(imageId);
        // Check if image has been brought to the foreground
        expect(image.style.zIndex).toBe('3');
    })
})

