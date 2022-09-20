const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	// find all categories
	const categoryData = await Category.findAll({ include: Product }).catch((error) => 
	{
		res.json(error);
	});
	
	res.json(categoryData);
});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try
	{
		const categoryData = await Category.findByPk(req.params.id, { include: Product });

		if(!categoryData)
		{
			res.status(404).json({ message: `No category with ID: ${req.params.id}`});
			return;
		}

		res.status(200).json(categoryData);
	}
	catch (error)
	{
		res.status(500).json(error);
	}
});

router.post('/', async (req, res) => {
	// create a new category
	try
	{
		const newCategoryData = await Category.create(req.body);
		res.status(200).json(newCategoryData);
	}
	catch (error)
	{
		res.status(400).json(error);
	}
});

router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	try
	{
		const categoryData = await Category.findByPk(req.params.id);

		if(!categoryData)
		{
			res.status(404).json({ message: `No category with ID: ${req.params.id}`});
			return;
		}

		// Update the selected category with the request body
		categoryData.set(req.body);
		await categoryData.save();

		res.status(200).json(categoryData);
	}
	catch (error)
	{
		res.status(500).json(error);
	}
});

router.delete('/:id', async (req, res) => {
	// delete a category by its `id` value
	try
	{
		const categoryData = await Category.findByPk(req.params.id);

		if(!categoryData)
		{
			res.status(404).json({ message: `No category with ID: ${req.params.id}`});
			return;
		}

		// Deleted the selected category from the database
		await categoryData.destroy();

		res.status(200).json(categoryData);
	}
	catch (error)
	{
		res.status(500).json(error);
	}
});

module.exports = router;
