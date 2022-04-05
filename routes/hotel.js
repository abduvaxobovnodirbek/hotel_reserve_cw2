const express = require('express');
const hotelControllers = require('../controllers/hotel');
const router = express.Router();

router.get('/',  hotelControllers.getHotels);
router.get('/hotel/:hotelId',  hotelControllers.getSingleHotel);
router.post('/delete-hotel',  hotelControllers.deleteSingleHotel);

router.get('/add-hotel',  hotelControllers.getAddHotel);
router.post('/add-hotel',  hotelControllers.postNewHotel);

router.get('/edit-hotel/:hotelId', hotelControllers.getEditHotel);
router.post('/edit-hotel/:hotelId', hotelControllers.postEditHotel);

module.exports = router;
