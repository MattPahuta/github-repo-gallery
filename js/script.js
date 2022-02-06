// target overview div - where profile info will appear
const overview = document.querySelector('.overview'); // repo div
const repoList = document.querySelector('.repo-list'); // repo ul
const allReposContainer = document.querySelector('.repos'); // repos section
const repoData = document.querySelector('.repo-data'); // repo data section
const backBtn = document.querySelector('.view-repos'); // back to repo gallery button
const filterInput = document.querySelector('.filter-repos'); // filter/search by name input

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
  filterInput.classList.remove('hide');
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
  // filterInput.value = '';
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
  allReposContainer.classList.add('hide');
  backBtn.classList.remove('hide'); // unhide the back to repo button
  const repoDiv = document.createElement('div');
  repoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(', ')}</p>
      <a class='visit' href='${repoInfo.svn_url}' target='_blank' rel='noreferrer noopener'>View Repo on GitHub!</a>`
  repoData.append(repoDiv);
}

// back button click event handler
backBtn.addEventListener('click', () => {
  allReposContainer.classList.remove('hide'); // unhide repos section
  repoData.classList.add('hide'); // hide individual repo details
  backBtn.classList.add('hide'); // hide back to repo galery button
  // filterInput.value = '';
})

// dynamic repo search - input element
filterInput.addEventListener('input', (e) => {
  const searchText = e.target.value; // get the text from search input
  const repos = document.querySelectorAll('.repo'); // all repo elements on the page
  const searchTextLowerCase = searchText.toLowerCase(); // searchText lowercased

  for (let repo of repos) { // loop over all the repos on the page
    const repoTextLowerCase = repo.innerText.toLowerCase(); // get lowercased repo name
    if (repoTextLowerCase.includes(searchTextLowerCase)) { // check for matches
      repo.classList.remove('hide'); // show matching repos
    } else {
      repo.classList.add('hide'); // hide non-matching repos
    }
  }

})

// Ensure search filter box is reset on subsequent page loads
filterInput.value = '';
filterInput.ariaPlaceholder = 'Search by name';