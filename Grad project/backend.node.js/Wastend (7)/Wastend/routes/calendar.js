const express = require('express');
const router = express.Router();
const calendarcontroller = require('../controllers/calendarController');


// Route for creating a calendar entry
router.post('/calendar/:supplierId', calendarcontroller.createCalendarEntry);

// Route for getting all calendar entries for a supplier
router.get('/calendar/:supplierId', calendarcontroller.getCalendarEntries);


//Route for pick-up day
router.post('/:supplierId', calendarcontroller.PickUpSchedule);

module.exports = router;