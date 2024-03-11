const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file
// Define routes


// Create an Express application
const app = express();
// Generate OpenAPI specification


// Middleware
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
const MONGODB_URI =
  "mongodb+srv://ibousakhria:imed123!@cluster0.hml1m3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Notes-sharing app backend");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


const notesRouter = require("./routes/notes");
const categoriesRouter = require("./routes/categories");
const tagsRouter = require("./routes/tags")
// Routes
app.use("/notes", notesRouter);
app.use("/categories", categoriesRouter);
app.use("/tags", tagsRouter)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






// const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerJSDoc = require("swagger-jsdoc");
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Notes sharing app API",
//       version: "1.0.0",
//     },
//   },
//   apis: ["./routes/*.js"], // Path to the file that contains your API routes
// };

// const swaggerSpec = swaggerJSDoc(options);

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// console.log(swaggerSpec)