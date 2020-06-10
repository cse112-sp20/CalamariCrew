import * as main from '../root/src/js/main';
var fs = require('fs');
//var HTML = fs.readFileSync('../root/html/auth.html', 'utf8');

//test 1
test('to test disabled button', () => {
    var fakeButton =  document.createElement("button");;
    main.disableButton(fakeButton);
    expect( fakeButton.disabled ).toEqual(true);
    jest.resetModules();
});

//test 2
test('to test show button', () => {
    var fakeButton =  document.createElement("button");;
    main.showButton(fakeButton);
    expect( fakeButton.disabled ).toEqual(false);
    expect( fakeButton.style.display ).toEqual('inline');
    jest.resetModules();
});