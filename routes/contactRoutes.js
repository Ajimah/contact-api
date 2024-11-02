const express = require('express');
const router = express.Router();
const {getContact, getContacts , createContact , updateContact, deleteContact} = require("../controllers/contactControllers.js");
const validateToken = require('../middleware/validateTokenHandler.js');



router.use(validateToken);

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").get(getContact);

router.route("/:id").delete(deleteContact);



module.exports = router;