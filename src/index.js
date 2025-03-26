import express from 'express';
import { PORT } from './config.js';
import cookieParser from 'cookie-parser';

import { menuModel } from './model/menus.modl.js';
import { crearMenu } from './routes/menus.routes.js';

import { usuariosModel } from './model/usuario.model.js';
import { crearUser } from './routes/usuarios.routes.js';

import { restauranteModel } from './model/restaurantes.model.js';
import { crearRestaurantes } from './routes/restaurantes.routes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/restaurante',crearRestaurantes({restauranteModel}));
app.use('/user',crearUser({usuariosModel}));
app.use('/menu',crearMenu({menuModel}))


app.listen(PORT, () =>{
    console.log('server runnign on port',PORT);
});

