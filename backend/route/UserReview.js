const express = require("express");
const { userReview, getReview ,deleteReview} = require("../controllers/UserReview");
const router = express.Router();

router.post('/review', userReview); 
router.get('/getreviews', getReview); 
router.delete('/deletereview/:id', deleteReview);

module.exports = router;
