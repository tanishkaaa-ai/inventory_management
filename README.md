# 📦 Inventory Management Web App  

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)  
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)  
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?logo=mongodb)  


A web application to help businesses efficiently manage and monitor their product inventory.  
It provides a **centralized platform** for tracking stock levels, managing user roles, and ensuring smooth day-to-day operations.  

Designed with a focus on **usability** and **real-time updates**, the app simplifies inventory handling and improves workflow within an organization.  

---

## 🚀 Features  

- 🔐 **Role-Based Authentication** – Secure login for Admins and Staff.  
- 📊 **Dashboard Overview** – Key inventory metrics at a glance.  
- 📦 **Product Management** – Add, edit, delete products with name, barcode, category, and stock levels.  
- 🔎 **Search & Filter** – Quickly find products by name, category, or barcode.  
- ⚠️ **Low-Stock Alerts** – Automatic flagging of items running low (optional email alerts).  
- 📝 **Inventory Log** – Complete history of actions (add/edit/delete/stock update) with user role & timestamp.  
- 📤 **Data Export** – Generate Excel or PDF reports for products and logs.  
- 📈 **Charts & Visualizations** – Stock distribution and trend analysis.  

---

## 🛠 Tech Stack  

- **Frontend:** React.js  
- **Backend:** Node.js + Express  
- **Database:** MongoDB  
- **Authentication:** JWT with role-based access  
- **Reporting:** Excel/PDF export support  

---

## ⚡ Installation & Setup  

1. **Clone the repository**
   
   ```bash
   git clone https://github.com/tanishkaaa-ai/inventory_management.git
   cd inventory_management

2. **Backend setup**

   ```bash
   cd backend
   npm install
   npm start

3. **Frontend setup**

   ```bash
   cd frontend
   npm install
   npm start

 4. **Environment variables**

     Create a .env file in the backend folder:
     ```ini
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-secret-key
    EMAIL_USER=your-user-id
    EMAIL_PASS=your-user-pass

---
## 📝 Inventory Log  

- Tracks every product action (**add, edit, delete, stock update**).  
- Records: **action type, product name, user role, timestamp**.  
- Filter logs by **date/user**.  
- Export logs to **Excel/PDF** for reporting or offline records.  
 

---

## 🤝 Contributing  

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you’d like to change.
