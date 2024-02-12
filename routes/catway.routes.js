const router = require('express').Router();
const catwayController= require('../controllers/catway.controller');


router.get("/", catwayController.getAllCatways);  
router.get("/:id", catwayController.getCatway); 
router.post("/", catwayController.createCatway); 
router.put("/:id", catwayController.updateCatway); 
router.delete("/:id", catwayController.deleteCatway); 

module.exports = router;