const token = localStorage.getItem('token');
const speed = document.getElementById('div-4');
const NO_MILESTONE_MSG =
    'Please add a new milestone to start tracking velocity.';
const NO_ISSUES_MSG = 'Please add a new issue to start tracking velocity.';
const NO_MILESTONE = 1;
const NO_ISSUES = 2;
const USER_URL = 'https://api.github.com/user';

if (localStorage.getItem('raptor_name')) {
    document.getElementById(
        'userVelocityRaptorName'
    ).innerHTML = localStorage.getItem('raptor_name');
}

async function getMostRecentMilestone() {
    const userName = localStorage.getItem('github_username');
    const repoName = JSON.parse(localStorage.getItem('repository')).repoId;
    const repoUrl = `https://api.github.com/repos/${userName}/${repoName}/milestones`;

    const milestones = await fetchUrl(repoUrl);
    return milestones && milestones.length > 0 ? milestones[0] : null;
}

async function setUser() {
    const res = await fetchUrl(USER_URL);
    localStorage.setItem('github_username', res.login);
    return res;
}
function getUser() {
    return localStorage.getItem('github_username');
}

async function fetchUrl(url) {
    const res = await fetch(url, {
        headers: {
            Authorization: 'token ' + token,
        },
    });
    return await res.json();
}

function getRepoName() {
    const repo = JSON.parse(localStorage.getItem('repository'));
    return repo.repoId;
}

function displayError(context) {
    switch (context) {
        case NO_MILESTONE:
            speed.innerHTML = NO_MILESTONE_MSG;
            break;
        case NO_ISSUES:
            speed.innerHTML = NO_ISSUES_MSG;
            break;
    }
}

function getNumIssues(milestone) {
    return milestone.open_issues + milestone.closed_issues;
}

function setTeamVelocity(milestone) {
    const { open_issues, closed_issues } = milestone;
    const totalIssues = open_issues + closed_issues;
    //at this point, total issues should not be 0 because of prior error check
    const teamVelocity = closed_issues / totalIssues;
    //TODO: waiting on team velocity textbox to be added
}

async function setUserVelocity(milestone) {
    const { number: milestoneId } = milestone;
    const userName = getUser();
    const repoName = getRepoName();
    const url = `https://api.github.com/repos/${userName}/${repoName}/issues?milestone=${milestoneId}&state=all&assignee=${userName}`;
    const issues = await fetchUrl(url);
    const closedIssues = issues.filter(issue => issue.state === 'closed');
    if (issues.length === 0) displayError(NO_ISSUES);

    let userVelocity =
        issues.length > 0 ? closedIssues.length / issues.length : 0;
    /* animation speed will be .2 in the fastest case.
    this subtraction is done to flip higher values with
    lower values since a lower number results in a faster
    animation playback speed. (without this,
    a velocity of .75 would be slower than .25)
    to better distribute the times, we use a square
    function to make it more visible and divide to
    scale it appropriately. These were chosen through
    trial and error */
    const animationSpeed = Math.pow(5 * (1.2 - userVelocity), 2.0) / 10;
    document.documentElement.style.setProperty(
        '--raptorSpeed',
        animationSpeed + 's'
    );
    const speedText = Math.floor(userVelocity * 100);
    if (issues.length !== 0 || milestones.length !== 0) {
        speed.innerHTML = `Raptor's speed: ${speedText}km/h`;
    }
}

async function loadVelocity() {
    await setUser();
    const milestone = await getMostRecentMilestone();
    if (!milestone) {
        displayError(NO_MILESTONE);
        return;
    }
    const numMilestoneIssues = getNumIssues(milestone);
    if (numMilestoneIssues === 0) {
        displayError(NO_ISSUES);
        return;
    }
    //TODO: waiting on team velocity textbox
    //await setTeamVelocity(milestone);
    await setUserVelocity(milestone);
}

function initAccessories() {
    if (localStorage.length != 0) {
        /* get everything and activate listeners to dress raptor
           with info from other page switch cases with
           same ids for both
        */
        const list = ['tail', 'back', 'head', 'hand'];
        const token = localStorage.getItem('token');
        for (bodyPart of list) {
            if (localStorage.getItem(bodyPart) != null) {
                document.getElementById(
                    localStorage.getItem(bodyPart)
                ).style.display = 'block';
            }
        }
    }
}
initAccessories();
loadVelocity();
