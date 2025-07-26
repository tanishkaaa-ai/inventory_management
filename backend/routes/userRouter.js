const isAdmin = require('../middlewares/isLoggedinadmin');
const { setNotificationPreferences } = require("../controllers/userController");


router.post("/notification-preferences", isAdmin, setNotificationPreferences);

