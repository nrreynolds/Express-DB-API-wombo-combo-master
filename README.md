# Müvie Haus 2: Müvie Haurder

![](https://i.imgur.com/fzYYrwf.gif)

This gif is not relevant to the homework, but OMFG.  The way it shakes and flips itself.  I die every time.  Anyways...

Gerard Von Schtieffel is back - he wants a more robust website now that is capable of storing and showing data for movies that are currently playing at his theater.

What the client wants, the client gets.

## Setup

Where are the files? Where are the files?!?! No files.

You're going to get some more experience creating your file structure and initializing all your files, creating a server, adding middleware, and using ajax!

Treat this as a mini-project! Do some planning beforehand, review your code from today, and ask as many questions as you can about features, requirements, etc.

## Completion

There are **7 parts** to complete. 

As a reminder, when you submit the homework, make sure you are including:
* A __LINK__ to your homework (NOT SSH KEY).
* Completion out of 5.
* Comfortability out of 5.
* A win.
* A challenge.
* Whatever else is on your mind!

## Assignment

#### Features

Gerard wants his website to:
* have a landing page with: 
  * a section with movies that are currently playing at Müvie Haus on the left half of the page - these movies are saved in the database and should link to their movie show page.  Tip: feel free to seed some data for testing this section!
  * a search field (movie title) and button that will request movie information from `http://www.omdbapi.com` on the right half of the page
  * a section underneath the search field that would render the results of the movie search (movie title, poster, rating, and runtime)
  * in that section, an 'add' form that would save the movie information to a database
* have a route for each movie with:
  * all data for the movie
  * an edit form to update information about the movie
  * a delete form to remove the movie from Müvie Haus 'currently playing'

#### Approach 

You can approach the problem from many directions. Here are
possible high - level steps to follow
  - Design your ERDs, create your schema file and create the database. Seed it with some dummy
  data
  - Setup a new express app, and create all the REST routes as a
  separate router.
  - You should be creating your own API that returns JSON's on the appropriate routes.
  - You should be asychronously retrieving data from that API with ajax on the front end.
  - Create files for all of the views you will need, with some dummy
  HTML and render them from the correct routes.
  - Hook up postgres to the express application through a separate
  file.
  - Start with the landing page and render placeholder information
  - Build the search field and build the function which queries the `omdbapi`
  - Create the 'add' form that will send movie information to our server and database
  - Build the show view and allow it to edit information in your database
  - Build the delete functionality
  - Remove any placeholder information and make the app responsive to information from the database
  - Style as necessary to hit requirements and up to your design standards

#### Completion Parts

* Setup the app (e.g. file structure, schema, basic views, server.js)
* Call to `omdbapi` on landing page
* Add movie data to database
* 'Currently playing' section on landing page with movie title, image, rating, runtime, and link to show page
* Movie show page with edit form
* Delete form on movie show page
* CSS

## Bonus

#### Research the two below blocks of code:  
```
app.use(function(req,res){
  res.redirect('/');
})

app.get('*',function(req,res){
  res.redirect('/');
})
```
What do these codes do? What is the difference? Where can it be implemented in our server to fully appreciate its functionality?

-----

#### The landing page is fine, but Gerard decided that he wants this app to look good and function well for ordinary users and for admins. 
* Let's start by creating a nav-bar with a title/logo and the search form
  * A search should toggle a modal with movie information and the 'add' form, as well as a close-modal button
  * This nav-bar should be on both the landing page and the show page.
* Each movie in the 'currently playing' section should have a 'delete' form associated with the movie instead of needing to access the movie show page to delete
* User authentication
  * Add a log-in form to the nav-bar
  * Add modules, routes, and middleware as necessary in the server, link to the form
  * Create tables in PSQL as necessary and seed an 'admin' user
  * Signing in should re-route to landing page
  * Session should expire after some time
* Split functionality for guests, admin
  * Guests should not be able to see the search bar
  * Guests should not be able to see the delete buttons on the 'currently playing' section
  * Guests should not be able to access a movie show page
  * A logged in user should see a 'logout' button or form
* Change designs / CSS accordingly
