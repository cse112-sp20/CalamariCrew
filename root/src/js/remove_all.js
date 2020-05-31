const rm = document.getElementById('remove_all');
rm.addEventListener('click', () => {
    window.localStorage.removeItem('github_username');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('raptor_name');
});
