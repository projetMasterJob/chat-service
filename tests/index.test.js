const request = require("supertest");

// Recharger l'app après avoir installé les mocks
function loadAppWithMocks({ chatRouterImpl, dbQueryImpl }) {
  jest.isolateModules(() => {
    // Mock du router /api/chat
    jest.doMock("../routes/chatRoutes", () => {
      const express = require("express");
      // Si on fournit une implémentation custom, on l'utilise; sinon, router basique
      if (typeof chatRouterImpl === "function") {
        return chatRouterImpl(express);
      }
      const router = express.Router();
      // Route factice pour vérifier le montage
      router.get("/__ping", (req, res) => res.json({ ok: true }));
      return router;
    });

    // Mock de la DB
    jest.doMock("../db/connection", () => {
      return {
        query: dbQueryImpl || jest.fn().mockResolvedValue({ rows: [{ now: "2025-08-17T09:00:00Z" }] })
      };
    });

 
    // IMPORTANT: le chemin doit être identique à celui utilisé en prod
    // index.js -> module.exports = app;
    module.exports.app = require("../api/index");
  });

  // On récupère l'app exposée
  return module.exports.app;
}

describe("index.js (app Express)", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("GET / doit répondre avec le message d'accueil", async () => {
    const app = loadAppWithMocks({});
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello depuis Express sans Sequelize sur Vercel !");
  });

  describe("GET /api/test-db", () => {
    test("retourne la date NOW() quand la DB répond", async () => {
      const dbQueryMock = jest.fn().mockResolvedValue({ rows: [{ now: "2025-08-17T09:00:00Z" }] });
      const app = loadAppWithMocks({ dbQueryImpl: dbQueryMock });

      const res = await request(app).get("/api/test-db");
      expect(res.status).toBe(200);
      expect(dbQueryMock).toHaveBeenCalledWith("SELECT NOW()");
      expect(res.body).toEqual({ now: "2025-08-17T09:00:00Z" });
    });

    test("retourne 500 et un message d'erreur quand la DB échoue", async () => {
      const dbQueryMock = jest.fn().mockRejectedValue(new Error("Boom"));
      const app = loadAppWithMocks({ dbQueryImpl: dbQueryMock });

      const res = await request(app).get("/api/test-db");
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "DB error");
      expect(res.body).toHaveProperty("details", "Boom");
    });
  });

  test("le router /api/chat est bien monté (route factice /__ping)", async () => {
    // Router mock avec route GET /__ping
    const chatRouterImpl = (express) => {
      const r = express.Router();
      r.get("/__ping", (req, res) => res.json({ ok: true, scope: "chat" }));
      return r;
    };

    const app = loadAppWithMocks({ chatRouterImpl });

    const res = await request(app).get("/api/chat/__ping");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true, scope: "chat" });
  });
});
