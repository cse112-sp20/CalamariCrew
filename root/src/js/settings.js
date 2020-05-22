window.onload = function(event) {
    //Settings buttons
    var GeneralButton = document.getElementById('generalbtn');
    var VelocityRaptorButton = document.getElementById('raptorbutton');
    var MyTeamButton = document.getElementById('myteambtn');
    var GithubRepoButton = document.getElementById('repobtn');
    //HTML hidden Elements
    var VelocityRaptorDisplay = document.getElementById('myvelocityraptor');
    var GeneralDisplay = document.getElementById('general');
    var MyTeamDisplay = document.getElementById('myTeamDisplay');
    var MyGithubRepoDisplay = document.getElementById('myGithubRepo');
    //Highlight pressed button
    var prevActive = GeneralButton;
    //Options for accesories
    var options = document.querySelector('.options');
    var prevAcc = document.getElementById('headAccesories');
    /* When a button is clicked, it's blue color is activated
     * and the hidden content in the HTML is displayed with block
     * PrevActive takes cares of the ones activated before to disable them
     * More buttons should be added here
     */
    //to clear all the items in the raptor
    document.getElementById('clearAll').addEventListener('click', function() {
        const list = ['tail', 'head', 'hand', 'back'];
        for (const bodyPart of list) {
            if (localStorage.getItem(bodyPart) != null) {
                document.getElementById(
                    localStorage.getItem(bodyPart) + '_'
                ).style.display = 'none';

                localStorage.removeItem(bodyPart);
            }
        }
    });

    GeneralButton.addEventListener('click', function() {
        prevActive.classList.remove('active');
        GeneralButton.classList.add('active');
        prevActive = GeneralButton;
        VelocityRaptorDisplay.style.display = 'none';
        MyTeamDisplay.style.display = 'none';
        GeneralDisplay.style.display = 'block';
        MyGithubRepoDisplay.style.display = 'none';
    });
    VelocityRaptorButton.addEventListener('click', function() {
        prevActive.classList.remove('active');
        VelocityRaptorButton.classList.add('active');
        prevActive = VelocityRaptorButton;
        MyTeamDisplay.style.display = 'none';
        GeneralDisplay.style.display = 'none';
        VelocityRaptorDisplay.style.display = 'block';
        MyGithubRepoDisplay.style.display = 'none';
    });
    MyTeamButton.addEventListener('click', function() {
        prevActive.classList.remove('active');
        MyTeamButton.classList.add('active');
        prevActive = MyTeamButton;
        GeneralDisplay.style.display = 'none';
        VelocityRaptorDisplay.style.display = 'none';
        MyTeamDisplay.style.display = 'block';
        MyGithubRepoDisplay.style.display = 'none';
    });

    GithubRepoButton.addEventListener('click', function() {
        prevActive.classList.remove('active');
        GithubRepoButton.classList.add('active');
        prevActive = GithubRepoButton;
        GeneralDisplay.style.display = 'none';
        VelocityRaptorDisplay.style.display = 'none';
        MyTeamDisplay.style.display = 'none';
        MyGithubRepoDisplay.style.display = 'block';
    });
    /* QuerySelector checked all the list elements in the options
     * when there's a change in the current selection, it looks
     * for the right one and hides other accesories. PrevAcc keeps
     * track of the latest shown accesories
     */

    options.addEventListener('change', function(event) {
        prevAcc.style.display = 'none';
        switch (event.target.value) {
            case 'head':
                prevAcc = document.getElementById('headAccesories');
                prevAcc.style.display = 'block';
                currentlyActive('head', 'headAccesories');
                break;
            case 'back':
                prevAcc = document.getElementById('backAccesories');
                prevAcc.style.display = 'block';
                currentlyActive('back', 'backAccesories');
                break;
            case 'tail':
                prevAcc = document.getElementById('tailAccesories');
                prevAcc.style.display = 'block';
                currentlyActive('tail', 'tailAccesories');
                break;
            case 'hand':
                prevAcc = document.getElementById('handAccesories');
                prevAcc.style.display = 'block';
                currentlyActive('hand', 'handAccesories');
                break;
        }
    });

    function currentlyActive(bodyPart, accesory) {
        const container = document.querySelector('#' + accesory); //container by ID
        const matches = container.querySelectorAll('img'); //all the elements inside container
        for (const backAccesory of matches) {
            backAccesory.addEventListener('click', function(event) {
                if (localStorage.getItem(bodyPart) != null) {
                    document.getElementById(
                        localStorage.getItem(bodyPart) + '_'
                    ).style.display = 'none';
                }
                localStorage.setItem(bodyPart, backAccesory.id); //for main page

                document.getElementById(backAccesory.id + '_').style.display =
                    'block';
            });
        }
    }

    function displayRepoName() {
        let repoName = document.getElementById('repoName');

        if (localStorage.getItem('repository')) {
            repoName.innerHTML = JSON.parse(
                localStorage.getItem('repository')
            ).repoId;
        } else {
            repoName.innerHTML = 'Select A Repository';
        }
    }

    function displayRaptorName() {
        let raptorName = document.getElementById('raptorNameAccessory');

        if (localStorage.getItem('raptor_name')) {
            raptorName.innerHTML =
                "Hi, I'm " + localStorage.getItem('raptor_name') + '!';
        } else {
            raptorName.innerHTML = 'Close Extension to refresh';
        }
    }

    currentlyActive('head', 'headAccesories');

    displayRepoName();

    displayRaptorName();

    //to dress the raptor
    if (localStorage.length != 0) {
        //get everything and activate listeners to dress raptor with info from other page

        ///switch cases with same ids for both
        const list = ['tail', 'back', 'head', 'hand'];

        for (bodyPart of list) {
            if (localStorage.getItem(bodyPart) != null) {
                //should do code injection here ! create element from here and inject the code...
                document.getElementById(
                    localStorage.getItem(bodyPart) + '_'
                ).style.display = 'block';
            }
        }
    }
};
