var fs = require('fs');
var HTML = fs.readFileSync('root/html/index.html', 'utf8');

//test 1
test('Raptor name is not defined if user has not logged into github', () => {
    document.body.innerHTML = HTML;
    var raptorName = document.getElementById('userVelocityRaptorName');
    require('../root/src/js/main_page');
    expect(raptorName.innerHTML).toStrictEqual('');
    jest.resetModules();
});

//test 2
test('If LocalStorage is empty raptor should not have accessories', () => {
    document.body.innerHTML = HTML;
    //var raptorName = document.getElementById('userVelocityRaptorName');
    require('../root/src/js/main_page'); //localstorage is empty
    var flag = true;
    var images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.style.display == 'block') {
            flag = false;
        }
    });
    expect(flag).toStrictEqual(true);
    jest.resetModules();
});
