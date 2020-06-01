const rm = document.getElementById('remove_all');
rm.addEventListener('click', () => {
    window.localStorage.removeItem('github_username');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('raptor_name');
    // fetch('http://localhost:3000/clear');
    window.location.href = '/root/html/setup/auth.html';
});
