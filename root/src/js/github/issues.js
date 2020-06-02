var token = localStorage.getItem('token');

getGithubIssues(token);

function getGithubIssues(token) {
    var username;
    if (localStorage.getItem('github_username')) {
        username = localStorage.getItem('github_username');
    } else {
        fetch('https://api.github.com/user', {
            headers: {
                // Include the token in the Authorization header
                Authorization: 'token ' + token,
            },
        })
            .then(res => res.json())
            .then(res => (username = res.login));
    }

    if (localStorage.getItem('repository')) {
        var repo = JSON.parse(localStorage.getItem('repository'));
        console.log(repo.repoId);
        var repoName = document.getElementById('div-5');
        repoName.innerHTML = `Repository: ${repo.repoId}`;
        if (repo.repoId && repo.issueUrl && token) {
            fetch(repo.issueUrl, {
                headers: {
                    // Include the token in the Authorization header
                    Authorization: 'token ' + token,
                },
            })
                .then(res => res.json())
                .then(res => {
                    res = res.filter(e => {
                        if (!e.assignee) {
                            return false;
                        }

                        var found = false;
                        e.assignees.forEach(assignee => {
                            if (assignee.login == username) {
                                found = true;
                            }
                        });

                        return found;
                    });
                    var issueList = document.getElementById('githubIssuesList');
                    var speed = document.getElementById('div-4');

                    res.forEach(issue => {
                        let listElement = document.createElement('li');
                        listElement.id = issue.number.toString();

                        let inputElement = document.createElement('input');
                        inputElement.type = 'checkbox';
                        inputElement.id = 'checkbox' + issue.number.toString();

                        inputElement.addEventListener('change', function() {
                            if (this.checked) {
                                // var response = confirm(
                                //     'Do you want to close this issue?'
                                // );
                                // if (response == true) {
                                closeIssue(
                                    repo.issueUrl +
                                        '/' +
                                        issue.number.toString(),
                                    token
                                );
                                // } else {
                                //     inputElement.checked = false;
                                // }
                                issueList.removeChild(listElement);
                            }
                        });

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
                });
        }
    }
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
