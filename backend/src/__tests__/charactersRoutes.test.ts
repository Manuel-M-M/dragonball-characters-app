import request from "supertest";
import app from "../app";

describe("Characters API", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return a list of characters", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: [{ id: 1, name: "Goku" }] }),
      })
    ) as jest.Mock;

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

  it("should return a single character", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            name: "Goku",
            image: "https://dragonball-api.com/characters/goku.png",
          }),
      })
    ) as jest.Mock;

    const res = await request(app).get("/api/characters/1");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe("Goku");
  });

  it("should return 500 if character is not found", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(null),
      })
    ) as jest.Mock;

    const res = await request(app).get("/api/characters/999");
    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });
});
