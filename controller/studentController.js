const Student = require('..models/students');

// create a student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, matricNumber } = req.body;

    if (!name || !email ||matricNumber) {
      return res.status(400).json({
        message: 'Name, email, and matric number are required',
      });
    }

    const newStudent = new Student({
      name,
      email,
      matricNumber,
    });

    await newStudent.save();

    res.status(201).json({
      message: 'Student created succesfully',
      student: newStudent,
    });
  }
  catch (error) { 
    res.status(500).json({ message: error.message });
  }
};

//Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({ students });
    }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(id).populate('borrowedBooks', 'title');

    if (!student) {
      return res.status(404).json({ message: 'Student not found'});
    }

    res.status(200).json({ student});
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
};

//update student by ID
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student updated successfully',
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};