import mongoose from 'mongoose';

// Define the schema for 'Person'
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is required
  age: Number, // Age is optional
  favoriteFoods: [String] // Array of favorite foods (strings)
});

// Create the 'Person' model from the schema
const Person = mongoose.model('Person', personSchema);

export default Person; // Export the model for use in other files
