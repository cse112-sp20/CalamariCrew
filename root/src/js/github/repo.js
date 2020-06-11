const token = localStorage.getItem('token');

var highlightedRow = {
    repoId: undefined,
    issueUrl: undefined,
};

export function tableCellUpdate(tableCell, repo, issuesUrl) {
    tableCell.innerHTML = repo.name;
    tableCell.setAttribute('id', repo.name);
    tableCell.setAttribute('issueUrl', issuesUrl);
    return tableCell;
}

export function tableRowUpdate(tableCell, repoTableBody) {
    let tableRow = document.createElement('tr');
    tableRow.appendChild(tableCell);

    repoTableBody.appendChild(tableRow);
    return repoTableBody;
}

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

                tableCell.innerHTML = repo.name;
                tableCell.setAttribute('id', repo.name);
                tableCell.setAttribute('issueUrl', issuesUrl);

                tableCell.onclick = function() {
                    if (highlightedRow.repoId) {
                        document
                            .getElementById(highlightedRow.repoId)
                            .removeAttribute('bgcolor');
                    }

                    highlightedRow.repoId = this.id;
                    highlightedRow.issueUrl = this.getAttribute('issueUrl');
                    this.setAttribute('bgcolor', '#cebfff');
                };

                let tableRow = document.createElement('tr');
                tableRow.appendChild(tableCell);

                repoTableBody.appendChild(tableRow);
            }
        });
    });

var submitButton = document.getElementById('selectRepoButton');

submitButton.addEventListener('click', function() {
    if (highlightedRow.repoId) {
        localStorage.setItem('repository', JSON.stringify(highlightedRow));
        window.location.href = '/root/html/index.html';
    }
});
