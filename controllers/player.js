
const PlayerModel = require("../models/players")
const path = require('path')
require('dotenv').config()
const dbo = require("../db/conn.js")
const ObjectId = require("mongodb").ObjectId

const getPlayers = async (req,res) => {
    const db_connect = dbo.getDb()
    try{
        const players = await db_connect.collection("player").find({}).toArray()
        res.status(200).json(players);
    } catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const createPlayers = async (req, res) => {
     const db_connect = dbo.getDb()
     try{
          const { First_name, Last_name, Gender, Date_of_Birth, Height,
               Position, Nationality, NationalityISO, Club,
               Preferred_Foot, Status, Coach, 
               Number_of_coach, Region_scouted_in, Scouted_By, Date_Added } = req.body;

          if (!req.file) {
               return res.status(400).json({ message: 'No file uploaded' });
          }


          // Create a new image document
          const player = new PlayerModel({
               First_name, Last_name, Gender, Date_of_Birth, Height,
               Position, Nationality, NationalityISO, Club,
               Preferred_Foot, Status, Coach, Number_of_coach, Region_scouted_in, Scouted_By, Date_Added,
               Image: `${process.env.REACT_HOSTNAME}/${req.file.path}`// store the image path
          });

          await  db_connect.collection("player").insertOne(player) //req.body is request.body which means whatever the clients sends to the server must be shown in the console screen or browser
          res.status(200).json(player)
     
     } catch (error) {
          console.log(error.message )
          res.status(500).json({message: error.message})
     }
}

const updatePlayers = async (req, res) => {
     const db_connect = dbo.getDb()
     const myquery = { _id: new ObjectId(req.params.id) }
     const body = req.file ? {
          $set: {
               First_name: req.body.First_name,
               Last_name: req.body.Last_name,
               Gender: req.body.Gender,
               Date_of_Birth: req.body.Date_of_Birth,
               Position: req.body.Position,
               Height: req.body.Height,
               Nationality: req.body.Nationality,
               NationalityISO: req.body.NationalityISO,
               Club: req.body.Club,
               Preferred_Foot: req.body.Preferred_Foot,
               Status: req.body.Status,
               Coach: req.body.Coach,
               Number_of_coach: req.body.Number_of_coach,
               Region_scouted_in: req.body.Region_scouted_in,
               Scouted_By: req.body.Scouted_By,
               Image: `${process.env.REACT_HOSTNAME}/${req.file.path}`,
          }} : 
          {
               $set: {
                    First_name: req.body.First_name,
                    Last_name: req.body.Last_name,
                    Gender: req.body.Gender,
                    Date_of_Birth: req.body.Date_of_Birth,
                    Position: req.body.Position,
                    Height: req.body.Height,
                    Nationality: req.body.Nationality,
                    NationalityISO: req.body.NationalityISO,
                    Club: req.body.Club,
                    Preferred_Foot: req.body.Preferred_Foot,
                    Status: req.body.Status,
                    Coach: req.body.Coach,
                    Number_of_coach: req.body.Number_of_coach,
                    Region_scouted_in: req.body.Region_scouted_in,
                    Scouted_By: req.body.Scouted_By,
               }}

     try{
          const {id} = req.params
          const player = await  db_connect.collection("player").updateOne(myquery, body)
          
          //if we cant find any player in database
          if(!player){
               return res.status(404).json({message: "cannot find any player with ID ${id}"})
          }
          res.status(200).json(player)
     } catch(error){
          res.status(500).json({message: error.message})
     }
}

const deletePlayers = async (req, res) => {
     const db_connect = dbo.getDb()
     const id = { _id: new ObjectId(req.params.id) }
     try{
          const player = await db_connect.collection("player").deleteOne(id)
          if (!player) {
               return res.status(404).json({message: "cannot find any player with ID ${id}"})
          }
          res.status(200).json(player)
     }
     catch(error){
          res.status(500).json({message: error.message})
     }
}

module.exports = {
     getPlayers,
     createPlayers,
     updatePlayers,
     deletePlayers,
}
