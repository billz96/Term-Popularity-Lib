const termPopularity = require('./term-popularity');

const term = "mariomaker";
// const term = "MarioKart";
// const term = "Zelda";
// const term = "Pokemon";
// const term = "NintendoSwitch";
// const term = "PokemonLetsGo";
// const term = "PokemonQuest";
// const term = "PokemonGO";
termPopularity(term, (results) => {
    console.log('results: \n', results);
});