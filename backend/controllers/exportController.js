const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const Product = require('../models/productModel');

module.exports.exportToExcel = async function (req, res) {
  try {
    const products = await Product.find();
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Products');

    sheet.columns = [
      { header: 'Name', key: 'name' },
      { header: 'Category', key: 'category' },
      { header: 'Quantity', key: 'quantity' },
      { header: 'Barcode', key: 'barcode' },
      { header: 'Low Stock Threshold', key: 'threshold' }
    ];

    sheet.addRows(products);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).send('Error exporting to Excel');
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
        `Name: ${p.name} | Category: ${p.category} | Qty: ${p.quantity} | Barcode: ${p.barcode} | Threshold: ${p.lowStockThreshold}`
      );
    });

    doc.end();
  } catch (err) {
    res.status(500).send('Error exporting to PDF');
  }
};





