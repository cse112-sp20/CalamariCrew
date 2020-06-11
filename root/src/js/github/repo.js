const token = localStorage.getItem('token');

var highlightedRow = {
    repoId: undefined,
    issueUrl: undefined,
};

export function checkRow(tableCell) {
    if (highlightedRow.repoId) {
        document
            .getElementById(highlightedRow.repoId)
            .removeAttribute('bgcolor');
    }

    highlightedRow.repoId = tableCell.id;
    highlightedRow.issueUrl = tableCell.getAttribute('issueUrl');
    tableCell.setAttribute('bgcolor', '#cebfff');

    if (tableCell) {
        return true;
    } else {
        return false;
    }
}

export function tableCellUpdate(tableCell, repo, issuesUrl) {
    tableCell.innerHTML = repo.name;
    tableCell.setAttribute('id', repo.name);
    tableCell.setAttribute('issueUrl', issuesUrl);
    tableCell.onclick = checkRow(tableCell);
    return tableCell;
}

export function tableRowUpdate(tableCell, repoTableBody) {
    let tableRow = document.createElement('tr');
    tableRow.appendChild(tableCell);

    repoTableBody.appendChild(tableRow);
    return repoTableBody;
}

export async function main() {
    // Call the user info API using the fetch browser library
    fetch('https://api.github.com/user/repos', {
        headers: {
            // Include the token in the Authorization header
            Authorization: 'token ' + token,
        },
    })
        // Parse the response as JSON
        .then(res => res.json())
        .then(res => {
            let repoTableBody = document.getElementById('repoTableBody');
            res.forEach(repo => {
                if (repo.name) {
                    let issuesUrl = repo.issues_url.replace('{/number}', '');
                    let tableCell = document.createElement('td');

                    tableCellUpdate(tableCell, repo, issuesUrl);

                    tableRowUpdate(tableCell, repoTableBody);
                }
            });
        });
}

var submitButton = document.getElementById('selectRepoButton');

if (submitButton) {
    submitButton.addEventListener('click', function() {
        if (highlightedRow.repoId) {
            localStorage.setItem('repository', JSON.stringify(highlightedRow));
            window.location.href = '/root/html/index.html';
        }
    });
}

main();
