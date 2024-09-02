const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const question = "what is the value of pie in maths ?";
const generate = async (question) => {
  try {
    const prompt = question;
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();
  } catch (error) {
    console.log("response error", error);
  }
};

app.get("/api/content", async (req, res) => {
  let data = req.body.question;
  var result = await generate(data);
  console.log(result);
  res.json({ result: result });
});

app.listen(port, () => {
  console.log(`Server is running pn port ${port}.`);
});

generate(question);
