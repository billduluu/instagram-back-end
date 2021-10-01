const express = require("express");
const userModel = require("../models/users");
const app = express();
app.get("/login", async (request, response) => {
  const users = await userModel.findOne(request.body);
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.post("/register", async (request, response) => {
  const { fullname, username, email, password } = request.body;
  let user = new userModel({ fullname, username, email, password });
  try {
    if (!(email && password && fullname && username)) {
      response.status(400).send("All input is required");
    }
    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      return response.status(409).send("User Already Exist. Please Login");
    }
    await user.save();
    response.status(201);
  } catch (error) {
    response.status(500).send(error);
  }
});
module.exports = app;
