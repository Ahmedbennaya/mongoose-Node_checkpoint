
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Person from './models/Person.js'; // Ensure this path is correct

dotenv.config(); // Load environment variables


// Connect to MongoDB using the MONGO_URI from the .env file
mongoose.connect(process.env.MONGO_URI, {

})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

/**
 * Create and Save a New Person
 */
const createPerson = () => {
  const newPerson = new Person({
    name: 'Ahmed Bennaya',
    age: 30,
    favoriteFoods: ['Kafteji', 'Makloub']
  });

  newPerson.save()
    .then(data => console.log('Person saved:', data))
    .catch(err => console.error(err));
};

/**
 * Create Multiple People with `Model.create()`
 */
const createManyPeople = () => {
  const peopleArray = [
    { name: 'CHiheb', age: 25, favoriteFoods: ['Burgers', 'Salad'] },
    { name: 'Khaled', age: 35, favoriteFoods: ['Steak', 'Sushi'] },
    { name: 'Ghaith', age: 29, favoriteFoods: ['Tacos', 'Burritos'] }
  ];

  Person.create(peopleArray)
    .then(people => console.log('People created:', people))
    .catch(err => console.error(err));
};

/**
 * Find All People with a Given Name Using `Model.find()`
 */
const findPeopleByName = (personName) => {
  Person.find({ name: personName })
    .then(people => console.log(`People named ${personName}:`, people))
    .catch(err => console.error(err));
};

/**
 * Find One Person by Favorite Food Using `Model.findOne()`
 */
const findOneByFavoriteFood = (favoriteFood) => {
  Person.findOne({ favoriteFoods: favoriteFood })
    .then(person => console.log(`Person who likes ${favoriteFood}:`, person))
    .catch(err => console.error(err));
};

/**
 * Find a Person by their ID Using `Model.findById()`
 */
const findPersonById = (personId) => {
  Person.findById(personId)
    .then(person => console.log(`Person with ID ${personId}:`, person))
    .catch(err => console.error(err));
};

/**
 * Update a Person's Favorite Foods and Save Using `findById()`
 */
const updatePersonFavoriteFoods = (personId) => {
  Person.findById(personId)
    .then(person => {
      if (!person) throw new Error('Person not found');
      person.favoriteFoods.push('3eja');
      return person.save();
    })
    .then(updatedPerson => console.log('Updated person:', updatedPerson))
    .catch(err => console.error(err));
};

/**
 * Update a Person's Age Using `findOneAndUpdate()`
 */
const updatePersonAge = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 }, // Update age to 20
    { new: true } // Return the updated document
  )
    .then(updatedPerson => console.log(`Updated age for ${personName}:`, updatedPerson))
    .catch(err => console.error(err));
};

/**
 * Delete a Person by ID Using `findByIdAndRemove()`
 */
const deletePersonById = (personId) => {
  Person.findByIdAndRemove(personId)
    .then(deletedPerson => console.log(`Deleted person with ID ${personId}:`, deletedPerson))
    .catch(err => console.error(err));
};

/**
 * Delete All People with the Name 'Mary' Using `Model.remove()`
 */
const deletePeopleByName = (personName) => {
  Person.deleteMany({ name: personName })
    .then(result => console.log(`People removed with name ${personName}:`, result))
    .catch(err => console.error(err));
};

/**
 * Chain Search Query Helpers to Narrow Search Results
 */
const searchAndChainHelpers = () => {
  Person.find({ favoriteFoods: 'burritos' })
    .sort({ name: 1 }) // Sort by name ascending
    .limit(2) // Limit results to 2
    .select('-age') // Exclude the age field
    .exec()
    .then(people => console.log('People found:', people))
    .catch(err => console.error(err));
};

/**
 * Execute Functions to Demonstrate the Operations
 */

// Uncomment the operations you want to perform below:

 //createPerson(); // Create a single person
// createManyPeople(); // Create multiple people
// findPeopleByName('Ahmed Bennaya'); // Find people by name
//  findOneByFavoriteFood('Kafteji'); // Find one person by favorite food
// findPersonById('60d5f492be54312898c8b04a'); // Replace with actual ID
 updatePersonFavoriteFoods('66ddbe5e22e7797023b989ca'); // Replace with actual ID
// updatePersonAge('Ahmed'); // Update Ahmed's age
// deletePersonById('60d5f492be54312898c8b04a'); // Replace with actual ID
// deletePeopleByName('Ahmed'); // Delete all people named 'Ahmed'
// searchAndChainHelpers(); // Chain query helpers to find and filter data
