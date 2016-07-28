function showRepositories(event, data) {
  // 'this' is the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText);
  debugger;
  console.log(repos);
  var repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function getCommits(el) {
  var name = el.dataset.repo;
  var req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits")
  req.send();
}

function showCommits() {
  var commits = JSON.parse(this.responseText);
  var commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.committer.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList;
}
