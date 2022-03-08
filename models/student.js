var StudentDomainObject = require('../domainObject/student');
studentObject = new StudentDomainObject();
var ResponseHelper = require('./responseHelper');


//Typically the model will access a database of some type, but this is omitted in this example for simplicity
class StudentModel {
	constructor() {
		this.initialize();
	}

	//initialize the studentList with students
	initialize() {
		this.studentList = 
			[
				{ id: 1, name: 'Chris Gammill', class: 'Junior', major: 'Engineering' },
				{ id: 2, name: 'Amy Zion', class: 'Junior', major: 'Computer Science' },
				{ id: 3, name: 'Kenneth Findley', class: 'Senior', major: 'Computer Science' },
				{ id: 4, name: 'Jason Kastounis', class: 'Senior', major: 'Computer Science' },	
				{ id: 5, name: 'Adrian Goodchild', class: 'Sophmore', major: 'Art' },
				{ id: 6, name: 'Dave Payne', class: 'Freshman', major: 'Biology' },
				{ id: 7, name: 'Amy Gregory', class: 'Freshman', major: 'Biology' },
				{ id: 8, name: 'Kristi Schaffer', class: 'Senior', major: 'Engineering' },	
				{ id: 9, name: 'Kaitlun Peterson', class: 'Sophmore', major: 'Engineering' },
				{ id: 10, name: 'Brad Hammond', class: 'Sophmore', major: 'Engineering' },
				{ id: 11, name: 'Dana Agapescu', class: 'Senior', major: 'Biology' },
				{ id: 12, name: 'Stephan Olariu', class: 'Senior', major: 'Computer Science' },	
				{ id: 13, name: 'Michele Weigle', class: 'Junior', major: 'Computer Science' },
				{ id: 14, name: 'Adam du Pon', class: 'Freshman', major: 'Computer Science' },
			];

		this.nextId = this.studentList.length;
	}

	reserveAndGetNextId() {
		this.nextId++;
		return this.nextId;
	}

	getRandomGPA() {
		let minGPA = 2.0;
		let maxGPA = 4.0;
		let decimalPoints = 2;

		//Get a random number between 200 and 400
		let maxRandom = (maxGPA * (10 ** decimalPoints));
		let minRandom = (minGPA * (10 ** decimalPoints));
		let rndNumber = Math.floor(Math.random() * (maxRandom - minRandom) + minRandom);

		//Divide the rndNumber by the number of decimal points.
		return rndNumber / (10 ** decimalPoints);

	}


	//return all students
	getAllStudents() {
		return this.studentList;
	}

	getStudents(sortParameters, pageParameters, filterParameters) {

		let studentsFiltered = this.getFilteredStudents(this.studentList, filterParameters);
		let studentsSorted = this.getSortedStudents(studentsFiltered, sortParameters);
		let studentsPaged = this.getPagedStudents(studentsSorted, pageParameters);

		//Contains the number of filtered and sorted records before paging.
		let totalRecords = studentsFiltered.length;

		let response = ResponseHelper.createResponse(totalRecords, sortParameters, pageParameters, filterParameters);
		response.data = studentsPaged;
		
		return response;
	}

	getFilteredStudents(students, filterParameters) {
		//if there are no filterParameters, skip this method
		if (!filterParameters)
			return students;
		
		//First filter by class, then filter my major
		if (filterParameters.class)
			students = students.filter(function(student){return student.class.toLowerCase() == filterParameters.class.toLowerCase()});
		if (filterParameters.major)
			students = students.filter(function(student){return student.major.toLowerCase() == filterParameters.major.toLowerCase()});

		return students;
	}

	getSortedStudents(students, sortParameters) {
		//if there are no sortParameters, skip this method
		if (!sortParameters)
			return students;

		// Here I am creating a sort function to sort based on the values.
		// I am passing in the value of the array that I want to sort by; 
		// I can access that value by name using a[sortParameters.sortBy]
		// Suppose the following:
		//   let student = {name:'Ryan', major:'Computer Science'};
		//	 console.log(student['name']);
		//
		// This will return the value of the property 'name', which is 'Ryan'.
		if (sortParameters.sortOrder.toLowerCase() == 'desc')
			students = students.sort((a,b) => (a[sortParameters.sortBy] > b[sortParameters.sortBy]) ? -1 : ((b[sortParameters.sortBy] > a[sortParameters.sortBy]) ? 1 : 0));
		else 
			students = students.sort((a,b) => (a[sortParameters.sortBy] > b[sortParameters.sortBy]) ? 1 : ((b[sortParameters.sortBy] > a[sortParameters.sortBy]) ? -1 : 0));

		return students;
	}


	getPagedStudents(students, pageParameters) {
		// Assume the first page is page 1, not 0.
		let firstRecordOfPage = (pageParameters.page - 1) * pageParameters.pageSize;
		let lastRecordOfPage = pageParameters.page * pageParameters.pageSize
		//myArray.slice(param1, param2) 
		//  will return the subset of mySrray starting at param1 and ending at param2
		return students.slice(firstRecordOfPage, lastRecordOfPage);
    }

	//return the student with the specific id
	getStudentById(sid) {

		let student = this.studentList.find(student => {
			return student.id == sid;
		})

		if (!student)
			throw(['No student with this id']);

		return student;
	}

	//delete the student with the specific id
	deleteStudentById(studentId) {
		//see if the student exists first, then delete
		this.getStudentById(studentId);
		
		this.studentList = this.studentList.filter(function(student){return student.id != studentId});
	}
	
	createStudent(requestObject){

		//Use the StudentDomainObject to validate the student
		let isInsert = true;
		let studentObject = new StudentDomainObject(requestObject, isInsert);
		if (studentObject.valid == false)
			throw(studentObject.errorMessages);

		//Get the validatedStudent
		let validatedStudent = studentObject.student();

		//Use the validatedStudent to set the newStudent
		let newStudent = {id: this.reserveAndGetNextId(), name: validatedStudent.name, class: validatedStudent.class, major: validatedStudent.major};
		this.studentList.push(newStudent);

		return newStudent;
	}

	updateStudent(sid, requestObject){

		//Use the StudentDomainObject to validate the student
		let isInsert = false;
		let studentObject = new StudentDomainObject(requestObject, isInsert);
		if (studentObject.valid == false)
			throw(studentObject.errorMessages);

		//Get the validatedStudent
		let validatedStudent = studentObject.student();

		//Find the ExistingStudent
		let student = this.studentList.find(student => {
			return student.id == sid;
		})

		if (!student)
			throw(['No student with this id']);
		


		if (validatedStudent.name)
			student.name = validatedStudent.name;
		if (validatedStudent.class != null)
			student.class = validatedStudent.class;
		if (validatedStudent.major != null)
			student.major = validatedStudent.major;

		return student;
	}


}

module.exports = StudentModel;
