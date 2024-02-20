const router = require('express').Router();
const reservationController = require('../controllers/reservationController');

router.get("/", reservationController.getAllReservation);
router.post("/", reservationController.makeReservation);
router.get("/:idReservation", reservationController.getReservation);
router.delete("/:idReservation", reservationController.deleteReservation);

module.exports = router;