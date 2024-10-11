const express = require("express");
const { registerUser, getUser ,deleteUser} = require("../controllers/UserDetails");
const router = express.Router();

router.post('/register', registerUser);
router.get('/getuser', getUser);
router.delete('/deleteuser/:id', deleteUser);


module.exports = router;
