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
  return `<div class="videoResult">
            <img role="button" class="thumbnail" data-id=${result.id.videoId} src="${result.snippet.thumbnails.medium.url}" alt="Click to watch video: ${result.snippet.title}">
            <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
              <h3>${result.snippet.title}</h3>
            </a>
            <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">
              <h4>by ${result.snippet.channelTitle}</h4>
            </a>
          </div>`
}

//render each API result in the returned array with renderResult and place it in the DOM
function displaySearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  const resultDialog = "<h2>Your search has returned 12 results:</h2>";
  $('.js-search-results').html(resultDialog);
  $('.js-search-results').html(results);
}

function waitForClicks() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();  //'query' = the value of the user's input string
    queryTarget.val("");  // clear out the input
    getDataFromApi(query, displaySearchData);
  });

  $('.js-search-results').on('click', ".thumbnail", function(event) {
    var videoId = $(this).attr("data-id"); //use the id of the selected video
    var video  = "https://www.youtube.com/embed/"+videoId; //link to embed the chosen video
    $('#video').attr("src", video);  //place link in the video div
    $('.dark').removeClass("hidden");  //then show the div
    $('.js-search-results').prop("hidden", true);
    $('h1').prop("hidden", true);
    $('form').prop("hidden", true);
  })

  $('.close-button').on('click', function(event) {
    $('.dark').addClass("hidden");
    $('#video').attr("src", "");
    $('.js-search-results').prop("hidden", false);
    $('h1').prop("hidden", false);
    $('form').prop("hidden", false);
  })
}

$(waitForClicks);
