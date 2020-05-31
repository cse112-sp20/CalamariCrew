var submitButton = document.getElementById('raptorNameSubmit');

submitButton.addEventListener('click', event => {
    const raptorName = document.getElementsByName('raptorName')[0].value;
    localStorage.setItem('raptor_name', raptorName);
    window.location.href = '/root/html/setup/choose_repo.html';
});
