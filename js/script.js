// select div section with overview class for profile
const overview = document.querySelector(".overview");
//  select unordered list for the repos
const repoList = document.querySelector(".repo-list");
// select where repos display
const repoSection = document.querySelector(".repos");
//  select where repo data will display
const repoData = document.querySelector(".repo-data");
// select back to repo gallery button
const backToRepos = document.querySelector(".view-repos");
// select search input box 
const filterInput = document.querySelector(".filter-repos");


const username = "mistydb";


const getUserData = async function (){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    display(data);
};

getUserData();

const display = function (data){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data['avatar_url']} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data['public_repos']}</p>
  </div>`;
  overview.append(div);
  getRepos();
};

const getRepos = async function (){
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=100`);
    const list = await fetchRepos.json();
    console.log(list);
    displayRepos(list);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        let listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    };
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName){
    const getInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
    for (let key in languageData) {
        languages.push(key);
    }
    console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo["default_branch"]}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo["html_url"]}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    backToRepos.classList.remove("hide");
    };

backToRepos.addEventListener("click", function (e) {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backToRepos.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const input = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const inputLowerCase = input.toLowerCase();
    
    for (const repo of repos) {
        const repoLowerCase = repo.innerText.toLowerCase();
        if (repoLowerCase.includes(inputLowerCase)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});