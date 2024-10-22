const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./studentschema');

// Connecting to database
const query = 'mongodb+srv://an07102003:Anhbuon12@cluster0.zc871.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const db = query;
mongoose.Promise = global.Promise;

async function connectDB() {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connection successful");
    } catch (error) {
        console.log("Error!" + error);
    }
}

connectDB();

router.get('/save', async function (req, res) {
    try {
        const newStudent = new StudentModel({
            StudentId: 101,
            Name: "Sam",
            Roll: 1,
            Birthday: new Date(2001, 8, 8) // Tháng trong JavaScript bắt đầu từ 0, nên 9 là tháng 8
        });

        await newStudent.save();
        res.send("Data inserted");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error inserting data");
    }
});

router.post('/save', async function (req, res) {
    try {
        const newStudent = new StudentModel({
            StudentId: req.body.StudentId,
            Name: req.body.Name,
            Roll: req.body.Roll,
            Birthday: req.body.Birthday
        });

        await newStudent.save();
        res.send("Data inserted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error inserting data");
    }
});

router.get('/findall', async function (req, res) {
    try {
        const data = await StudentModel.find();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving data");
    }
});

router.get('/findfirst', async function (req, res) {
    try {
        const data = await StudentModel.findOne({ StudentId: { $gt: 185 } });
        if (!data) {
            return res.status(404).send("No student found with StudentId greater than 185");
        }
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving data");
    }
});

router.get('/delete', async function (req, res) {
    try {
        const data = await StudentModel.deleteOne({ StudentId: 188 });
        if (data.deletedCount === 0) {
            return res.status(404).send("No student found with StudentId 188 to delete");
        }
        res.send("Student with StudentId 188 has been deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting data");
    }
});

router.post('/delete', async function (req, res) {
    try {
        const data = await StudentModel.findByIdAndDelete(req.body.id);
        if (!data) {
            return res.status(404).send("No student found with the given ID to delete");
        }
        res.send("Student has been deleted successfully");
        console.log("Data Deleted!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting data");
    }
});

router.post('/update', async function (req, res) {
    try {
        const updatedStudent = await StudentModel.findByIdAndUpdate(
            req.body.id,
            { Name: req.body.Name },
            { new: true } // Trả về tài liệu đã cập nhật
        );

        if (!updatedStudent) {
            return res.status(404).send("No student found with the given ID to update");
        }

        res.send("Student has been updated successfully");
        console.log("Data updated!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating data");
    }
});

module.exports = router;  