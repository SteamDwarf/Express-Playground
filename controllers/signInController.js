const bcrypt = require('bcrypt');

const data = {
    users: require('../models/users.json'),
    setUsers: (newUsers) => {data.users = newUsers}
}

const logIn = (request, response) => {
    const {username, password} = request.body;

    if(!username || !password) {
        return response.status(400).json({"status": "400", "message": "Field username and password are required!"});
    }

    const findedUser = data.users.find((user) => user.username === username);

    if(!findedUser) {
        return response.status(400).json({"status": "400", "message": "User not found"});
    }

    const {password: hashedPassword, ...findedUserData} = findedUser;

    bcrypt.compare(password, hashedPassword)
        .then(result => result ? response.status(200).json(findedUserData) : Promise.reject())
        .catch(() => response.status(400).json({"status": "400", "message": "Invalid password"}));
    
}

module.exports = {logIn};