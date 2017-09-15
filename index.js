const key = config.API_KEY;
console.log(key);
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm , callback) {

  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      key: `${key}`,
      q: `${searchTerm} in:name`,
      maxResults: 10,
      part: 'snippet'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
// console.log(settings);
$.ajax(settings);
}


function renderResult(result) {
  console.log(result);
  return `<div><a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
                  <img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.description}">
                  </a>
                <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><h3>${result.snippet.title}</h3>
                </a>
                <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">
                  <h4>by ${result.snippet.channelTitle}</h4>
                </a>
          </div>`;
    /*<div>
      <h2>
      <a class="js-result-name" href="${result.html_url}" target="_blank">${result.title}</a>
      by <a class="js-user-name" href="${result.html_url}" target="_blank">${result.login}</a>
    </h2>
      <p>Number of watchers: <span class="js-watchers-count">${result.activity}</span></p>

    </div>*/
  ;
}

function displaySearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displaySearchData);
  });
}

$(watchSubmit);
