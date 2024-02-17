import "dotenv/config.js";
import request from "supertest";
import { app } from "../src/app.js";
import mongoose from "mongoose";
import fs from "fs";

let server, agent, token;

describe("Evently test suite ", () => {
  beforeAll(async () => {
    await mongoose.connect(`mongodb://localhost:27017/Evently_Test`);

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
      userName: "Javid Sumra",
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
    // Read the image file as a Buffer
    const imageBuffer = fs.readFileSync(__dirname + "/TEST_Image.png");

    let res = await agent
      .post("/api/v1/event/create")
      .field({
        title: "Test Event Title",
        description: "Test Event Description",
        startDateTime: "2024-02-09T10:00:00",
        endDateTime: "2024-02-09T12:00:00",
        location: "Event Location",
        price: "Event Price",
        category: "Event Category",
        token,
      })
      .attach("Image", imageBuffer, "TEST_Image.png");

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

  test("User Can Update Event Details", async () => {
    let res = await agent.get("/api/v1/event/details").send({ token });

    expect(res.statusCode).toBe(200);

    let id = JSON.parse(res.text)?.data[0]?._id;

    res = await agent.put(`/api/v1/event/update/${id}`).send({
      title: "Updated Title",
      description: "Test Event Description",
      startDateTime: "2024-02-09T10:00:00",
      endDateTime: "2024-02-09T12:00:00",
      location: "Event Location",
      price: "Event Price",
      category: "Event Category",
      token,
    });

    expect(res.statusCode).toBe(200);

    res = await agent.get(`/api/v1/event/details/${id}`).send({ token });

    const title = JSON.parse(res.text)?.data?.title;

    expect(title).toBe("Updated Title");
  });

  test("User Can Delete Event", async () => {
    let res = await agent.get("/api/v1/event/details").send({ token });

    const data = JSON.parse(res.text)?.data;

    expect(data.length).toBe(1);

    const id = data[0]?._id;

    res = await agent.delete(`/api/v1/event/delete/${id}`).send({ token });

    expect(res.statusCode).toBe(200);
  });

  test("User Can Delete Account", async () => {
    let res = await agent
      .post("/api/v1/users/signin")
      .send({ email: "test_db@gmail.com", password: "12345678" });

    const id = JSON.parse(res.text)?.data?._id;

    res = await agent.delete(`/api/v1/users/delete/${id}`).send({ token });

    expect(res.statusCode).toBe(200);
  });
});
