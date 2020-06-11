const token = localStorage.getItem('token');
let speed = document.getElementById('div-4');
const NO_MILESTONE_MSG =
    'Please add a new milestone to start tracking velocity.';
const NO_ISSUES_MSG = 'Please add a new issue to start tracking velocity.';
const NO_MILESTONE = 1;
const NO_ISSUES = 2;
const USER_URL = 'https://api.github.com/user';

export async function getMostRecentMilestone() {
    const userName = localStorage.getItem('github_username');
    const repoName = JSON.parse(localStorage.getItem('repository')).repoId;
    const repoUrl = `https://api.github.com/repos/${userName}/${repoName}/milestones`;

    const milestones = await fetchUrl(repoUrl);
    return milestones && milestones.length > 0 ? milestones[0] : null;
}

export async function setUser() {
    const res = await fetchUrl(USER_URL);
    localStorage.setItem('github_username', res.login);
    return res;
}

export function getUser() {
    return localStorage.getItem('github_username');
}

export async function fetchUrl(url) {
    const res = await fetch(url, {
        headers: {
            Authorization: 'token ' + token,
        },
    });
    return await res.json();
}

export function getRepoName() {
    const repo = JSON.parse(localStorage.getItem('repository'));
    return repo.repoId;
}

export function displayError(context) {
    speed = document.getElementById('div-4');
    switch (context) {
        case NO_MILESTONE:
            speed.innerHTML = NO_MILESTONE_MSG;
            break;
        case NO_ISSUES:
            speed.innerHTML = NO_ISSUES_MSG;
            break;
    }
    speed.style.left = '0px';
    textbox.style =
        'top: 68px;left: -13px;position:absolute;width: 314px;height: auto;margin-bottom: 10px;z-index: 0;';
}

export function getNumIssues(milestone) {
    return milestone.open_issues + milestone.closed_issues;
}

export async function setUserVelocity(milestone) {
    const { number: milestoneId } = milestone;
    speed = document.getElementById('div-4');
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

export async function loadVelocity() {
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
    await setUserVelocity(milestone);
}

export function initAccessories() {
    const raptor_name = localStorage.getItem('raptor_name');
    if (raptor_name) {
        const userVelocityName = document.getElementById(
            'userVelocityRaptorName'
        );
        const newMsg = localStorage.getItem('raptor_name').substring(0, 11);
        userVelocityName.innerHTML = newMsg;
    }
    if (localStorage.length != 0) {
        /* get everything and activate listeners to dress raptor
           with info from other page switch cases with
           same ids for both
        */
        const list = ['tail', 'back', 'head', 'hand'];
        for (let bodyPart of list) {
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
