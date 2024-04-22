const request = require('supertest');
const Server = require('../models/server');
const server = new Server();

const clave = "12345"
const partidaGuardada = {
    dia:"sabado 20", 
    hora:"8pm"
}
const playId = 3;

describe('GET /api/games', () => {
    test('respuesta codigo 200', async () => {
        const response = await request(server.app).get('/api/games').send();
        expect(response.statusCode).toBe(200);
    });

    test('respuesta contiene informacion de los Juegos', async () => {
        const response = await request(server.app).get('/api/games').send();
        expect(response.text).toBe('{"msg":\"Información del juego\",\"nombre\":\"Call Of Duty 2\",\"tipo\":\"Disparos\"}');
    });
});

describe("POST /api/games", () => {

    test("statusCode Crear Juego", async () => {
        const gameData = {
            nombre: "Nuevo juego",
            tipo: "Selecciona el tipo"
        };

        const response = await request(server.app)
            .post('/api/games')
            .send(gameData);

        expect(response.statusCode).toBe(201); 
    });

    test("messageOK Crear Juego", async () => {
        const gameData = {
            nombre: "Nuevo juego",
            tipo: "Selecciona el tipo"
        };

        const response = await request(server.app)
            .post('/api/games')
            .send(gameData);

        expect(response.body).toHaveProperty('msg','Juego creado exitosamente'); 
    });

    test('Intentar crear juego sin nombre y tipo', async () => {
        const response = await request(server.app)
            .post('/api/games')
            .send({});

        expect(response.statusCode).toBe(400); 
    });

    test("Guardar partida", async () => {
        const response = await request(server.app)
            .post('/api/games/play')
            .set('Authorization', 'Bearer ' +clave)
            .send(partidaGuardada)
        
        expect(response.statusCode).toBe(201);
    });

});

describe("PUT /api/games/:id", () => {
    test("statusCode Actualizar juego existente", async () => {
        const gameId = 1;
        const updatedGame = {
            nombre: "Juego Actualizado",
            tipo: "Tipo de juego actualizado"
        };

        const response = await request(server.app)
            .put(`/api/games/${gameId}`)
            .send(updatedGame);

        expect(response.statusCode).toBe(200);
    });

    test("messageUpdated Actualizar juego existente", async () => {
        const gameId = 1;
        const updatedGame = {
            nombre: "Juego Actualizado",
            tipo: "Tipo de juego actualizado"
        };

        const response = await request(server.app)
            .put(`/api/games/${gameId}`)
            .send(updatedGame);

        expect(response.body).toHaveProperty('msg', 'Juego actualizado exitosamente'); 
        expect(response.body).toHaveProperty('nombre', updatedGame.nombre); 
        expect(response.body).toHaveProperty('tipo', updatedGame.tipo); 
    });

    test("Intento actualizar juego con datos incorrectos", async () => {
        const gameId = 1;
        const updatedGame = {
            descripcion: "Juego Actualizado"
        };

        const response = await request(server.app)
            .put(`/api/games/'${gameId}`) 
            .send(updatedGame);

        expect(response.statusCode).toBe(400); 
    });

    test("Actualizacion partida", async () => {
        const response = await request(server.app)
            .put(`/api/games/play/${playId}`)
            .set('Authorization', 'Bearer ' +clave)
            .send(partidaGuardada);
        
        expect(response.headers).toHaveProperty('content-type','application/json; charset=utf-8')
        expect(response.statusCode).toBe(200)
    })
});

describe("Delete /api/games/:id", () => {

    test("Eliminar Juego", async () => {
        const gameId = 1;
        return request(server.app)
            .delete(`/api/games/${gameId}`)
            .expect(410);
    });

    test("Eliminacion partida", async () => {
        return request(server.app)
            .delete(`/api/games/play/${playId}`)
            .set('Authorization', 'Bearer ' +clave)
            .expect(410)
    })
});