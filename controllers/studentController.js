var StudentModel = require('../models/student');
studentModel = new StudentModel();
var RequestHelper = require('./requestHelper');
const path = require("path");



// Display list of all students.
exports.student_list = function(req, res) {

    try{
        pageParameters = RequestHelper.readPageParameters(req.query);
        filterParameters = RequestHelper.readFilterParameters(req.query);
        sortParameters = RequestHelper.readSortParameters(req.query);
    
        studentResponse = studentModel.getStudents(sortParameters, pageParameters, filterParameters);
        studentResponse.success = true;
        result = studentResponse;
    } catch (ex) {      
        console.log(ex);
        result = {success:'false', errorMessages: ex}
        res.status(400);
    }
    
	res.send(result);	
};

// Display detail page for a specific student.
exports.student_detail = function(req, res) {
    try{
        student = studentModel.getStudentById(req.params.id);
        result = {success:'true', data: student}
    } catch (ex) {      
        result = {success:'false', errorMessages: ex}
        res.status(400);
    }
	res.send(student);
};

// Delete a specific student.
exports.student_delete = function(req, res) {
    try{
        studentModel.deleteStudentById(req.params.id);
        result = {success: 'true'}
    } catch (ex) {      
        console.log(ex);
        result = {success: 'false', errorMessages: ex}
        res.status(400);
    }
    
	res.send(result);
};

// Handle student create on POST.
exports.student_create_post = function(req, res) {

    if (!req.body) {
        result = {success: 'false', errorMessages: ['request body is missing']}
        res.status(400);
    } else { 
        try{
            console.log(req.body);
            student = this.studentModel.createStudent(req.body);
            result = {success: 'true', data: student}
            res.status(201);

        } catch (ex) {      
            console.log(ex);
            result = {success: 'false', errorMessages: ex}
            res.status(400);
        }
    }
    res.send(result);
};

//Handle student update on POST
exports.student_update_post = function(req, res) {
    if (!req.body) {
        result = {success: 'false', errorMessages: ['request body is missing']}
        res.status(400);
    } else { 
        try{

            console.log(req.body);
            student = this.studentModel.updateStudent(req.params.id, req.body);
            result = {success: 'true', data: student}
        } catch (ex) {      
            console.log(ex);
            result = {success: 'false', errorMessages: ex}
            res.status(400);
        }
    }	
    res.send(result);


}

