import Product from '../models/products.js';


//add a new product
export const addNewProduct = async (req, res) => {
    const { name, description, quantity, price, category, location, images } = req.body;
  
    // Check if all required fields are provided
    if (!name || !quantity || !price || !category) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
  
    try {
      const newProduct = new Product({
        name,
        description,
        quantity,
        price,
        category,
        location,
        images,
        createdBy: req.user.id,
      });
  
      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateProductById = async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity, price, category, location, images } = req.body;
  
    try {
      // Find the product by ID
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
  
      // Ensure only the creator can update
      if (product.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ error: 'You do not have permission to update this product' });
      }
  
      // Update product details
      product.name = name || product.name;
      product.description = description || product.description;
      product.quantity = quantity || product.quantity;
      product.price = price || product.price;
      product.category = category || product.category;
      product.location = location || product.location;
      product.images = images || product.images;
  
      await product.save();
      res.json({ message: 'Product updated successfully', product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const deleteProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
  
      // Ensure only the creator can delete
      if (product.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ error: 'You do not have permission to delete this product' });
      }
  
      await product.remove();
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getAndFilterProducts = async (req, res) => {
    const { category, location, sort } = req.query;
  
    try {
      const filter = {};
      if (category) filter.category = category;  // Filter by category
      if (location) filter.location = location;  // Filter by location
  
      // Sorting options (price and date added)
      let sortOption = {};
      if (sort === 'price-asc') sortOption.price = 1;   // Low to high
      if (sort === 'price-desc') sortOption.price = -1; // High to low
      if (sort === 'newest') sortOption.dateAdded = -1; // Newest first
  
      // Fetch and filter products
      const products = await Product.find(filter).sort(sortOption);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };