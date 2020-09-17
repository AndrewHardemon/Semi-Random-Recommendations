# Semi-Random Recommendations 2.0
A group project created by Andrew, Dan, Ivanna, and Serguei

## Live Site 
https://project2beta.herokuapp.com/

### Description
Our website helps users find new content to watch or play by randomly suggesting a movie, TV show, or game based on the user’s preferences. Registering for an account allows users to save their recommendations and return to them later.

### Motivation
The idea came when we realized how often we find ourselves re-watching the same old shows and movies, replaying the same old games, or wanting to watch/play something but being unable to decide. 

### Results
Our website provides users with semi-random recommendations for movies, TV shows, and games based on selected criteria and data gathered from two APIs: The Movie Database (TMDB) and Rawg. For movies and TV,  the app searches through TMDB to make a recommendation based on type, genre, and run time. For games, the recommendation data comes from Rawg and is based on type, genre, console, and publisher. Registering for an account allows users to save their recommendations in lists and return to them later.

### Team Responsibilities
#### Andrew
  * Updated old Javascript 
  * Added trailer videos
  * Found and utilized API for game recommendations page

#### Dan
  * User Login - Passport
  * Routes
  * Database 

#### Ivanna
  * User Interface - Handlebars
  * Project presentation

#### Serguei
  * User Login - Passport
  * Database  
  * Testing - Mocha & Chai

### Improvements
In the future, we would like our website to: 
  * Include OAuth feature so they can login with existing accounts.
  * Allow users to provide the streaming services they subscribe to and only return content they already have access to.

### Logged Out
![Logged Out](ReadmeImg\SemiRandom.PNG)

### Logged In
![Logged In](ReadmeImg\SemiRandomLoggedIn.PNG)