import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { HERMES_X_SYSTEM_PROMPT } from "./server/system-prompt";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Professional style API for orchestrator settings
  app.get("/api/system/directive", (req, res) => {
    try {
      res.json({
        status: "success",
        version: "2.0",
        platform: "HERMES X Enterprise AI OS",
        directive: HERMES_X_SYSTEM_PROMPT,
      });
    } catch (e) {
      res.status(500).json({ status: "error", message: "Failed to retrieve system directive." });
    }
  });

  // Orchestrator Health
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: "autonomous", active_agents: 42 });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production logic
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HERMES X] Orchestrator Node online at port ${PORT}`);
  });
}

startServer();
