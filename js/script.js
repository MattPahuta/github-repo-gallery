// target overview div - where profile info will appear
const overview = document.querySelector('.overview'); // repo div
const repoList = document.querySelector('.repo-list'); // repo ul
const repos = document.querySelector('.repos'); // repos section
const repoData = document.querySelector('.repo-data'); // repo data section

const username = 'MattPahuta';

// fetch data from GitHub api
const fetchGitHubData = async function() {
  const request = await fetch(`https://api.github.com/users/${username}`);
  const data = await request.json();
  // console.log(data);
  
  displayUserInfo(data);
}

fetchGitHubData();

// display gitHub user info to page
const displayUserInfo = data => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('user-info');
  newDiv.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`
  overview.append(newDiv);
  getRepos()
}

// fetch the repos
const getRepos = async function() {
  // fetch user's repos - list repos of user
  /* parameters: 
    - sort by most recently added to last updated - ?sort=updated
    - show up to 100 repos per page - &per_page=100
  */
  const request = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const data = await request.json();
  // console.log(data);
  displayRepos(data);
}

// build the ul of li repo names
const displayRepos = repos => {
  for (const repo of repos) {
    const li = document.createElement('li');
    li.classList.add('repo');
    li.innerHTML = `<h3>${repo.name}</h3>`
    repoList.append(li);
  }
}

// listen for clicks on repo names (li > h3 elements)
repoList.addEventListener('click', (e) => {
  if (e.target.matches('h3')){
    const repoName = e.target.innerText;
    // console.log(repoName);
    getRepoInfo(repoName); // repoName.languages_url
  }
})

// get specific repo data
const getRepoInfo = async repoName => {
  const repoRequest = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await repoRequest.json(); // returns repo object
  // console.log(repoInfo);
  const fetchLanguages = await fetch(repoInfo.languages_url); // get the languages_url property
  const languageData = await fetchLanguages.json(); // returns object of languages
  const languages = []; // start with empty languages array
  for (const language in languageData) { // loop through languageData object
    languages.push(language); // push languages to languages array
  }
  // console.log(languageData);
  // console.log(languages);
  displayRepoInfo(repoInfo, languages);
}

// display specific repo info to the page
const displayRepoInfo = (repoInfo, languages) => {
  repoData.innerHTML = '';
  repoData.classList.remove('hide');
  repos.classList.add('hide');
  const repoDiv = document.createElement('div');
  repoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(', ')}</p>
      <a class='visit' href='${repoInfo.svn_url}' target='_blank' rel='noreferrer noopener'>View Repo on GitHub!</a>`
  repoData.append(repoDiv);
}
