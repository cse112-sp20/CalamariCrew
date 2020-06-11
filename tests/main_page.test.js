var fs = require('fs');
var HTML = fs.readFileSync('root/html/index.html', 'utf8');
import * as Main from '../root/src/js/main_page.js';

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        if (typeof value === 'object') {
            this.store[key] = JSON.stringify(value);
        } else {
            this.store[key] = value.toString();
        }
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock();

const milestone1 = {
    closed_at: null,
    closed_issues: 3,
    created_at: '2020-05-28T20:23:20Z',
    creator: { login: 'lironbc', id: 36120346 },
    due_on: '2020-05-30T07:00:00Z',
    html_url: 'https://github.com/lironbc/private-test/milestone/1',
    id: 5475377,
    number: 1,
    open_issues: 2,
    state: 'open',
    title: 'It my first milestone',
    updated_at: '2020-05-30T03:24:52Z',
    url: 'https://api.github.com/repos/lironbc/private-test/milestones/1',
};

const milestone2 = {
    closed_at: null,
    closed_issues: 0,
    created_at: '2020-05-28T20:25:36Z',
    creator: { login: 'lironbc', id: 36120346 },
    due_on: '2020-06-01T07:00:00Z',
    html_url: 'https://github.com/lironbc/private-test/milestone/2',
    id: 5475381,
    labels_url:
        'https://api.github.com/repos/lironbc/private-test/milestones/2/labels',
    node_id: 'MDk6TWlsZXN0b25lNTQ3NTM4MQ==',
    number: 2,
    open_issues: 0,
    state: 'open',
    title: 'The second milestone',
    updated_at: '2020-05-28T20:25:36Z',
    url: 'https://api.github.com/repos/lironbc/private-test/milestones/2',
};

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

test('Get most recent milestone', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([milestone1, milestone2]),
        })
    );
    const testObj = { repoId: '' };
    global.JSON.parse = jest.fn(() => testObj);
    const mostRecentMilestone = await Main.getMostRecentMilestone();
    expect(mostRecentMilestone.number).toBe(1);
    jest.resetModules();
});

test('Set user', async () => {
    const mockReturnVal = { login: 'testuser' };
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockReturnVal),
        })
    );
    await Main.setUser();
    expect(localStorage.getItem('github_username')).toBe('testuser');
    jest.resetModules();
    localStorage.clear();
});

test('Get user', () => {
    localStorage.setItem('github_username', 'testuser');
    const username = Main.getUser();
    expect(username).toBe('testuser');
    jest.resetModules();
    localStorage.clear();
});

test('Fetch url', async () => {
    const mockReturnVal = 'test';
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockReturnVal),
        })
    );

    const res = await Main.fetchUrl('whatever');
    expect(res).toBe('test');
    jest.resetModules();
});

test('Display error no milestones', () => {
    document.body.innerHTML = HTML;
    global.speed = document.getElementById('div-4');
    Main.displayError(1);
    expect(speed.innerHTML).toBe(
        'Please add a new milestone to start tracking velocity.'
    );
    jest.resetModules();
});

test('Display error no issues', () => {
    document.body.innerHTML = HTML;
    global.speed = document.getElementById('div-4');
    Main.displayError(2);
    expect(speed.innerHTML).toBe(
        'Please add a new issue to start tracking velocity.'
    );
    jest.resetModules();
});

test('test num issues', () => {
    const issues = { open_issues: 2, closed_issues: 3 };
    const res = Main.getNumIssues(issues);
    expect(res).toBe(5);
    jest.resetModules();
});

test('initialize accessories', () => {
    localStorage.setItem('head', 'Crown');
    localStorage.setItem('raptor_name', 'Drake');
    Main.initAccessories();
    document.body.innerHTML = HTML;
    expect(document.getElementById('Crown').style.display).toBe('');
});

test('Set user velocity', async () => {
    const mockReturnVal = [
        { state: 'closed' },
        { state: 'closed' },
        { state: 'closed' },
        { state: 'open' },
    ];
    const mockMilestone = { number: 2 };

    document.body.innerHTML = HTML;
    global.speed = document.getElementById('div-4');
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockReturnVal),
        })
    );
    await Main.setUserVelocity(mockMilestone);
    expect(speed.innerHTML).toBe("Raptor's speed: 75km/h");
});