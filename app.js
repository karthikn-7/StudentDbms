const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/studentDb');

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String,
    subjects: [String],
    phone: Number,
});


const Student = mongoose.model('Student', studentSchema);

// endpoints
app.post('/students', async (req, res) => {
    try{
        const student = Student(req.body);
        await student.save();
        res.send(student);
    } catch(error){
        res.status(400).send({error: error.message});
    }
});

app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.send(student);
});

app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.send({ message: 'Student deleted' });
});

app.get('/students/:id',async(req,res) => {
    const student = await Student.findById(req.params.id);
    res.send(student)
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});