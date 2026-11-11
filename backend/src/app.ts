import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { globalLimiter } from './middlewares/rateLimiter';
import { errorHandler } from './middlewares/errorHandler';
import { registerRoutes } from './routes';

const app = express();

// ─── Global Middlewares ───────────────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(globalLimiter);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'KoneksiAlumni API is running',
    data: {
      runtime: 'bun',
      version: '1.0.0',
    },
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
registerRoutes(app);

// ─── Error Handler (must be last) ─────────────────────────────────────────────
app.use(errorHandler);

export default app;
