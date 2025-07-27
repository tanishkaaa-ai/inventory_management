const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const Product = require('../models/product-model');
const InventoryLog = require('../models/inventoryLog-model');

exports.exportToExcel = async (req, res) => {
  try {
    console.log("📤 Exporting to Excel...");

    const products = await Product.find();
    console.log("✅ Products fetched:", products.length);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Products');

    sheet.columns = [
      { header: 'Name', key: 'name' },
      { header: 'Category', key: 'category' },
      { header: 'Quantity', key: 'stock' },
      { header: 'Barcode', key: 'barcode' },
      { header: 'Low Stock Threshold', key: 'threshold' },
    ];

    products.forEach(p => sheet.addRow(p));

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("❌ Excel export error:", err);
    console.error(err);
    res.status(500).send('Export failed');
  }
};


module.exports.exportToPDF = async function (req, res) {
  try {
    const products = await Product.find();
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=products.pdf');

    doc.pipe(res);

    doc.fontSize(20).text("Product List", { align: "center" });
    doc.moveDown();

    products.forEach(p => {
      doc.fontSize(12).text(
        `Name: ${p.name} | Category: ${p.category} | Qty: ${p.stock} | Barcode: ${p.barcode} | Threshold: ${p.lowStockThreshold}`
      );
    });

    doc.end();
  } catch (err) {
    res.status(500).send('Error exporting to PDF');
  }
};


module.exports.exportLogsExcel = async function (req, res){
  try {
    const logs = await InventoryLog.find()
      .populate("product", "name")
      .populate("userId", "name");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Inventory Logs");

    worksheet.columns = [
      { header: "Product", key: "product", width: 25 },
      { header: "Action", key: "action", width: 15 },
      { header: "Quantity", key: "quantity", width: 10 },
      { header: "User", key: "user", width: 25 },
      { header: "Timestamp", key: "timestamp", width: 25 },
      { header: "Remarks", key: "remarks", width: 30 },
    ];

    logs.forEach(log => {
      worksheet.addRow({
        product: log.product?.name || "N/A",
        action: log.action,
        quantity: log.quantity,
        user: log.userId?.name || "N/A",
        timestamp: log.timestamp.toISOString(),
        remarks: log.remarks || "-",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=inventory_logs.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Excel Export Error:", err);
    res.status(500).json({
      message: "Excel export failed",
      error: err.message,
    });
  }
};

module.exports.exportLogsPDF = async function (req, res) {
  try {
    const logs = await InventoryLog.find()
      .populate("product", "name")
      .populate("userId", "name");

    const doc = new PDFDocument({ margin: 30, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=inventory_logs.pdf");

    doc.pipe(res);

    doc.fontSize(18).text("Inventory Logs", { align: "center", underline: true });
    doc.moveDown();

    logs.forEach((log, index) => {
      doc.fontSize(12).text(`Log ${index + 1}`, { bold: true });
      doc.text(`Product: ${log.product?.name || "N/A"}`);
      doc.text(`Action: ${log.action}`);
      doc.text(`Quantity: ${log.quantity}`);
      doc.text(`User: ${log.userId?.name || "N/A"}`);
      doc.text(`Timestamp: ${log.timestamp.toISOString()}`);
      doc.text(`Remarks: ${log.remarks || "-"}`);
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    console.error("PDF Export Error:", err);
    res.status(500).json({
      message: "PDF export failed",
      error: err.message,
    });
  }
  
};
