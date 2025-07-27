const Product = require("../models/product-model");

module.exports.getDashboardStats = async (req, res) => {
  try {
    const categoryData = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { category: "$_id", count: 1, _id: 0 } }
    ]);

    const lowStockItems = await Product.find({ stock: { $lt: 5 } })
      .select("name stock -_id");

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const recentUpdates = await Product.aggregate([
      {
        $match: {
          updatedAt: { $gte: last7Days }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $project: { date: "$_id", count: 1, _id: 0 }
      },
      {
        $sort: { date: 1 }
      }
    ]);

    res.json({ categoryData, lowStockItems, recentUpdates });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
