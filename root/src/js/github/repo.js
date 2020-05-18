const token = localStorage.getItem('token');

var highlightedRow = undefined;

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
                let tableRow = document.createElement('tr');
                let tableCell = document.createElement('td');
                tableCell.innerHTML = repo.name;
                tableCell.setAttribute('id', repo.name);
                tableCell.onclick = function() {
                    if (highlightedRow) {
                        document
                            .getElementById(highlightedRow)
                            .removeAttribute('bgcolor');
                    }

                    highlightedRow = this.id;
                    this.setAttribute('bgcolor', '#cebfff');
                };
                tableRow.appendChild(tableCell);
                repoTableBody.appendChild(tableRow);
            }
        });
    });

var submitButton = document.getElementById('selectRepoButton');

submitButton.addEventListener('click', function() {
    if (highlightedRow) {
        localStorage.setItem('repository', highlightedRow);
    }
});
