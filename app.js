const express = require('express');
const axios = require('axios'); // To make HTTP requests
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

// Pokemon search route (GET /pokemon)
app.get('/pokemon', (req, res) => {
  const pokemonName = req.query.name.toLowerCase(); // Get the name
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`; // PokeAPI URL

  axios.get(apiUrl)
    .then(response => {
      const pokemon = response.data; // Get Pokémon data from the API
      res.render('pokemon', { pokemon }); // Pass the data to your EJS template
    })
    .catch(error => {
      console.error('Error fetching Pokémon data:', error);
      res.render('error', { message: 'Pokemon not found! Try again.' });
    });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
