const router = require('express').Router();
const reservationController = require('../controllers/reservation.controller');

router.get("/", reservationController.getAllReservation);
router.post("/", reservationController.makeReservation);
router.get("/:idReservation", reservationController.getReservation);
router.delete("/:idReservation", reservationController.deleteReservation);

module.exports = router;