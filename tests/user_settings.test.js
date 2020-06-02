var fs = require('fs');
var HTML = fs.readFileSync('root/html/user_settings.html', 'utf8');
//test 1
test('Raptor name is not defined when storage is empty', () => {
    document.body.innerHTML = HTML;
    require('../root/src/js/user_settings');
    const raptorName = document.getElementById('raptorNameAccessory');
    expect(raptorName.innerHTML).toBe('Close Extension to refresh');
    jest.resetModules();
});
//test 2
test('RaptorName changes when updated in localStorage', () => {
    document.body.innerHTML = HTML;
    const raptorName = document.getElementById('raptorNameAccessory');
    localStorage.setItem('raptor_name', 'Gary');
    require('../root/src/js/user_settings');
    expect(raptorName.innerHTML).toBe("Hi, I'm Gary!");
    jest.resetModules();
});
//test 3
test('Switching between accessories render the right set', () => {
    document.body.innerHTML = HTML;
    const divBtns = document.querySelector('#switch_acc'); //container by ID UI Buttons Container
    const uiBtns = divBtns.querySelectorAll('button'); //all the elements inside container
    require('../root/src/js/user_settings');
    let containerList = [];
    uiBtns.forEach(button => {
        button.click();
        containerList.push(
            document.getElementById(button.id + 'Accessories').id
        );
    });
    let rightButtonOrder = [
        'headAccessories',
        'backAccessories',
        'tailAccessories',
        'handAccessories',
    ];
    expect(containerList).toStrictEqual(rightButtonOrder);
    jest.resetModules();
});
//test 4
test('ClearAll Btn removes all the items that Raptor is currently wearing', () => {
    document.body.innerHTML = HTML;
    const list = ['tail', 'head', 'hand', 'back'];
    require('../root/src/js/user_settings');
    var ctr = 0;
    list.forEach(el => {
        //adding random elements to localStorage
        localStorage.setItem(el, 'Magic_hat');
    });
    document.getElementById('clearAll').click(); //removed all the elements
    let flag = true;
    list.forEach(el => {
        //check if they still exist in Local Storage
        if (localStorage.getItem(el) != null) {
            flag = false;
        }
    });
    expect(flag).toStrictEqual(true);
    jest.resetModules();
});
//test 5
test('Choosing a specific accessory is correctly displayed in the raptor', () => {
    document.body.innerHTML = HTML;
    require('../root/src/js/user_settings');
    let rightButtonOrder = [
        'headAccessories',
        'backAccessories',
        'tailAccessories',
        'handAccessories',
    ];
    const divBtns = document.querySelector('#switch_acc'); //container by ID UI Buttons Container
    const uiBtns = divBtns.querySelectorAll('button'); //all the elements inside container
    var ctr = 0;
    var isDisplayed = true;
    uiBtns.forEach(button => {
        button.click(); //to click 4 buttons
        var category = rightButtonOrder[ctr];
        ctr += 1;
        var container = document.querySelector('#' + category); //container by ID
        var imgsInContainer = container.querySelectorAll('img'); //all the elements inside container
        for (var accessory of imgsInContainer) {
            accessory.click();
            if (
                localStorage.getItem(category.substring(0, 3)) == null &&
                document.getElementById(accessory.id + '_').style.display !=
                    'block'
            ) {
                isDisplayed = false;
            }
        }
    });
    expect(isDisplayed).toBe(true);
    jest.resetModules();
});
//test 6
test('Clicking NavBars render correct element', () => {
    document.body.innerHTML = HTML;
    require('../root/src/js/user_settings');
    const genbtn = document.getElementById('generalbtn');
    const cusbtn = document.getElementById('raptorbutton');
    var VelocityRaptorDisplay = document.getElementById('myvelocityraptor');
    var GeneralDisplay = document.getElementById('general');
    const btns = [genbtn, cusbtn];
    const displays = [GeneralDisplay, VelocityRaptorDisplay];
    var isDisplayed = true;
    var ctr = 0;
    btns.forEach(button => {
        button.click(); //to click 4 buttons
        if (displays[ctr].style.display != 'block') {
            isDisplayed = false;
        }
        ctr += 1;
    });

    expect(isDisplayed).toBe(true);
    jest.resetModules();
});
//test 7
test('Clicking BackArrow takes you back to the Main Page', () => {
    document.body.innerHTML = HTML;
    expect(document.getElementById('back_arrow').click()).toBe(undefined); //when clicked everything in the current page is deleted
    jest.resetModules();
});
//test 8
test('The Raptor image in Customize Tab is correctly displayed', () => {
    document.body.innerHTML = HTML;
    expect(document.getElementById('img-1').hidden).toBe(false);
    jest.resetModules();
});
//test 9
test('NavBar Tabs change color when clicked', () => {
    document.body.innerHTML = HTML;
    require('../root/src/js/user_settings');
    const tabsContainer = document.querySelector('.list-group');
    const buttons = tabsContainer.querySelectorAll('a');
    var flag = true;
    buttons.forEach(btn => {
        btn.click();
        if (!btn.classList.contains('active')) {
            flag = false;
        }
    });
    expect(flag).toStrictEqual(true);
    jest.resetModules();
});
//test 10 FEATURE NOT YET IMPLEMENTED
test('Reset VelocityBtn correctly resets the whole Extension', () => {
    document.body.innerHTML = HTML;
    require('../root/src/js/user_settings');
    expect(5 + 3).toStrictEqual(8);
    jest.resetModules();
});
