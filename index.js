// After listening for a search term submission,
// this app returns video thumbnails and details
// for 12 youtube videos. The thumbnails and details
// are linked to youtube video and channel pages.

const key = 'AIzaSyC03eeAtrERD9teY5fMnSaAE26CvWO7pnQ';

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm , callback) {

  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      key: `${key}`,
      q: `${searchTerm} in:name`,
      maxResults: 12,
      part: 'snippet'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

$.ajax(settings);
}


function renderResult(result) {
console.log(result);
  return `<div class=videoResult><a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
                  <img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.description}">
                  </a>
                <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><h3>${result.snippet.title}</h3>
                </a>
                <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">
                  <h4>by ${result.snippet.channelTitle}</h4>
                </a>
          </div>`;
  ;
}

function displaySearchData(data) {
  $('.js-search-results').html(`<h2>Results:</h2>`);
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
