const Attendant = require('../models/attendant');

// create attendant
exports.createAttendant = async (req, res) => {
  try {
    const { name, email, staffId } = req.body;

    if(!name || email || staffId) {
      return res.status(400).json({
        message: 'Name, email and  StaffId is required',
      });
    }

    const newAttendant = new Attendant({
      name,
      email,
      staffId,
    });

    await newAttendant.save();

    res.status(201).json({
      message: 'Attendant created successfully',
      attendant: newAttendant,
    });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all attendants
exports.getAllAttendants = async (req, res) => {
  try {
    const attendants = await Attendant.find();

    res.status(200).json({ attendants });
  }
  catch (error ) {
    res.status(500).json({ message: error.message });
  }
};

// Get attendant by Id
exports.getAttendantById = async (req, res) => {
  try {
const attendant = await Attendant.findById(id).populate('issuedBooks', 'title');

    if (!attendant) {
      return res.status(404).json({ message: 'Attendant not found' });
    }

    res.status(200).json({ attendant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update attendant by ID
exports.updateAttendant = async (req, res) => {
  try {
    const updatedAttendant = await Attendant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAttendant) {
      return res.status(404).json({ message: 'Attendant not found' });
    }

    res.status(200).json({
      message: 'Attendant updated successfully',
      attendant: updatedAttendant,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete attendant by ID
exports.deleteAttendant = async (req, res) => {
  try {
    const deletedAttendant = await Attendant.findByIdAndDelete(req.params.id);

    if (!deletedAttendant) {
      return res.status(404).json({ message: 'Attendant not found' });
    }

    res.status(200).json({
      message: 'Attendant deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};