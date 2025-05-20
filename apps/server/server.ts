import express, { Request, Response, Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./utils/zod/envSchema";
import authRouter from "./routes/auth/auth.route";
import accountRouter from "./routes/account/account.route";
import usersRouter from "./routes/users.route";
import countriesRouter from "./routes/countries.route";

const app: Express = express();

// CORS setup
const corsOptions = {
  origin: env.WEBAPP_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
app.use(cors(corsOptions));

// Parsing
app.use(express.json());
app.use(cookieParser());

// Route handlers
app.use("/api/auth", authRouter);
app.use("/api/account", accountRouter);
app.use("/api/users", usersRouter);
app.use("/api/countries", countriesRouter);

// Welcome route
app.get("/", (_: Request, res: Response) => {
  res.status(200).send("Welcome to the Nomad Hub API");
});

app.listen(env.PORT, () => {
  console.log(`[server] Server running on port: ${env.PORT}`);
});
