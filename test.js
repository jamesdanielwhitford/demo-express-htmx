// if env variable x == True make 
if (process.env.x == 'pizza') {
    document.querySelector('h1').innerHTML = 'Pizza Reccomendations';
  } else {
    document.querySelector('h1').innerHTML = 'Book Reccomendations';
  }