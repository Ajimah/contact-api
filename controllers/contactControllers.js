const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel')

// get all contact

const getContacts = asyncHandler(async(req , res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//create contact

const createContact = asyncHandler( async (req , res) => {

    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error ("all fields are required");
    }
    const contact = await Contact.create({name, email, phone, user_id: req.user.id});

    res.status(201).json(contact);
    console.log(contact);
});

//update contact

const updateContact = asyncHandler( async (req , res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error ("contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("user dont have permission to update another user contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(201).json(updatedContact);
});

//get individual contact
const getContact = asyncHandler( async (req , res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error ("contact not found");
    }
    res.status(201).json(contact);
});


const deleteContact = asyncHandler( async (req , res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error ("contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("user dont have permission to update another user contact");
    }
    await Contact.deleteOne({_id:req.params.id})
    res.status(201).json(contact);
});


module.exports = {getContact, createContact, updateContact, getContacts, deleteContact};