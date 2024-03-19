const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// Your Supabase JWT secret
const JWT_SECRET =
  "yjebnyusezfXOpsjQRbg5X7dIPP3HD449VFXwuFITMbrjQi++QAX0qle2yZKL+U5rKbVVX2X7+oHroAfiQr/cQ==";

app.use(express.json());

app.post("/token", (req, res) => {
  const payload = req.body;
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    res.json({ message: "You accessed a protected route!", user });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
