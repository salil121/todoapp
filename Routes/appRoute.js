// Importing depedencies
const express = require("express");
const Router = express.Router();
const dataModel = require("../Models/dataModel");

// To Do App Main Page
Router.get('/',async (req,res,next) => {
    try{

        const dataList = await dataModel.find({},{__v:0}); // accessing all to do's which we have saved .
        res.status(200).render("todoapp",{"dataList":dataList});

    }catch(error){
        console.log(error.message);
        res.status(error.status || 500).render("500"); // 500 for internal server error 
    }
});

// Post request to save data in database
Router.post('/addData',async (req,res,next) => {

    try{

        const {title} = req.body;

        const data = {
            title
        }

        const toDoData = new dataModel(data);
        const createdData = await toDoData.save(); // This will save the data within the database .
        res.status(200).json({message:"data created successfully ...."});

    }catch(error){
        console.log(error.message);
        res.status(error.status || 500).render("500"); // 500 for internal server error 
    }

});

// Delete request to delete all tasks with in the database 
Router.delete('/deleteAllData', async (req,res,next) => {

    try{
        const deletedAll = await dataModel.deleteMany({}); // This will delete all tabs .
        res.status(200).json({redirect:"/"});
    }catch(error){
        console.log(error.message);
        res.status(error.status || 500).render("500");
    }

});

// Delete request to delete a single task 
Router.delete('/deleteTask/:id', async (req,res,next) => {

    try{
        id = req.params.id;

        if(id.match(/^[0-9a-fA-F]{24}$/)){ // Making sure that it is same as mongodb object id .
            const deletedData = await dataModel.findByIdAndDelete(id); // Delete a tab by it's id .
            if(deletedData !== null){
                res.status(200).json({redirect:"/"});
            }else if(deletedProduct === null){
                res.status(404).json({message:"Give task id not present !!"});
            }
        }else{
            res.status(404).json({message:"Give task id not present !!"});
        }

    }catch(error){
        console.log(error.message);
        res.status(error.status || 500).render("500");
    }

});

// Update a single task .
Router.patch("/update/:id", async (req,res,next) => {

    try{
        const id = req.params.id;

        if(id.match(/^[0-9a-fA-F]{24}$/)){ // Making sure that it is same as mongodb object id .
            const update = req.body;
            const options = {new:true};
            const updatedDocument = await dataModel.findByIdAndUpdate(id,update,options); // Update a tab by it's id .
            if(updatedDocument !== null){
                res.status(200).json({redirect:"/"});
            }else if(updatedDocument === null){
                res.status(404).json({message:"Give task id not present !!"});
            }
        }else{
            res.status(404).json({message:"Give task id not present !!"});
        }

    }catch(error){
        console.log(error.message);
        res.status(error.status || 500).render("500");
    }

});

module.exports = Router;