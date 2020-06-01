displayIssues();

function displayIssues() {
    try {
        let token = fetchToken();
        let repository = fetchRepository();
        let username = fetchUsername(token);
        retrieveIssues(token, username, repository);
    } catch (err) {
        console.log(err);
    }
}

function fetchToken() {
    var token = localStorage.getItem('token');

    if (token) {
        return token;
    } else {
        throw 'No token found';
    }
}

function fetchRepository(repository) {
    var repository = localStorage.getItem('repository');

    if (repository) {
        return JSON.parse(repository);
    } else {
        throw 'No repository found';
    }
}

function fetchUsername(token) {
    var username = localStorage.getItem('github_username');

    if (username) {
        return username;
    } else {
        fetch('https://api.github.com/user', {
            headers: {
                Authorization: 'token ' + token,
            },
        })
            .then(res => res.json())
            .then(name => {
                localStorage.setItem('github_username', name.login);
            })
            .catch(err => {
                throw 'Username could not be retrieved';
            });
    }
}

function retrieveIssues(token, username, repo) {
    if (repo.repoId && repo.issueUrl && token && username) {
        fetch(repo.issueUrl, {
            headers: {
                Authorization: 'token ' + token,
            },
        })
            .then(res => res.json())
            .then(issues => {
                let filteredIssues = filterAssignedIssues(issues, username);
                addIssuesToDOM(filteredIssues, repo, token);
            });
    }
}

function filterAssignedIssues(issues, username) {
    return issues.filter(issue => {
        if (!issue.assignee) {
            return false;
        }

        var found = false;
        issue.assignees.forEach(assignee => {
            if (assignee.login == username) {
                found = true;
            }
        });

        return found;
    });
}

function addIssuesToDOM(issues, repo, token) {
    var issueList = document.getElementById('githubIssuesList');

    issues.forEach(issue => {
        let listElement = document.createElement('li');
        listElement.id = issue.number.toString();

        let inputElement = createIssueCheckbox(issue, repo, token);

        let link = document.createElement('a');
        link.title = issue.title;
        link.href = issue.html_url;
        link.target = '_blank';

        let linkText = document.createTextNode(issue.title);

        link.appendChild(linkText);
        listElement.appendChild(inputElement);
        listElement.appendChild(link);
        issueList.appendChild(listElement);
    });
}

function createIssueCheckbox(issue, repo, token) {
    let inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.id = 'checkbox' + issue.number.toString();

    inputElement.addEventListener('change', function() {
        if (this.checked) {
            var response = confirm('Do you want to close this issue?');
            if (response == true) {
                closeIssue(
                    repo.issueUrl + '/' + issue.number.toString(),
                    token
                );
            } else {
                inputElement.checked = false;
            }
        }
    });

    return inputElement;
}

function closeIssue(issueUrl, token) {
    fetch(issueUrl, {
        method: 'PATCH',
        body: JSON.stringify({
            state: 'closed',
        }),
        headers: {
            // Include the token in the Authorization header
            Authorization: 'token ' + token,
        },
    })
        // Parse the response as JSON
        .then(res => res.json())
        .then(res => {
            console.log(res);
        });
}
