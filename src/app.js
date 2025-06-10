// libraries
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session, { MemoryStore } from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";

import { engine } from "express-handlebars";

import path from "path";
import rootRouter from "./api/routes";
import AppConfig from "./configs/app.config";
import * as bodyParser from "body-parser";
import { Strategy } from "passport-google-oauth20";
import userRoutes from './api/modules/user/user.route';
const ROOT_FOLDER = path.join(__dirname, "..");
const SRC_FOLDER = path.join(ROOT_FOLDER, "src");

const app = express();

app.use(express.json());

/* Security request headers */
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          AppConfig.BOOTSTRAP_ICONS_CDN,
        ],
        "script-src": ["'self'", "'unsafe-inline'", AppConfig.TAILWIND_CDN],
      },
    },
  })
);

app.use(morgan("tiny"));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    saveUninitialized: false,
    secret: AppConfig.KEY_SESSION,
    store: new MemoryStore(),
    resave: true,
  })
);

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

/* Enabling CORS */
app.use(
  cors({
    origin: [process.env.MAIN_FRONTEND_URL, process.env.LOCAL_FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

/* Init passport */
app.use(passport.initialize());
app.use(passport.session());

/* Engine */

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(SRC_FOLDER, "./views"));

app.use("/api", rootRouter);
app.use('/api/auth', userRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export default app;
