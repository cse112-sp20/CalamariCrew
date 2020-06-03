var fs = require('fs');
var HTML = fs.readFileSync('root/html/index.html', 'utf8'); //might need to change to Settings

//test1
test('remove_all button clears user info in localStorage', () => {
    document.body.innerHTML = HTML;
    const removedItems = ['github_username', 'token', 'raptor_name'];
    window.localStorage.setItem('github_username', 'CalamariCrew');
    window.localStorage.setItem('token', '232435trgbrrebht');
    window.localStorage.setItem('raptor_name', 'Gary');
    require('../root/src/js/remove_all');
    document.getElementById('remove_all').click();
    var flag = true;
    removedItems.forEach(el => {
        if (localStorage.getItem(el) != null) {
            flag = false;
        }
    });
    expect(flag).toBe(true);
    jest.resetModules();
});
