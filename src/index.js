import express from 'express';
import { PORT } from './config.js';

import { usuariosModel } from './model/usuario.model.js';
import { crearUser } from './routes/usuarios.routes.js';

import { restauranteModel } from './model/restaurantes.model.js';
import { crearRestaurantes } from './routes/restaurantes.routes.js';

const app = express();
app.use(express.json());

app.use('/user',crearUser({usuariosModel}));
app.use('/restaurant', crearRestaurantes({restauranteModel}));


app.listen(PORT, () =>{
    console.log('server runnign on port',PORT);
});
