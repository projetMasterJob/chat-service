const {
    getListeChat,
    postAddListeChat,
    getMessages,
    sendMessage,
    delItemListMessage,
    delMessage,
  } = require("../controllers/chatController");
  
  const pool = require("../db/connection");
  
  // On mock la connexion DB et uuid
  jest.mock("../db/connection");
  jest.mock("uuid", () => ({ v4: jest.fn(() => "uuid-fixed") }));
  
  describe("chatController", () => {
    let req, res;
  
    beforeEach(() => {
      req = { params: {}, body: {} };
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    // ────────────────────────────────────────────────────────────────────────────
    // getListeChat
    // ────────────────────────────────────────────────────────────────────────────
    describe("getListeChat", () => {
      it("retourne la liste des chats pour un user_id", async () => {
        req.params.user_id = "123";
        const fakeRows = [{ id: 1, user_id: "123", name: "Chat Test" }];
        pool.query.mockResolvedValue({ rows: fakeRows });
  
        await getListeChat(req, res);
  
        expect(pool.query).toHaveBeenCalledWith(
          "SELECT * FROM chats WHERE user_id = $1",
          ["123"]
        );
        expect(res.json).toHaveBeenCalledWith(fakeRows);
      });
  
      it("retourne une 500 en cas d'erreur DB", async () => {
        req.params.user_id = "123";
        pool.query.mockRejectedValue(new Error("DB error"));
  
        await getListeChat(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          error: "Erreur interne du serveur",
        });
      });
    });
  
    // ────────────────────────────────────────────────────────────────────────────
    // postAddListeChat
    // ────────────────────────────────────────────────────────────────────────────
    describe("postAddListeChat", () => {
      it("insère un chat et renvoie la ligne créée", async () => {
        req.body = { user_id: "u-1", company_id: "c-1" };
        const inserted = {
          id: "uuid-fixed",
          user_id: "u-1",
          company_id: "c-1",
          created_at: "2025-08-17T09:00:00.000Z",
        };
        pool.query.mockResolvedValue({ rows: [inserted] });
  
        await postAddListeChat(req, res);
  
        expect(pool.query).toHaveBeenCalledWith(
          "INSERT INTO chats (id, user_id, company_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
          ["uuid-fixed", "u-1", "c-1"]
        );
        expect(res.json).toHaveBeenCalledWith(inserted);
      });
  
      it("retourne une 500 en cas d'erreur DB", async () => {
        req.body = { user_id: "u-1", company_id: "c-1" };
        pool.query.mockRejectedValue(new Error("insert fail"));
  
        await postAddListeChat(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          error: "Erreur interne du serveur",
        });
      });
    });
  
    // ────────────────────────────────────────────────────────────────────────────
    // getMessages
    // ────────────────────────────────────────────────────────────────────────────
    describe("getMessages", () => {
      it("retourne les messages d'un chat triés par sent_at ASC", async () => {
        req.params.chat_id = "chat-1";
        const fakeRows = [
          { id: "m1", chat_id: "chat-1", sent_at: "2025-01-01T10:00:00Z" },
          { id: "m2", chat_id: "chat-1", sent_at: "2025-01-01T10:01:00Z" },
        ];
        pool.query.mockResolvedValue({ rows: fakeRows });
  
        await getMessages(req, res);
  
        expect(pool.query).toHaveBeenCalledWith(
          "SELECT * FROM messages WHERE chat_id = $1 ORDER BY sent_at ASC",
          ["chat-1"]
        );
        expect(res.json).toHaveBeenCalledWith(fakeRows);
      });
  
      it("retourne une 500 en cas d'erreur DB", async () => {
        req.params.chat_id = "chat-1";
        pool.query.mockRejectedValue(new Error("DB error"));
  
        await getMessages(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          error: "Erreur interne du serveur",
        });
      });
    });
  
    // ────────────────────────────────────────────────────────────────────────────
    // sendMessage
    // ────────────────────────────────────────────────────────────────────────────
    describe("sendMessage", () => {
      it("insère un message et renvoie la ligne créée", async () => {
        req.body = {
          chat_id: "chat-1",
          sender_id: "user-1",
          content: "Hello",
        };
        const inserted = {
          id: "uuid-fixed",
          chat_id: "chat-1",
          sender_id: "user-1",
          content: "Hello",
          sent_at: "2025-08-17T09:00:00.000Z",
        };
        pool.query.mockResolvedValue({ rows: [inserted] });
  
        await sendMessage(req, res);
  
        expect(pool.query).toHaveBeenCalledWith(
          "INSERT INTO messages (id, chat_id, sender_id, content, sent_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
          ["uuid-fixed", "chat-1", "user-1", "Hello"]
        );
        expect(res.json).toHaveBeenCalledWith(inserted);
      });
  
      it("retourne une 500 en cas d'erreur DB", async () => {
        req.body = { chat_id: "chat-1", sender_id: "user-1", content: "Hello" };
        pool.query.mockRejectedValue(new Error("insert fail"));
  
        await sendMessage(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          error: "Erreur interne du serveur",
        });
      });
    });
  
    // ────────────────────────────────────────────────────────────────────────────
    // delItemListMessage
    // ────────────────────────────────────────────────────────────────────────────
    describe("delItemListMessage", () => {
      it("supprime un chat et renvoie message si trouvé", async () => {
        req.params.chat_id = "chat-1";
        pool.query.mockResolvedValue({ rowCount: 1 });
  
        await delItemListMessage(req, res);
  
        expect(pool.query).toHaveBeenCalledWith(
          "DELETE FROM chats WHERE id = $1",
          ["chat-1"]
        );
        expect(res.json).toHaveBeenCalledWith({ message: "Item supprimé" });
      });
  
      it("renvoie 404 si aucun chat supprimé", async () => {
        req.params.chat_id = "chat-1";
        pool.query.mockResolvedValue({ rowCount: 0 });
  
        await delItemListMessage(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Item introuvable" });
      });
  
      it("retourne une 500 en cas d'erreur DB", async () => {
        req.params.chat_id = "chat-1";
        pool.query.mockRejectedValue(new Error("delete fail"));
  
        await delItemListMessage(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          error: "Erreur interne du serveur",
        });
      });
    });
  
    // ────────────────────────────────────────────────────────────────────────────
    // delMessage
    // ────────────────────────────────────────────────────────────────────────────
    describe("delMessage", () => {
      it("supprime un message et renvoie message si trouvé", async () => {
        req.params.message_id = "msg-1";
        pool.query.mockResolvedValue({ rowCount: 1 });
  
        await delMessage(req, res);
  
        expect(pool.query).toHaveBeenCalledWith(
          "DELETE FROM messages WHERE id = $1",
          ["msg-1"]
        );
        expect(res.json).toHaveBeenCalledWith({ message: "Message supprimé" });
      });
  
      it("renvoie 404 si aucun message supprimé", async () => {
        req.params.message_id = "msg-1";
        pool.query.mockResolvedValue({ rowCount: 0 });
  
        await delMessage(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          error: "Message introuvable",
        });
      });
  
      it("retourne une 500 en cas d'erreur DB", async () => {
        req.params.message_id = "msg-1";
        pool.query.mockRejectedValue(new Error("delete fail"));
  
        await delMessage(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          error: "Erreur interne du serveur",
        });
      });
    });
  });
  