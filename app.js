let elapsedTime = document.querySelector("#elapsed");
let homeTeamLogo = document.querySelector("#homeLogo");
let homeTeamName = document.querySelector("#homeName");
let awayTeamLogo = document.querySelector("#awayLogo");
let awayTeamName = document.querySelector("#awayName");
let lastMatchGoals = document.querySelector("#goals");
let matchTable= document.querySelector("#matchTable");


function addMatchTile(data) {
    let matchTile = document.createElement('div');
    matchTile.classList.add("match-tile");

    // home team

    let homeTeam = document.createElement('div');
    homeTeam.classList.add('team');

    let homeTileLogo = document.createElement('img');
    let homeTileName = document.createElement('p');
    homeTileLogo.src = data['teams']['home']['logo'];
    homeTileName.innerHTML = data['teams']['home']['name'];

    // away team

    let awayTeam = document.createElement('div');
    awayTeam.classList.add('team');

    let awayTileLogo = document.createElement('img');
    let awayTileName = document.createElement('p');
    awayTileLogo.src = data['teams']['away']['logo'];
    awayTileName.innerHTML = data['teams']['away']['name'];

    homeTeam.appendChild(homeTileLogo);
    homeTeam.appendChild(homeTileName);
    awayTeam.appendChild(awayTileLogo);
    awayTeam.appendChild(awayTileName);

    let score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " : "+ data['goals']['away'];

    matchTile.appendChild(homeTeam);
    matchTile.appendChild(score);
    matchTile.appendChild(awayTeam);

    matchTable.appendChild(matchTile);

};




function getData() {
    fetch("https://v3.football.api-sports.io/fixtures?live=all", {
        "method" : "GET",
        "headers" : {
            "x-rapidapi-host" : "v3.football.api-sports.io",
            "x-rapidapi-key" : "6bd6e2ecbe79f3dd1c5fdd6512b5f2c2"
        }
    })
    .then(response => response.json().then(data => {
        let matchList = data['response'];
        let fixture = matchList[0]['fixture'];
        let goals = matchList[0]['goals'];
        let teams = matchList[0]['teams'];

        elapsedTime.innerHTML = fixture['status']['elapsed'] + "'";
        homeTeamLogo.src = teams['home']['logo'];
        homeTeamName.innerHTML = teams['home']['name'];
        awayTeamLogo.src = teams['away']['logo'];
        awayTeamName.innerHTML = teams['away']['name'];
        lastMatchGoals.innerHTML = goals['home'] + " : " + goals['away'];


        for(let i = 1; i<matchList.length; i++) {
            addMatchTile(matchList[i]);
        }


    }))
    .catch(err => {
        console.log(err);
    })

};

getData();