import request from "supertest";
import { connectDB } from "../src/DB/connectDB.js";
import { app } from "../src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

let server, agent, token;

describe("Evently test suite ", () => {
  beforeAll(async () => {
    await mongoose.connect(`${process.env.MONGO_DB_URL}/Evently_Test`);

    server = app.listen(3005, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    await server.close();
  });

  test("Users Can Signup", async () => {
    const res = await agent.post("/api/v1/users/signup").send({
      firstName: "Javid",
      lastName: "Sumara",
      email: "test_db@gmail.com",
      password: "12345678",
    });
    // Extract the token from the set-cookie header
    token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
    expect(res.statusCode).toBe(200);
  });

  test("Users Can Signout", async () => {
    // Set the Authorization header with the extracted token
    const res = await agent.get("/api/v1/users/logout").send({ token });

    expect(res.statusCode).toBe(200);
  });

  test("Users Can Sign In", async () => {
    const res = await agent
      .post("/api/v1/users/signin")
      .send({ email: "test_db@gmail.com", password: "12345678" });

    expect(res.statusCode).toBe(200);
  });

  test("User Can Create Event", async () => {
    let res = await agent.post("/api/v1/event/create").send({
      title: "Test Event Title",
      description: "Test Event Description",
      startDateTime: "2024-02-09T10:00:00",
      endDateTime: "2024-02-09T12:00:00",
      location: "Event Location",
      price: "Event Price",
      category: "Event Category",
      token,
    });

    expect(res.statusCode).toBe(200);

    res = await agent.get("/api/v1/event/details").send({ token });

    const data = JSON.parse(res.text)?.data;

    expect(data.length).toBe(1);
  });

  test("User Can Get Details of Specific Event by id", async () => {
    let res = await agent.get("/api/v1/event/details").send({ token });

    expect(res.statusCode).toBe(200);

    const data = JSON.parse(res.text)?.data;

    const id = data[0]?._id;

    res = await agent.get(`/api/v1/event/details/${id}`).send({ token });

    const title = JSON.parse(res.text)?.data?.title;

    expect(title).toBe("Test Event Title");
  });

  test("User Can Delete Event", async () => {
    let res = await agent.get("/api/v1/event/details").send({ token });

    const data = JSON.parse(res.text)?.data;

    expect(data.length).toBe(1);

    const id = data[0]?._id;

    res = await agent.delete(`/api/v1/event/delete/${id}`).send({ token });

    expect(res.statusCode).toBe(200);
  });

  // TODO : Write Route And Controllers for this test
  // test("User Can Delete Account", async () => {
  //   let res = await agent
  //     .post("/api/v1/users/signin")
  //     .send({ email: "test_db@gmail.com", password: "12345678" });

  //   const id = JSON.parse(res.text)?.data?._id;

  //   res = await agent.delete(`/api/v1/users/${id}`).send({ token });

  //   expect(res.statusCode).toBe(200);
  // });
});
