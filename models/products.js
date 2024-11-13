import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },          
  description: { type: String },                   
  quantity: { type: Number, required: true },      
  price: { type: Number, required: true },         
  category: { type: String, required: true },      
  location: { type: String },                      
  images: [{ type: String }],                      
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  dateAdded: { type: Date, default: Date.now },    
});

const Product = mongoose.model('Product', productSchema);
export default Product;
