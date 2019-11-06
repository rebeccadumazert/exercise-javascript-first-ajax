function fetchQuestions(nbQuestion = 1, level = 'medium', type = 'multiple') {
  const questionPromise = axios.get('https://opentdb.com/api.php', {
    params: {
      amount: nbQuestion,
      difficulty: level,
      type,
    },
  });
  questionPromise
    .then(result =>
      console.log(result.data.results.map(({ question }) => question))
    )
    .catch(e => console.error(e));
}
// fetchQuestions(3, 'medium');

function forwardGeocoding(address, returnFormat) {
  const questionPromise = axios.get(`https://geocode.xyz/${address}`, {
    params: {
      [returnFormat]: 1,
    },
  });
  questionPromise
    .then(result => console.log(result.data))
    .catch(e => console.error(e));
}
// forwardGeocoding('tour+eiffel+Paris', 'json');

function reverseGeocoding(latitud, longitud, returnFormat = 'json') {
  const questionPromise = axios.get(
    `https://geocode.xyz/${latitud},${longitud}`,
    {
      params: {
        geoit: returnFormat,
      },
    }
  );
  questionPromise
    .then(result => console.log(result.data))
    .catch(e => console.error(e));
}
// reverseGeocoding(48.8663, 2.38367);

function sentimentAnalysis(text) {
  axios.post(
    `https://geocode.xyz`,
    {
      scantext: text,
      geoit: 'json',
      sentiment: 'analysis',
    },
    {
      headers: {
        'content-type': 'application/json',
      },
      crossDomain: true,
      preflightContinue: true,
    }
  );
  questionPromise
    .then(result => console.log(result.data))
    .catch(e => console.error(e));
}

// sentimentAnalysis(
//   'hello coucou love hate war peace , whats my sentiment now ????? '
// );

function randomChuck(category) {
  axios
    .get(
      `https://api.chucknorris.io/jokes/random${
        category ? '?category=' + category : ''
      }`
    )
    .then(result => console.log(result.data))
    .catch(e => console.error(e));
}
// randomChuck();

function searchChuckNorrisFact(text) {
  axios
    .get(`https://api.chucknorris.io/jokes/search?query=${text}`)
    .then(result => console.log(result.data))
    .catch(e => console.error(e));
}
// searchChuckNorrisFact('sun');

function getTopHackerNewsStories() {
  axios
    .get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(({ data }) => console.log(data))
    .catch(e => console.error(e));
}
// getTopHackerNewsStories();

function getHackerNewsTitleById(id) {
  axios
    .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    .then(({ data: { title } }) => console.log(title))
    .catch(e => console.error(e));
}
// getHackerNewsTitleById(21460457);

function getTopStoriesTitle() {}

function getBikeInCity(city) {
  axios
    .get('http://api.citybik.es/v2/networks')
    .then(({ data: { networks } }) => networks)
    .then(networks =>
      networks.find(
        ({ location: { city: networkCity } }) => networkCity === city
      )
    )
    .then(({ id }) => id)
    .then(id => axios.get(`http://api.citybik.es/v2/networks/${id}`))
    .then(
      ({
        data: {
          network: { stations },
        },
      }) => stations
    )
    .then(stations =>
      stations.map(({ name, free_bikes: freeBikes }) => ({ name, freeBikes }))
    )
    .then(stationsNames => console.log(stationsNames))
    .catch(e => console.error(e));
}

// getBikeInCity('Paris');

function getHouses() {
  axios
    .get('https://www.anapioficeandfire.com/api/houses')
    .then(house => console.log(house.data));
}

getHouses();

function getMembersOfHouseById(id) {
  axios
    .get(`https://www.anapioficeandfire.com/api/houses/${id}`)
    .then(house => house.data)
    .then(house => house.swornMembers)
    .then(membersUrls =>
      membersUrls.map(memberUrl =>
        axios.get(memberUrl).then(({ data: { name } }) => console.log(name))
      )
    );
}
// getMembersOfHouseById(4);
