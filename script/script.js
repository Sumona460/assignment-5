// sign in btn
const signBtn = document.getElementById('signBtn');

signBtn.addEventListener('click', function (){
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

const defaultUser = 'admin';
const defaultPassword = 'admin123';

if(username === defaultUser && password === defaultPassword){
    alert('Signin Successful');

    // new windows
    window.location.href = 'dashboard.html';
}
else{
    alert('Invalid Username or Password');
}

});