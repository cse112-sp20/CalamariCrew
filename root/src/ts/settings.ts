window.onload = function (event: any) {
    //Settings buttons
    var GeneralButton = document.getElementById("generalbtn");
    var VelocityRaptorButton = document.getElementById("raptorbutton");
    var MyTeamButton = document.getElementById("myteambtn");

    //HTML hidden Elements
    var VelocityRaptorDisplay = document.getElementById("myvelocityraptor");
    var GeneralDisplay = document.getElementById("general");
    var MyTeamDisplay = document.getElementById("myTeamDisplay");

    //Highlight pressed button
    var prevActive = GeneralButton;

    //Options for accesories 
    var options = document.querySelector('.options');
    var prevAcc = document.getElementById("headAccesories");

    /* When a button is clicked, it's blue color is activated
     * and the hidden content in the HTML is displayed with block
     * PrevActive takes cares of the ones activated before to disable them
     * More buttons should be added here 
    */
    GeneralButton.addEventListener('click', function () {
        prevActive.classList.remove("active");
        GeneralButton.classList.add("active");
        prevActive = GeneralButton;
        VelocityRaptorDisplay.style.display = "none";
        MyTeamDisplay.style.display = "none";
        GeneralDisplay.style.display = "block";
    });
    VelocityRaptorButton.addEventListener('click', function () {
        prevActive.classList.remove("active");
        VelocityRaptorButton.classList.add("active");
        prevActive = VelocityRaptorButton;
        MyTeamDisplay.style.display = "none";
        GeneralDisplay.style.display = "none";
        VelocityRaptorDisplay.style.display = "block";
    });
    MyTeamButton.addEventListener('click', function () {
        prevActive.classList.remove("active");
        MyTeamButton.classList.add("active");
        prevActive = MyTeamButton;
        GeneralDisplay.style.display = "none";
        VelocityRaptorDisplay.style.display = "none";
        MyTeamDisplay.style.display = "block";
    });

 
    /* QuerySelector checked all the list elements in the options
     * when there's a change in the current selection, it looks 
     * for the right one and hides other accesories. PrevAcc keeps
     * track of the latest shown accesories
    */    
    options.addEventListener('change', (event) => { //listener to check selection of accessories
        prevAcc.style.display = "none";  
        switch((<HTMLInputElement>event.target).value){ 

            case 'head':  
                prevAcc = document.getElementById("headAccesories")
                prevAcc.style.display="block";
            break;

            case 'back':
                prevAcc = document.getElementById("backAccesories")
                prevAcc.style.display="block";
            break;

            case 'tail':
                prevAcc = document.getElementById("tailAccesories")
                prevAcc.style.display="block";
            break;

            case 'hand':
                prevAcc = document.getElementById("handAccesories")
                prevAcc.style.display="block";
              break;
        }
        
    });
};
