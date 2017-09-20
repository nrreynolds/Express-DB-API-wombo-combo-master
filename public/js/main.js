$(() => {
  // track current state
  let currentPage = 1;
  let currentMovieSearch = '';
  let modelOpen = false;

  //Live update search!
  // when something is being typed in the main search bar
  $('.search-movies').first().keyup((e) => {
    // open the modal
    modelOpen = true;
    $('.modal').show();
    // set the search value
    currentMovieSearch = $(e.target).val();
    // focus the modal input with the current text
    $('.search-movies').last().val(currentMovieSearch).focus();
    // search the movies
    currentPage = 1;
    searchMovies();
  });

  // when something is being typed in the modal seach bar
  $('.search-movies').last().keyup((e) => {
    if ($(e.target).val().length < currentMovieSearch.length) {
      currentPage = 1;
    }
    // set the search value
    currentMovieSearch = $(e.target).val();
    $('.search-movies').first().val(currentMovieSearch);
    // search the movies
    searchMovies();
  });

  const searchMovies = ($button = false) => {
    // format the movie name 
    let movie = currentMovieSearch.split(': ');
    movie = movie[movie.length - 1].split(' ').map(function (word) {
      return encodeURIComponent(word);
    }).join('+');
    // if its done through a search button
    if ($button) {
      // add click functionality again
      $($button).one('click', (e) => {
        e.preventDefault();
        // if the modal isn't open
        if (!modelOpen) {
          // show it
          $('.modal').show();
          modelOpen = true;
        }
        // get the movie search value
        currentMovieSearch = $(e.target).parent().children().first().val();

        if (currentMovieSearch) {
          // set the other search bar to the same thing
          $('.search-movies').val(currentMovieSearch);
          searchMovies();
        }
      });
      // its a new search, set the current page back to 1
      currentPage = 1;
    }

    // create url
    const url = `http://www.omdbapi.com/?s=${movie}&page=${currentPage}&r=json&apikey=bd882057&type=movie`;



    // ajax get request
    $.ajax({
      method: 'GET',
      url: url,
      // if success
      success: function (data) {
        // render the movies
        renderMovies(data);

      },
      //else
      error: function (error) {
        // handle the error
        console.log(error);
      }
    });
  }

  // function to render the movies
  const renderMovies = (data) => {
    // empty out the results
    const $movies = $('.movie-results').empty();
    // for each movie
    data.Search.forEach(movie => {
        //create container
        const $container = $('<div>', {
            class: 'result-container',
            'data-id': data.imdbID
          })
          .appendTo($movies)
          .hide();
        // create name
        const $name = $('<h3>')
          .text(movie.Title)
          .appendTo($container);
        // create image
        const $img = $('<img>', {
            src: movie.Poster,
            class: 'modal-img'
          })
          .appendTo($container);
        // create add button
        const $add = $('<button>', {
            class: 'add-button'
          })
          .text('Add')
          .appendTo($container)
          .one('click', () => {
            // get the plot when its clicked
            getMovie(movie.imdbID, $add);
          });
        $container.fadeIn(1000);
      })
      // create the view more button
      // need to fix this up a bit so it doesn't make it if there aren't any more results
      // also would be nice to be able to go back a page
    const $more = $('<div>', {
        class: 'view-more'
      })
      .text('View More')
      .click(() => {
        console.log('click');
        currentPage++;
        searchMovies();
      })
      .appendTo($movies);
  }

  //function to get movie data
  const getMovie = (imdb, $button) => {
    const url = `http://www.omdbapi.com/?i=${imdb}&r=json&apikey=bd882057&plot=short`;

    // ajax get request
    $.ajax({
      method: 'GET',
      url: url,
      // if successful
      success: function (data) {

        console.log(data);
        // add the movie
        addMovie({
          name: data.Title,
          imdb: imdb,
          plot: data.Plot,
          img: data.Poster
        })
      },
      // else
      error: function (error) {
        // handle error
        console.log(error);
        $($button).one('click', () => {
          getMovie(imdb, $button);
        });
      }
    });
  }


  // function to add the movie
  const addMovie = (movieData, $button) => {
    // ajax request
    $.ajax({
      url: '/api/movies',
      type: 'POST',
      data: movieData,
      success: data => {
        // when added, go to the show page
        window.location.href = '/movies/' + data.id;
      },
      error: error => {
        console.log(error);
        // re-bind the click handler
        $button.one('click', () => {
          getMovie(movieData.imdb, $button);
        });
      }
    })
  }

  // function to delete movie
  const deleteMovie = ($button) => {
    const $movie = $($button).parent();
    const id = $movie.attr('data-id');
    // ajax request
    $.ajax({
      url: '/api/movies/' + id,
      type: 'DELETE',
      // on success
      success: data => {
        console.log(data);
        // remove the movie from the list
        $movie.remove();
      },
      error: err => {
        console.log(err);
        // re bind the click handler
        $($button).one('click', () => {
          deleteMovie($button);
        })
      }
    });
  }

  // function to edit a movie
  const editMovie = () => {
    // get edit data
    const id = $('.show-container').attr('data-id')
    const editData = {
        name: $('.movie-name-input').val(),
        img: $('.movie-img-input').val(),
        plot: $('.movie-plot-input').val(),
      }
      // ajax request
    $.ajax({
      url: '/api/movies/' + id,
      type: 'PUT',
      data: editData,
      success: data => {
        // change the image to match the updated image
        $('.show-img').attr('src', editData.img);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  // hide the modal
  $('.modal').hide();

  // when you click the close button
  $('.close-modal').click(() => {
    // hide the modal
    $('.modal').hide();
    modelOpen = false;
  });

  // set textareas to autogrow --
  // By: Jason Frame (jaz303)
  // Contributors:
  // Damian Pound (chinoto),
  // Oleg Tarusov (OlegTarusov),
  // Alexander Lang (langalex),
  // (LeoBlackSoul),
  // (pgaske),
  // Patrick Fisher (pwfisher)
  // https://github.com/jaz303/jquery-grab-bag/blob/master/javascripts/jquery.autogrow-textarea.js
  $('textarea').autogrow();

  // when search is clicked
  $('.search-submit').one('click', (e) => {
    // prevent default
    e.preventDefault();
    // if the model isn't open
    if (!modelOpen) {
      // open it
      $('.modal').show();
      modelOpen = true;
    }
    // set current movie search
    currentMovieSearch = $(e.target).parent().children().first().val();
    // if there is a current movie search
    if (currentMovieSearch) {
      // set the other search input
      $('.search-movies').val(currentMovieSearch);
      // search
      searchMovies(e.target);
    }
  });

  // click handler to delete
  $('.delete-movie').one('click', (e) => {
    deleteMovie(e.target);
  });


  // change handlers for editing a movie
  $('.movie-img-input').change(() => {
    editMovie();
  });
  $('.movie-plot-input').change(() => {
    editMovie();
  });
  $('.movie-name-input').change(() => {
    editMovie();
  })


});