// const express = require("express");
// const cors = require("cors"); // Add this line to import cors
// const app = express();
// const PORT = process.env.PORT || 3000;

// // CORS configuration
// const allowedOrigins = ['http://localhost:3000', 'https://your-production-frontend.com'];
// app.use(cors({
//   origin: function(origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());

// app.post("/bfhl", (req, res) => {
//   const { data } = req.body;
//   if (!data || !Array.isArray(data)) {
//     return res.status(400).json({
//       is_success: false,
//       user_id: "DineshSaiSandeepDesu_18072003",
//       email: "dineshsaisandeep_desu@srmap.edu.in",
//       roll_number: "AP21110011517",
//       numbers: [],
//       alphabets: [],
//       highest_alphabet: [],
//     });
//   }

//   const nums = data.filter((item) => !isNaN(item));
//   const alphabets = data.filter((item) => isNaN(item));
//   const highestAlphabet =
//     alphabets.sort((a, b) =>
//       b.toLowerCase().localeCompare(a.toLowerCase())
//     )[0] || null;

//   res.json({
//     is_success: true,
//     user_id: "DineshSaiSandeepDesu_18072003",
//     email: "dineshsaisandeep_desu@srmap.edu.in",
//     roll_number: "AP21110011517",
//     numbers: nums,
//     alphabets: alphabets,
//     highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
//   });
// });

// app.get("/bfhl", (req, res) => {
//   res.json({
//     operation_code: 1,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  cors({
    // origin: 'http://localhost:3000',
    origin: "*",
  })
);
const PORT = process.env.PORT || 3000;

function processData(data) {
  const numbers = [];
  const alphabets = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
    }
  });

  const highestAlphabet = alphabets.length
    ? [
        alphabets.sort((a, b) =>
          a.toLowerCase() < b.toLowerCase() ? 1 : -1
        )[0],
      ]
    : [];
  return { numbers, alphabets, highestAlphabet };
}

app.post("/bfhl", (req, res) => {
  const { data } = req.body;
  if (!data || !Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid input" });
  }

  const { numbers, alphabets, highestAlphabet } = processData(data);

  const response = {
    is_success: true,
    user_id: "DineshSaiSandeepDesu_18072003",
    email: "dineshsaisandeep_desu@srmap.edu.in",
    roll_number: "AP21110011517",
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet,
  };

  res.status(200).json(response);
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
