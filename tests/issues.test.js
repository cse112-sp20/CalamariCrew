require('jest-fetch-mock').enableMocks();

import * as issues from '../root/src/js/github/issues';

var fs = require('fs');
var HTML = fs.readFileSync('root/html/index.html', 'utf8');

const fakeToken = 'dead-beef';
const fakeRepo = '{"repoId":"Build","issueUrl":"https://example.com"}';
const fakeUsername = 'fake-username';

const filteredIssues = [
    {
        title: 'title-1',
        number: 1,
        html_url: 'title-1.html',
        assignee: 'nub-scrub',
        assignees: [
            {
                login: 'fake-username',
            },
        ],
    },
    {
        title: 'title-2',
        number: 2,
        html_url: 'title-2.html',
        assignee: 'nub-scrub',
        assignees: [
            {
                login: 'fake-username',
            },
        ],
    },
];

const unfilteredIssues = [
    {
        title: 'title-1',
        number: 1,
        html_url: 'title-1.html',
        assignee: 'nub-scrub',
        assignees: [
            {
                login: 'fake-username',
            },
        ],
    },
    {
        title: 'title-2',
        number: 2,
        html_url: 'title-2.html',
        assignee: 'nub-scrub',
        assignees: [
            {
                login: 'fake-username',
            },
        ],
    },
    {
        title: 'title-3',
        number: 3,
        html_url: 'title-3.html',
        assignee: 'nub-scrub',
        assignees: [
            {
                login: 'loooool',
            },
        ],
    },
];

//test 1
test('Fetch and return token when token is found', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem');
    spy.mockReturnValue(fakeToken);

    let fetchedToken = issues.fetchToken();
    expect(spy).toBeCalledWith('token');
    expect(fetchedToken).toBe(fakeToken);

    jest.resetModules();
});

// test 2
test('Throw error when token is not found', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem');
    spy.mockReturnValue(undefined);

    try {
        issues.fetchToken();
    } catch (err) {
        expect(spy).toBeCalledWith('token');
        expect(err).toMatch('No token found');
    }

    jest.resetModules();
});

//test 3
test('Fetch and return repository when repository is found', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem');
    spy.mockReturnValue(fakeRepo);

    let fetchedRepo = issues.fetchRepository();
    let parsedRepo = JSON.parse(fakeRepo);

    expect(spy).toBeCalledWith('repository');
    expect(fetchedRepo.repoId).toBe(parsedRepo.repoId);
    expect(fetchedRepo.issueUrl).toBe(parsedRepo.issueUrl);

    jest.resetModules();
});

// test 4
test('Throw error when repository is not found', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem');
    spy.mockReturnValue(undefined);

    try {
        issues.fetchRepository();
    } catch (err) {
        expect(spy).toBeCalledWith('repository');
        expect(err).toMatch('No repository found');
    }

    jest.resetModules();
});

// test 5
test('Fetch and return username when username is found', async () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem');
    spy.mockReturnValue(fakeUsername);

    let fetchedUsername = await issues.fetchUsername(fakeToken);

    expect(spy).toBeCalledWith('github_username');
    expect(fetchedUsername).toBe(fakeUsername);

    jest.resetModules();
});

// test 6
test('Fetch and return username from github when username is not found', async () => {
    let name = {
        login: fakeUsername,
    };
    fetchMock.mockResponseOnce(JSON.stringify(name));
    const localStorageGetSpy = jest.spyOn(Storage.prototype, 'getItem');
    localStorageGetSpy.mockReturnValue(undefined);
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(key => {});

    let fetchedUsername = await issues.fetchUsername(fakeToken);

    expect(localStorageGetSpy).toBeCalledWith('github_username');
    expect(fetchedUsername).toBe(fakeUsername);

    fetchMock.resetMocks();
    jest.resetModules();
});

// test 7
test('Throw error when username cannot be retrieved', async () => {
    fetchMock.mockReject(new Error('fake error message'));
    const localStorageGetSpy = jest.spyOn(Storage.prototype, 'getItem');
    localStorageGetSpy.mockReturnValue(undefined);
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(key => {});

    try {
        await issues.fetchUsername(fakeToken);
    } catch (err) {
        expect(localStorageGetSpy).toBeCalledWith('github_username');
        expect(err).toMatch('Username could not be retrieved');
    }

    fetchMock.resetMocks();
    jest.resetModules();
});

// test 8
test('Retrieve issues from github given invalid credentials', async () => {
    let fakeParsedRepo = JSON.parse(fakeRepo);
    fetchMock.mockReject(new Error('Invalid url'));

    try {
        await issues.retrieveIssues(fakeToken, fakeUsername, fakeParsedRepo);
    } catch (err) {
        expect(err).toMatch('Issues could not be retrieved');
    }

    fetchMock.resetMocks();
    jest.resetModules();
});

// test 9
test('Filter unassigned issues', async () => {
    let receivedIssues = issues.filterAssignedIssues(
        unfilteredIssues,
        fakeUsername
    );

    expect(receivedIssues).toStrictEqual(filteredIssues);

    fetchMock.resetMocks();
    jest.resetModules();
});

// test 10
test('Error thrown when trying to close issue', async () => {
    fetchMock.mockReject(new Error('Invalid url'));

    try {
        await issues.closeIssue(filteredIssues[0].html_url, fakeToken);
    } catch (err) {
        expect(err).toMatch('Issue could not be closed');
    }

    fetchMock.resetMocks();
    jest.resetModules();
});

// test 11
test('Issues are added to the DOM', () => {
    let parsedFakeRepo = JSON.parse(fakeRepo);
    document.body.innerHTML = HTML;

    issues.addIssuesToDOM(filteredIssues, parsedFakeRepo, fakeToken);

    const divBtns = document.querySelector('#githubIssuesList');
    const issuesLinks = divBtns.querySelectorAll('a');

    let issueContainer = [];
    issuesLinks.forEach(element => {
        issueContainer.push(element.getAttribute('title'));
    });

    let issueTitles = ['title-1', 'title-2'];

    expect(issueContainer).toStrictEqual(issueTitles);

    fetchMock.resetMocks();
    jest.resetModules();
});
