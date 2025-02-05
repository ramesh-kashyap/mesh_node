const Income = require("../models/Income"); 

const roi = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const userId = req.user.id; 

    const incomes = await Income.findAll({
      where: { user_id: userId, remarks: "roi" },  
      order: [["created_at", "DESC"]],  
    });

    return res.json({ success: true, data: incomes });

  } catch (error) {
    console.error("Income Fetch Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Error fetching ROI data", 
      error: error.message 
    });
  }
};

module.exports = { roi }; // 
