const key = config.API_KEY;
console.log(key);
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm , callback) {

  const settings = {
    url: YOUTUBE_SEARCH_URL,
    key: `${key}`,
    data: {
      q: `${searchTerm} in:name`,
      per_page: 10,
      part: 'snippet'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
console.log(settings);
$.ajax(settings);
}


function renderResult(result) {
  return `<div>${result}</div>`;
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
