import request from "supertest";
import app from "../app";

describe("Characters API", () => {
  it("should return a list of characters", async () => {
    const res = await request(app).get("/api/characters");
    expect(res.status).toBe(200);
    expect(res.body.items).toBeDefined();
  });

  it("should return a 500 error when external API fails", async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false })) as jest.Mock;

    const res = await request(app).get("/api/characters");
    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });
});
