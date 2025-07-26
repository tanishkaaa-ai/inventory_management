const { triggerAlert } = require("../controllers/alertController");
const isAdmin = require('../middlewares/isLoggedinadmin');

router.post("/trigger-alert", isAdmin, triggerAlert);
