var express = require('express');
var router = express.Router();


// Require controller modules.
var student_controller = require('../controllers/studentController');

/// STUDENT API ROUTES ///

// GET request for one student.
// GET api/students/1  - Get Student with id = 1
router.get('/students/:id', student_controller.student_detail);

// GET request for list of all student items.
// GET api/students  - Get all students
router.get('/students', student_controller.student_list);

// POST request for creating student.
// POST api/students  - Create a new student
router.post('/students', student_controller.student_create_post);

// POST request for updating student.
// POST api/students/1  - Update the student with id = 1
router.post('/students/:id', student_controller.student_update_post);

// Delete request for one student.
// DELETE /api/students/1 - Delete Student with id = 1
router.delete('/students/:id', student_controller.student_delete);


module.exports = router;