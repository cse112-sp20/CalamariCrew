window.onload = function(event) {
    //Settings buttons
    var GeneralButton = document.getElementById('generalbtn');
    var VelocityRaptorButton = document.getElementById('raptorbutton');
    var GithubRepoButton = document.getElementById('repobtn');
    //HTML hidden Elements
    var VelocityRaptorDisplay = document.getElementById('myvelocityraptor');
    var GeneralDisplay = document.getElementById('general');
    var MyGithubRepoDisplay = document.getElementById('myGithubRepo');
    //Highlight pressed button
    var prevActive = GeneralButton;
    //Options for accesories
    var prevAcc = document.getElementById('headAccessories');
    // **************************************** To switch between accessories ********************************* //
    const divBtns = document.querySelector('#switch_acc'); //container by ID UI Buttons Container
    const uiBtns = divBtns.querySelectorAll('button'); //all the elements inside container
    uiBtns.forEach(button => {
        button.addEventListener('click', function() {
            prevAcc.style.display = 'none';
            prevAcc = document.getElementById(button.value + 'Accessories');
            prevAcc.style.display = 'block';
            currentlyActive(button.value, button.value + 'Accessories'); //to know which ones to display
        });
    });

    // **************************************** To switch between accessories ********************************* //

    // **************************************** To Undress the Raptor ********************************* //
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
    // **************************************** To Undress the Raptor ********************************* //

    // **************************************** To show hidden elements + change active status in button ********************************* //

    GeneralButton.addEventListener('click', function() {
        prevActive.classList.remove('active');
        GeneralButton.classList.add('active');
        prevActive = GeneralButton;
        VelocityRaptorDisplay.style.display = 'none';
        GeneralDisplay.style.display = 'block';
        MyGithubRepoDisplay.style.display = 'none';
    });
    VelocityRaptorButton.addEventListener('click', function() {
        prevActive.classList.remove('active');
        VelocityRaptorButton.classList.add('active');
        prevActive = VelocityRaptorButton;

        GeneralDisplay.style.display = 'none';
        VelocityRaptorDisplay.style.display = 'block';
        MyGithubRepoDisplay.style.display = 'none';
    });

    GithubRepoButton.addEventListener('click', function() {
        prevActive.classList.remove('active');
        GithubRepoButton.classList.add('active');
        prevActive = GithubRepoButton;
        GeneralDisplay.style.display = 'none';
        VelocityRaptorDisplay.style.display = 'none';
        MyGithubRepoDisplay.style.display = 'block';
    });
    // **************************************** To show hidden elements + change active status in button ********************************* //

    // **************************************** To switch between accessories ********************************* //
    function currentlyActive(bodyPart, accessory) {
        const container = document.querySelector('#' + accessory); //container by ID
        const imgsInContainer = container.querySelectorAll('img'); //all the elements inside container
        for (const accessory of imgsInContainer) {
            accessory.addEventListener('click', function(event) {
                if (localStorage.getItem(bodyPart) != null) {
                    document.getElementById(
                        localStorage.getItem(bodyPart) + '_'
                    ).style.display = 'none';
                }
                localStorage.setItem(bodyPart, accessory.id); //for main page

                document.getElementById(accessory.id + '_').style.display =
                    'block';
            });
        }
    }
    currentlyActive('head', 'headAccessories'); //initialize the function
    // **************************************** To switch between accessories ********************************* //

    // **************************************** To Display RaptorName in UI Gallery ********************************* //
    function displayRaptorName() {
        let raptorName = document.getElementById('raptorNameAccessory');

        if (localStorage.getItem('raptor_name')) {
            raptorName.innerHTML =
                "Hi, I'm " + localStorage.getItem('raptor_name') + '!';
        } else {
            raptorName.innerHTML = 'Close Extension to refresh';
        }
    }
    displayRaptorName(); //initialize function
    // **************************************** To Display RaptorName in UI Gallery ********************************* //

    // **************************************** To Display Current Raptor Accessories ********************************* //
    if (localStorage.length != 0) {
        const list = ['tail', 'back', 'head', 'hand'];
        for (bodyPart of list) {
            if (localStorage.getItem(bodyPart) != null) {
                document.getElementById(
                    localStorage.getItem(bodyPart) + '_'
                ).style.display = 'block';
            }
        }
    }
    // **************************************** To Display Current Raptor Accessories ********************************* //
};
