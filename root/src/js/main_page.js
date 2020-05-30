window.onload = function(event) {
    if (localStorage.getItem('raptor_name')) {
        document.getElementById(
            'userVelocityRaptorName'
        ).innerHTML = localStorage.getItem('raptor_name');
    }

    if (localStorage.length != 0) {
        //get everything and activate listeners to dress raptor with info from other page
        //if back ... contain y agarralo else ...tira

        ///switch cases with same ids for both
        const list = ['tail', 'back', 'head', 'hand'];

        for (bodyPart of list) {
            if (localStorage.getItem(bodyPart) != null) {
                //should do code injection here ! create element from here and inject the code...
                document.getElementById(
                    localStorage.getItem(bodyPart)
                ).style.display = 'block';
            } else {
                //should remove the ones that are no longer selected
                // document.getElementById(localStorage.getItem(bodyPart)).style.display="none";
            }
        }
    }

    const userName = localStorage.getItem('github_username');
    const repo = JSON.parse(localStorage.getItem('repository'));
    const token = localStorage.getItem('token');
    const repoName = repo.repoId;
    const speed = document.getElementById('div-4');
    const speedErrorMessage =
        'Please add a milestone and issues to start tracking velocity.';

    fetch(`https://api.github.com/repos/${userName}/${repoName}/milestones`, {
        headers: {
            //get all issues
            Authorization: 'token ' + token,
        },
    })
        .then(res => res.json())
        .then(milestones => {
            if (milestones.length === 0) {
                speed.innerHTML = speedErrorMessage;
                return;
            }
            const curMilestone = milestones[0];
            const { open_issues, closed_issues, number } = curMilestone;
            const milestoneId = number;
            const totalIssues = open_issues + closed_issues;
            let userVelocity;
            let teamVelocity;
            if (totalIssues === 0) {
                speed.innerHTML = speedErrorMessage;
                teamVelocity = 0;
            } else {
                teamVelocity = open_issues / totalIssues;

                //get user velocity
                fetch(
                    `https://api.github.com/repos/${userName}/${repoName}/issues?milestone=${milestoneId}&state=all&assignee=${userName}`,
                    {
                        headers: {
                            Authorization: 'token ' + token,
                        },
                    }
                )
                    .then(res => res.json())
                    .then(issues => {
                        const closedIssues = issues.filter(
                            issue => issue.state === 'closed'
                        );
                        if (issues.length === 0) {
                            //TODO : display screen indicating you haven't added issues.
                            speed.innerHTML = speedErrorMessage;
                            userVelocity = 0;
                        } else {
                            userVelocity = closedIssues.length / issues.length;
                            //animation speed will be .2 in the fastest case.
                            //this subtraction is done to flip higher values with
                            //lower values since a lower number results in a faster
                            //animation playback speed. (without this,
                            //a velocity of .75 would be slower than .25)
                            //to better distribute the times, we use a square
                            //function to make it more visible and divide to
                            //scale it appropriately. These were chosen through
                            //trial and error
                            const animationSpeed =
                                Math.pow(5 * (1.2 - userVelocity), 2.0) / 10;
                            document.documentElement.style.setProperty(
                                '--raptorSpeed',
                                animationSpeed + 's'
                            );
                            const speedText = Math.floor(userVelocity * 100);
                            speed.innerHTML = `Raptor's speed: ${speedText}km/h`;
                        }
                    });
            }
        });
};
