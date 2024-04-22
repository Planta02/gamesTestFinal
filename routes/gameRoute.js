const {Router} = require('express');
const { viewGame, createGame, updateGame, deleteGame, partidaPost, partidaPut, partidaDelete } = require ('../controllers/gameController');

const routerGame = Router();

routerGame.get('', viewGame);
routerGame.post('', createGame);
routerGame.post('/play', partidaPost);
routerGame.put('/:id', updateGame);
routerGame.put('/play/:id', partidaPut);
routerGame.delete('/:id', deleteGame);
routerGame.delete('/play/:id', deleteGame);

module.exports = routerGame;