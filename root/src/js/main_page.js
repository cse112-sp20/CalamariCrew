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
    // alert(userName);
    alert(repo);
    const repoName = repo.repoId;

    fetch(`https://api.github.com/repos/${userName}/${repoName}/milestones`, {
        headers: {
            //get all issues
            state: 'all',
        },
    }).then(res => alert(res));
};
