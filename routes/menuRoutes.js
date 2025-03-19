const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

// POST: Add new menu item
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const newItem = new MenuItem({ name, description, price });
    await newItem.save();
    res.status(201).json({ message: 'Menu item added successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET: Retrieve all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
