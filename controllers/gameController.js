const { response, request } = require('express');

const viewGame = async (req = request, res = response) => {
    res.json({
        'msg': 'Información del juego',
        'nombre' : 'Call Of Duty 2',
        'tipo' : 'Disparos'
    });
};

const createGame = (req, res = response) => {
    const { nombre, tipo } = req.body;

    if (!nombre || !tipo) {
        return res.status(400).json({
            msg: 'Nombre y tipo de juego requeridos'
        });
    }

    res.status(201).json({
        msg: 'Juego creado exitosamente', 
        nombre,
        tipo
    });
};

const updateGame = (req, res = response) => {
    const { id } = req.params;
    const { nombre, tipo } = req.body;

    if (!nombre || !tipo) {
        return res.status(400).json({
            msg: 'Nombre y tipo de juego requerido' 
        });
    }

    res.status(200).json({
        msg: 'Juego actualizado exitosamente',
        id,
        nombre,
        tipo
    });
};

const deleteGame = (req, res = response) => {
    const { id } = req.params;
    res.status(410).json({
        msg: 'Juego eliminado exitosamente',
        id
    });
};

const partidaPost = (req, res = response) => {

    //ejemplo de desestructuración de datos del body
    const { dia, hora } = req.body;

    //ejemplo de respuesta del body
    res.status(201).json({
        msg: 'post API - Partida Guardada',
        dia, 
        hora
    });
}

const partidaPut = (req, res = response) => {

    //ejemplo de desestructuracion de datos que viajan por los params
    const { id } = req.params;

    //ejemplo de respuesta del body
    res.status(200).json({
        msg: 'put API - Partida actualizada',
        id
    });
}

const partidaDelete = (req, res = response) => {
    res.status(410).json({
        msg: 'delete API - Partida Borrada'
    });
}

module.exports = {
    viewGame,
    createGame,
    updateGame,
   deleteGame,
   partidaPost,
   partidaDelete,
   partidaPut

}