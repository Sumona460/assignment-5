
// LOGIN System
const signBtn = document.getElementById('signBtn');

if (signBtn) {

signBtn.addEventListener('click', function () {

const username = document.getElementById('username').value.trim().toLowerCase();
const password = document.getElementById('password').value.trim().toLowerCase();

const defaultUser = "admin";
const defaultPassword = "admin123";

if (username === defaultUser && password === defaultPassword) {

alert("Signin Successful");
window.location.href = "dashboard.html";

} else {

alert("Invalid Username or Password");

}

});

}



// GLOBAL ISSUE 

let allIssues = [];

// LOAD FILTER BUTTONS
const loadIssues = () => {

fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
.then(res => res.json())
.then(json => {

allIssues = json.data;

displayIssueButtons();
displayLength(allIssues);
displayCard(allIssues);

});

};


// FILTER BUTTONS
const displayIssueButtons = () => {

const btnContainer = document.getElementById('btn-container');
btnContainer.innerHTML = "";

const btnDiv = document.createElement('div');
btnDiv.className = "issue-filter-container flex gap-4";

btnDiv.innerHTML = `
<button class="filter-btn btn btn-primary">All</button>
<button class="filter-btn btn btn-outline">Open</button>
<button class="filter-btn btn btn-outline">Closed</button>
`;

btnContainer.appendChild(btnDiv);

const buttons = document.querySelectorAll('.filter-btn');

buttons.forEach(button => {

button.addEventListener('click', function () {

const type = this.textContent.toLowerCase();

buttons.forEach(btn => {
btn.classList.remove('btn-primary');
btn.classList.add('btn-outline');
});

this.classList.remove('btn-outline');
this.classList.add('btn-primary');

if (type === "all") {

displayCard(allIssues);

} else {

const filteredIssues = allIssues.filter(issue => issue.status === type);

displayCard(filteredIssues);

}

});

});

};



// ISSUE COUNT SECTION
const displayLength = (issues) => {

const left = document.querySelector('#issues-left h2');

left.textContent = `${issues.length} Issues`;

const open = document.querySelector('#issues-right span:nth-child(1)');
const closed = document.querySelector('#issues-right span:nth-child(2)');

const openCount = issues.filter(i => i.status === "open").length;
const closedCount = issues.filter(i => i.status === "closed").length;

open.innerHTML = `<span class="w-2 h-2 bg-green-500 rounded-full"></span> ${openCount} Open`;

closed.innerHTML = `<span class="w-2 h-2 bg-purple-500 rounded-full"></span> ${closedCount} Closed`;

};



// DISPLAY ISSUE CARDS

const displayCard = (issues) => {

const cardContainer = document.getElementById('card-container');

cardContainer.innerHTML = "";

issues.forEach(issue => {

const card = document.createElement('div');

let borderColor = "";

if (issue.status === "open") {

borderColor = "border-green-500";

} else {

borderColor = "border-purple-500";

}

card.className = `issue-card p-4 bg-base-100 shadow-lg rounded-lg border-t-4 ${borderColor}`;


card.innerHTML = `

<div class="flex justify-between items-center">

<div class="flex items-center gap-2 text-sm text-gray-500">

<span class="w-2 h-2 rounded-full ${
issue.status === "open" ? "bg-green-500" : "bg-purple-500"
}"></span>

<span class="capitalize font-medium">${issue.status}</span>

</div>

<span class="text-xs px-2 py-1 rounded-full bg-gray-100">
${issue.priority}
</span>

</div>


<h3 class="issue-title text-base font-semibold mt-2 cursor-pointer hover:text-blue-600">

${issue.title}

</h3>


<p class="text-sm text-gray-500 mt-1">

${issue.description || "No description available"}

</p>


<div class="flex gap-2 mt-3">

<button class="btn btn-soft btn-error rounded-full text-xs">
<i class="fa-solid fa-bug"></i>
BUG
</button>

<button class="btn btn-soft btn-warning rounded-full text-xs">
<i class="fa-regular fa-life-ring"></i>
HELP WANTED
</button>

</div>

<hr class="my-3">


<div class="flex justify-between text-xs text-gray-400">

<span>#${issue.id} by ${issue.author}</span>

<span>${new Date(issue.createdAt).toLocaleDateString()}</span>

</div>

`;

cardContainer.appendChild(card);



// TITLE CLICK korle MODAL 

const title = card.querySelector('.issue-title');

title.addEventListener('click', function () {

loadSingleIssue(issue.id);

});

});

};


// LOAD SINGLE ISSUE

const loadSingleIssue = (id) => {

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
.then(res => res.json())
.then(json => showIssueModal(json.data));

};


// SHOW MODAL


const showIssueModal = (issue) => {

const modal = document.createElement('div');

modal.className = "modal modal-open";

modal.innerHTML = `

<div class="modal-box">

<h3 class="font-bold text-lg">${issue.title}</h3>

<p class="py-2">${issue.description}</p>

<p><b>Status:</b> ${issue.status}</p>
<p><b>Author:</b> ${issue.author}</p>
<p><b>Category:</b> ${issue.category}</p>
<p><b>Priority:</b> ${issue.priority}</p>
<p><b>Label:</b> ${issue.label}</p>
<p><b>Created:</b> ${issue.createdAt}</p>

<div class="modal-action">

<button class="btn close-modal">Close</button>

</div>

</div>

`;

document.body.appendChild(modal);

modal.querySelector('.close-modal').addEventListener('click', function () {

modal.remove();

});

};



// SEARCH FUNCTION


const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

if (searchBtn) {

searchBtn.addEventListener('click', function () {

const searchText = searchInput.value.trim();

if (!searchText) return;

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
.then(res => res.json())
.then(json => {

displayCard(json.data);

});

});

}



// INITIAL LOAD

loadIssues();