const express = require("express");
const app = express();

app.get("/get-password", (req, res) => {
  const password = process.env.MY_PASSWORD;
  res.json({ password });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
