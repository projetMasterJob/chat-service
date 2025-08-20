const express = require("express");
const request = require("supertest");

// 1) Mock du controller utilisé par chatRoutes.
//    IMPORTANT: tout est défini DANS la factory pour éviter l’erreur "out-of-scope".
jest.mock("../controllers/chatController", () => {
  const mocks = {
    getListeChat: jest.fn((req, res) =>
      res.json({ ok: "getListeChat", params: req.params })
    ),
    postAddListeChat: jest.fn((req, res) =>
      res.json({ ok: "postAddListeChat", body: req.body })
    ),
    getMessages: jest.fn((req, res) =>
      res.json({ ok: "getMessages", params: req.params })
    ),
    sendMessage: jest.fn((req, res) =>
      res.json({ ok: "sendMessage", body: req.body })
    ),
    delItemListMessage: jest.fn((req, res) =>
      res.json({ ok: "delItemListMessage", params: req.params })
    ),
    delMessage: jest.fn((req, res) =>
      res.json({ ok: "delMessage", params: req.params })
    ),
  };
  // On retourne les mocks pour que le module mocké expose ces fonctions
  return mocks;
});

// 2) On importe le router APRÈS avoir posé le mock ci-dessus
const chatRoutes = require("../routes/chatRoutes");

// 3) On récupère les mocks exportés par la factory pour faire des expect()
const controller = require("../controllers/chatController");

// Fabrique l'app Express montée avec /api/chat
function makeApp() {
  const app = express();
  app.use(express.json());
  app.use("/api/chat", chatRoutes);
  return app;
}

describe("routes/chatRoutes", () => {
  let app;

  beforeEach(() => {
    app = makeApp();
    jest.clearAllMocks();
  });

  test("GET /api/chat/list/:user_id -> getListeChat", async () => {
    const res = await request(app).get("/api/chat/list/123");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: "getListeChat", params: { user_id: "123" } });

    expect(controller.getListeChat).toHaveBeenCalledTimes(1);
    expect(controller.getListeChat.mock.calls[0][0].params.user_id).toBe("123");
  });

  test("POST /api/chat/list -> postAddListeChat", async () => {
    const body = { user_id: "u1", company_id: "c1" };
    const res = await request(app).post("/api/chat/list").send(body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: "postAddListeChat", body });

    expect(controller.postAddListeChat).toHaveBeenCalledTimes(1);
    expect(controller.postAddListeChat.mock.calls[0][0].body).toEqual(body);
  });

  test("GET /api/chat/:chat_id -> getMessages", async () => {
    const res = await request(app).get("/api/chat/abc-123");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: "getMessages", params: { chat_id: "abc-123" } });

    expect(controller.getMessages).toHaveBeenCalledTimes(1);
    expect(controller.getMessages.mock.calls[0][0].params.chat_id).toBe("abc-123");
  });

  test("POST /api/chat -> sendMessage", async () => {
    const body = { chat_id: "abc-123", sender_id: "u1", content: "Hello" };
    const res = await request(app).post("/api/chat").send(body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: "sendMessage", body });

    expect(controller.sendMessage).toHaveBeenCalledTimes(1);
    expect(controller.sendMessage.mock.calls[0][0].body).toEqual(body);
  });

  test("DELETE /api/chat/list/:chat_id -> delItemListMessage", async () => {
    const res = await request(app).delete("/api/chat/list/abc-123");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      ok: "delItemListMessage",
      params: { chat_id: "abc-123" },
    });

    expect(controller.delItemListMessage).toHaveBeenCalledTimes(1);
    expect(controller.delItemListMessage.mock.calls[0][0].params.chat_id).toBe("abc-123");
  });

  test("DELETE /api/chat/:message_id -> delMessage", async () => {
    const res = await request(app).delete("/api/chat/msg-777");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      ok: "delMessage",
      params: { message_id: "msg-777" },
    });

    expect(controller.delMessage).toHaveBeenCalledTimes(1);
    expect(controller.delMessage.mock.calls[0][0].params.message_id).toBe("msg-777");
  });
});
