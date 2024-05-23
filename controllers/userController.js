const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

const getAllInstitutions = (req, res) => {
  UserModel.getAllInstitutions((err, institutions) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(institutions);
  });
};

const getInstitutionById = (req, res) => {
  const id = req.params.id;
  UserModel.getInstitutionById(id, (err, institution) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!institution) {
      return res.status(404).json({ message: 'Institution not found' });
    }
    res.json(institution);
  });
};

const createInstitution = (req, res) => {
  const { name, physical_code, email, phone } = req.body;
  UserModel.createInstitution(name, physical_code, email, phone, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json(result);
  });
};

const updateInstitution = (req, res) => {
  const id = req.params.id;
  const { name, physical_code, email, phone } = req.body;
  UserModel.updateInstitution(id, name, physical_code, email, phone, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(result);
  });
};

const deleteInstitution = (req, res) => {
  const id = req.params.id;
  UserModel.deleteInstitution(id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(result);
  });
};

const partiallyUpdateInstitution = (req, res) => {
  const id = req.params.id;
  const { name, physical_code, email, phone } = req.body;
  UserModel.partiallyUpdateInstitution(id, { name, physical_code, email, phone }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(result);
  });
};

router.get('/institutions', getAllInstitutions);
router.get('/institutions/:id', getInstitutionById);
router.post('/institutions', createInstitution);
router.put('/institutions/:id', updateInstitution);
router.delete('/institutions/:id', deleteInstitution);
router.patch('/institutions/:id', partiallyUpdateInstitution);

module.exports = router;
