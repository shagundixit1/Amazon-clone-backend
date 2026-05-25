import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import authRoutes from "./modules/auth/auth.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";  // ADD
import cartRoutes from "./modules/cart/cart.routes.js";


const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", routes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes); // ADD
app.use("/api/cart", cartRoutes);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Health check route
app.get("/", (req, res) => {
  res.send("APP is running");
});

export default app;