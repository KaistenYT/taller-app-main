import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import clientRouter from './routes/ClientRouter.js';
import recepcionRouter from './routes/recepcionRoutes.js';
import deviceRouter from './routes/deviceRoutes.js';

async function startServer() {
  const app = express();
  const port = 3000;

  // Middlewares
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

  // Configuración de vistas
  app.set('view engine', 'ejs');

  // Rutas API (deben ir antes de las rutas de vistas)
  app.use('/api/clientes', clientRouter);
  app.use('/api/recepciones', recepcionRouter);
  app.use('/api/dispositivos', deviceRouter);

  // Ruta principal
  app.get('/', (req, res) => {
    res.render('pages/index');
  });

  // Rutas de vistas
  app.use('/clientes', clientRouter);
  app.use('/recepciones', recepcionRouter);
  app.use('/dispositivos', deviceRouter);

  // Manejo de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    if (req.path.startsWith('/api/')) {
      res.status(500).json({ 
        success: false,
        error: 'Error interno del servidor' 
      });
    } else {
      res.status(500).render('pages/error', { 
        error: 'Error interno del servidor' 
      });
    }
  });

  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

startServer();