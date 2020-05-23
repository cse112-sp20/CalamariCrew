var token = localStorage.getItem('token');

if (localStorage.getItem('github_username')) {
    getGithubIssues(localStorage.getItem('github_username'));
} else {
    fetch('https://api.github.com/user', {
        headers: {
            // Include the token in the Authorization header
            Authorization: 'token ' + token,
        },
    })
        .then(res => res.json())
        .then(res => {
            var login = res.login;
            localStorage.setItem('github_username', login);
            getGithubIssues(login);
        });
}

function getGithubIssues(username) {
    if (localStorage.getItem('repository')) {
        var repo = JSON.parse(localStorage.getItem('repository'));

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

                        let link = document.createElement('a');
                        link.title = issue.title;
                        link.href = issue.html_url;
                        link.target = '_blank';

                        let linkText = document.createTextNode(issue.title);

                        console.log(issue);
                        link.appendChild(linkText);
                        listElement.appendChild(link);

                        issueList.appendChild(listElement);

                        speed.innerHTML = "Raptor's Speed: 25km/h";
                        issueList.onresize(
                            document.documentElement.style.setProperty(
                                '--raptorSpeed',
                                2 + 's'
                            )
                        );
                    });
                });
        }
    }
}
