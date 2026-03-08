
// console.log("js connected");
// sign in btn
const signBtn = document.getElementById('signBtn');

if(signBtn){
signBtn.addEventListener('click', function (){
const username = document.getElementById('username').value.trim().toLowerCase();
const password = document.getElementById('password').value.trim().toLowerCase();

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
};




// all, open & close btn
const loadIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then((json) => displayIssue(json.data));
};

const displayIssue = (issues) => {

    const btnContainer = document.getElementById('btn-container');
    btnContainer.innerHTML = "";

    const btnDiv = document.createElement('div');
    btnDiv.classList.add('issue-filter-container'); // container class

    btnDiv.innerHTML = `
        <button class="filter-btn btn btn-primary">All</button>
        <button class="filter-btn btn btn-outline">Open</button>
        <button class="filter-btn btn btn-outline">Closed</button>
    `;

    btnContainer.appendChild(btnDiv);

    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(){

            buttons.forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline');
            });

            this.classList.remove('btn-outline');
            this.classList.add('btn-primary');

        });
    });
};

loadIssues();


// 50 issues length section
const loadLength = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(json => displayLength(json.data));
};

const displayLength = (issues) => {
    // left side
    const left = document.querySelector('#issues-left h2');
    left.textContent = `${issues.length} Issues`;

    // right side
    const open = document.querySelector('#issues-right span:nth-child(1)');
    const closed = document.querySelector('#issues-right span:nth-child(2)');

    // API data to open/closed count 
    const openCount = issues.filter(i => i.status === 'open').length;
    const closedCount = issues.filter(i => i.status === 'closed').length;

    open.innerHTML = `<span class="w-2 h-2 bg-green-500 rounded-full"></span> ${openCount} Open`;
    closed.innerHTML = `<span class="w-2 h-2 bg-purple-500 rounded-full"></span> ${closedCount} Closed`;
};

loadLength();

// cards

let allIssues = [];

// all issue fetch
const loadCard = ()=>{
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(json => {
       allIssues = json.data;
       displayCard(allIssues);
    });
};

// display card 
const displayCard = (issues) => {
     const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
}
