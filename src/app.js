const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file
// Define routes
const notesRouter = require("./routes/notes");
const categoriesRouter = require("./routes/categories");

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./path/to/your/openapi.yaml');

// Create an Express application
const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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

app.use("/notes", notesRouter);
app.use("/categories", categoriesRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
