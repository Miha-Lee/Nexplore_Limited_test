import app from "..";
import request from "supertest";

describe("GET /todos", () => {
  it("returns status code 200 when we get the todo items successfully", async () => {
    const res = await request(app).get("/todos");

    expect(res.statusCode).toEqual(200);
  });
});

describe("POST /todos", () => {
  it("To test if the value is a blank space value, if it is, it will still return a 200 status code since this part has already been handled on the frontend side", async () => {
    const res = await request(app).post("/todos").send({
      name: "   ",
    });

    expect(res.statusCode).toEqual(200);
  });

  it("Test the create todo item has been created successfully.", async () => {
    const res = await request(app).post("/todos").send({
      name: "demo",
    });

    expect(res.statusCode).toEqual(201);
  });
});

describe("PUT /todos/:id", () => {
  it("To test if the value is a blank space value, just like in the post request", async () => {
    const res = await request(app).put("/todos/1").send({
      name: "   ",
    });

    expect(res.statusCode).toEqual(200);
  });

  it("To test if the item can be found in the backend and test the item whether can be created or not", async () => {
    const res = await request(app).put("/todos/1").send({
      name: "demo",
    });

    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /todos/:id", () => {
  it("To test if the item can be found in the backend and test the item whether can be deleted or not", async () => {
    const res = await request(app).delete("/todos/1");

    expect(res.statusCode).toEqual(200);
  });
});
