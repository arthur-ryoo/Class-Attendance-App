const Student = require('../models/student');
const Course = require('../models/course');

function newStudent(req, res) {
  Student.find({}, function(err, students) {
    res.render('students/new', {
      title: 'Add Student',
      students
    });
  });
}

function create(req, res) {
  var s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Student.create(req.body, function(err, student) {
    res.redirect('/students/new');
  });
}

function addToAttend(req, res) {
  Student.findById(req.body.studentId, function(err, student) {
    student.total_points++;
    student.save(function(err) {
      console.log(err);
    });
  });
  //*********************
  Course.findById(req.params.id, function(err, course) {
    course.attendance.push(req.body.studentId);
    course.save(function(err) {
      res.redirect(`/courses/${course.id}`);
    });
  });
}

function index(req, res) {
  Student.find({}, function(err, students) {
    res.render('students/index', {
      title: 'All Students',
      students,
      user: req.user
    });
  });
}

function show(req, res) {
  Student.findById(req.params.id, function(err, student) {
    res.render('students/show', {
      title: 'Student Detail',
      student
    });
  });
}

module.exports = {
  new: newStudent,
  create,
  addToAttend,
  index,
  show
};
