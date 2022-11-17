const { Router } = require("express");
const controllerUser =  require("../Controller/User_Controller")
const router = Router();


router.get('/login',controllerUser.login);
router.get('/logout',controllerUser.logout);


module.exports = router;