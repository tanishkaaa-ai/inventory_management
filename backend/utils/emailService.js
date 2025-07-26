const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail", // or use SendGrid SMTP
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendLowStockAlert(email, product) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `⚠️ Low Stock Alert: ${product.name}`,
        html: `
            <h3>Stock Alert</h3>
            <p><strong>${product.name}</strong> is below threshold.</p>
            <p>Current stock: ${product.stock} | Threshold: ${product.threshold}</p>
        `
    };

    console.log("Sending email to:", email);

    await transporter.sendMail(mailOptions);
}

module.exports = { sendLowStockAlert };
