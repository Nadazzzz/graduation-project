const CalendarEntry=require('../models/Calendar');

// Create a calendar entry for a specific day
exports.createCalendarEntry = async (req, res) => {
    const { firstDay, lastDay } = req.body;
    const supplierId = req.params.supplierId;
  
    try {
      const calendarEntry = new CalendarEntry({
        supplierId,
        firstDay,
        lastDay,
      });
  
      const createdEntry = await calendarEntry.save();
  
      res.status(201).json(createdEntry);
    } catch (error) {
      console.error('Error creating calendar entry:', error);
      res.status(500).json({ error: 'An error occurred while creating the calendar entry' });
    }
};
  
  // Get all calendar entries for a specific supplier
  exports.getCalendarEntries = async (req, res) => {
    const supplierId = req.params.supplierId;
  
    try {
      const calendarEntries = await CalendarEntry.find({ supplierId });
  
      res.json(calendarEntries);
    } catch (error) {
      console.error('Error getting calendar entries:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the calendar entries' });
    }
  };


//pick-up 
exports.PickUpSchedule = async (req, res) => {
    const supplierId = req.params.supplierId;
    try {
      const { daysOfWeek, pickUpTimes, dailyLimit } = req.body;
      const calendarEntry = new CalendarEntry({
         supplierId ,
         daysOfWeek,
          pickUpTimes,
           dailyLimit,
        });
      await calendarEntry.save();
      res.status(201).json({ message: 'Pick-up schedule created successfully', calendarEntry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};