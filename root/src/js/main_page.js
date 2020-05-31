if (localStorage.getItem('raptor_name')) {
    document.getElementById(
        'userVelocityRaptorName'
    ).innerHTML = localStorage.getItem('raptor_name');
}
if (localStorage.length != 0) {
    //get everything and activate listeners to dress raptor with info from other page
    ///switch cases with same ids for both
    const list = ['tail', 'back', 'head', 'hand'];
    for (bodyPart of list) {
        if (localStorage.getItem(bodyPart) != null) {
            document.getElementById(
                localStorage.getItem(bodyPart)
            ).style.display = 'block';
        }
    }
}
