require('jest-fetch-mock').enableMocks();

import * as repo_test from '../root/src/js/github/repo';

var fs = require('fs');
var HTML = fs.readFileSync('root/html/setup/choose_repo.html', 'utf8');

const mockReturnVal = {Authorization: '12345'};
// global.fetch = jest.fn(() =>
//     Promise.resolve({
//         json: () => Promise.resolve(mockReturnVal),
//     })
// )


describe('Repo Function Testing', () => {
    test('changeHighlightedRow Test', () => {
        
        document.body.innerHTML = HTML;
        require('../root/src/js/github/repo.js');


        let tableCell = document.createElement('td');
        let selectedRow = repo_test.highlightedRow;
        expect(repo_test.changeHighlightedRow(document, selectedRow, tableCell)).toBe(true);
        jest.resetModules();
    });
    test('tableCellUpdate Test', () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockReturnVal),
            })
        );
        document.body.innerHTML = HTML;
        require('../root/src/js/github/repo.js');

        let tableCell = document.createElement('td');
        let fakeRepo = '{"name":"Build","issues_url":"https://example.com"}';
        let issuesUrl = fakeRepo.issues_url;

        expect(repo_test.tableCellUpdate(tableCell,fakeRepo,issuesUrl)).toBe(tableCell);
        jest.resetModules();
    });
    test('tableRowUpdate Test', () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockReturnVal),
            })
        );
        document.body.innerHTML = HTML;
        require('../root/src/js/github/repo.js');

        let tableCell = document.createElement('td');
        let repoTableBody = document.getElementById('repoTableBody');

        expect(repo_test.tableRowUpdate(tableCell, repoTableBody)).toBe(repoTableBody);
        jest.resetModules();
    });
    // test('main Test', () => {
    //     // global.fetch = jest.fn(() =>Promise.resolve(milestone1));
    //     document.body.innerHTML = HTML;
    //     require('../root/src/js/github/repo.js');

    //     expect(repo_test.main()).toEqual(Promise());
    //     jest.resetModules();
    // });
});
