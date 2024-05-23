const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10); // Generate a salt with a complexity of 10
      const hash = await bcrypt.hash(password, salt); // Hash the password using the generated salt
      return hash; // Return the hashed password
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }

  async function exampleUsage() {
    const plainTextPassword = 'password123'; // The password to be hashed
    try {
      const hashedPassword = await hashPassword(plainTextPassword); // Hash the password
      console.log('Hashed password:', hashedPassword); // Output the hashed password
    } catch (error) {
      console.error(error.message); // Output any errors that occur during hashing
    }
  }
  

  