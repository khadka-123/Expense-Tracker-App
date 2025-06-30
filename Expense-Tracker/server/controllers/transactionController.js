const transactionModel=require('../models/transactionModel');
const moment=require('moment');

const getAllTransaction=async(req,res)=>{
   try {
    const {selectedDate,frequency,type,userId}=req.query;

    const transactions=await transactionModel.find({
        userId,
        ...(frequency!="custom")?{

            date:{
                $gt:moment().subtract(Number(frequency),'days').toDate(),
            },
        }:{
            date:{
                $gte:selectedDate[0],
                $lte:selectedDate[1],
            }

        },
        ...(type!='all' && {type}),
    })
   return res.status(200).json(transactions)
   } catch (error) {
   return res.status(500).json(error)
   }
}

const editTransaction=async(req,res)=>{
    try {
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload)
       return res.status(200).json("Edit Successful");
    } catch (error) {
        console.log(error)
       return res.status(500).json(error)
    }
}
const deleteTransaction=async(req,res)=>{
    try {
        await transactionModel.findOneAndDelete({_id:req.body.transactionId})
       return res.status(200).json("Transaction Deleted")
    } catch (error){
        console.log(error)
       return res.status(500).json(error)
    }
}

const addTransaction=async(req,res)=>{
    try {
        const newTransaction=new transactionModel(req.body)
        //if new transaction is found save it
        await newTransaction.save();
       return res.status(200).json("Transaction Created")
    } catch (error) {
        console.log(error)
       return res.status(500).json(error)
    }
}

module.exports={getAllTransaction,addTransaction,editTransaction,deleteTransaction}