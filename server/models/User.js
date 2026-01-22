const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFile = path.join(__dirname, '..', 'users.json');

class User {
  static readUsers() {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
  }

  static writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  }

  static findByUsername(username) {
    const users = this.readUsers();
    return users.find(u => u.username === username);
  }

  static create(username, password) {
    const users = this.readUsers();
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword });
    this.writeUsers(users);
  }

  static verifyPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
}

module.exports = User;