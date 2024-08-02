const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/bfhl", (req, res) => {
  const { data } = req.body;
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: "DineshSaiSandeepDesu_18072003",
      email: "dineshsaisandeep_desu@srmap.edu.in",
      roll_number: "AP21110011517",
      numbers: [],
      alphabets: [],
      highest_alphabet: [],
    });
  }

  const nums = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highestAlphabet =
    alphabets.sort((a, b) =>
      b.toLowerCase().localeCompare(a.toLowerCase())
    )[0] || null;

  res.json({
    is_success: true,
    user_id: "DineshSaiSandeepDesu_18072003",
    email: "dineshsaisandeep_desu@srmap.edu.in",
    roll_number: "AP21110011517",
    numbers: nums,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
  });
});

app.get("/bfhl", (req, res) => {
  res.json({
    operation_code: 1,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
