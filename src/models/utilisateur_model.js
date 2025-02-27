const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i  // Vérifie le format de l'email
  },
  password: {
    type: String,
    required: true
  }
});

// Méthode pour hacher le mot de passe avant de sauvegarder l'utilisateur
UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Méthode pour comparer le mot de passe
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
