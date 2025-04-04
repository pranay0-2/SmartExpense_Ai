require("dotenv").config(); // Ensure dotenv is loaded first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3300;

app.use(express.json());
app.use(cors());

// Debug: Check if MONGO_URI is correctly loaded
console.log("✅ Checking MONGO_URI:", process.env.MONGO_URI); // Debugging line

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined! Check your .env file.");
  process.exit(1);
}

// ✅ Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// expense schema
const expenseSchema = new mongoose.Schema({
  item: String,
  date: String, // Use Date type if needed
  amount: Number,
  category: String,
});
const Expense = mongoose.model("Expense", expenseSchema);


app.post("/add-expenses", async (req, res) => {
  try {


    const expenses = req.body; // Expecting an array
    console.log("✅ Received Data:", expenses); // Debugging

    if (!Array.isArray(expenses) || expenses.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid data format or empty array" });
    }

    const insertedExpenses = await Expense.insertMany(expenses); // Save to DB
    console.log("✅ Inserted Data:", insertedExpenses); // Debugging

    res
      .status(201)
      .json({
        message: "Expenses added successfully!",
        expenses: insertedExpenses,
      });
  } catch (error) {
    console.error("❌ Database Error:", error);
    res.status(500).json({ error: "Database Error", details: error.message });
  }
}); // Debugging line

app.get("/expenses", async (req, res) => {
  try {
    console.log("fetching..");
    const expenses = await Expense.find();
    console.log(expenses);

    console.log("✅ Fetched Data:", expenses);
    res.status(200).json(expenses);
  } catch (error) {
    console.log("error");
    console.error("❌ Error fetching expenses:", error);
    res.status(500).json({ error: "Database Error", details: error.message });
  }
});



// budget schema
const budgetSchema = new mongoose.Schema({
    monthlyIncome: Number,
    monthlyBudget: Number,
  });
  const Budget = mongoose.model("Budget", budgetSchema);
  
  app.post("/add-budget", async (req, res) => {
    try {
      const budgetData = req.body;  // Use budgetData to avoid confusion with the model
      console.log("✅ Received Data:", budgetData);  // Log the data to check
  
      // Ensure the data is an array
    //   if (!Array.isArray(budgetData) || budgetData.length === 0) {
    //     return res.status(400).json({ error: "Invalid data format or empty array" });
    //   }
  
      // Insert the data using the model
      const insertedBudget = await Budget.insertMany(budgetData);  
      console.log("✅ Inserted Data:", insertedBudget);
  
      res.status(201).json({
        message: "Budget added successfully!",
        Budget: insertedBudget,
      });
    } catch (error) {
      console.error("❌ Database Error:", error);
      res.status(500).json({ error: "Database Error", details: error.message });
    }
  });


  app.get("/budgets", async (req, res) => {
    try {
      console.log("Fetching budgets...");
      const budgets = await Budget.find();  // Fetch all budget documents
  
      console.log("✅ Fetched Data:", budgets);
      res.status(200).json(budgets);  // Respond with the fetched data in JSON format
    } catch (error) {
      console.error("❌ Error fetching budgets:", error);
      res.status(500).json({ error: "Database Error", details: error.message });
    }
  });
  





app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
