import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { AIR_OS_SYSTEM_PROMPT } from "./server/prompts/air-os";
import { HERMES_ORCHESTRATOR_V2_SYSTEM_PROMPT } from "./server/prompts/hermes-v2";

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
        platform: "HERMES Orchestrator",
        directive: HERMES_ORCHESTRATOR_V2_SYSTEM_PROMPT,
      });
    } catch (e) {
      res.status(500).json({ status: "error", message: "Failed to retrieve system directive." });
    }
  });

  // AIR-OS directive endpoint
  app.get("/api/system/air-os-directive", (req, res) => {
    try {
      res.json({
        status: "success",
        version: "1.0",
        platform: "PROTOCOL SIFT AIR-OS",
        directive: AIR_OS_SYSTEM_PROMPT,
      });
    } catch (e) {
      res.status(500).json({ status: "error", message: "Failed to retrieve system directive." });
    }
  });

  // Orchestrator Health
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: "autonomous", active_agents: 9 });
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
    console.log(`[AIR-OS] Orchestrator Node online at port ${PORT}`);
  });
}

startServer();
