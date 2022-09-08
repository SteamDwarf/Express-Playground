const bcrypt = require('bcrypt');
const filesChanger = require('../utils/filesChanger');

const data = {
    users: require('../models/users.json'),
    setUsers: (newUsers) => {data.users = newUsers}
}

const addNewUser = (request, response) => {
    const {password, username} = request.body;

    if(!password || !username) {
        return response.status(400).json({"status": "400", "message": "Field username and password are required!"});
    }

    if(data.users.find(user => user.username === username)) {
        return response.status(409).json({"status": "400", "message": "This username already in use!"});
    }

    const newId = data.users.length ? parseInt(data.users[data.users.length - 1].id) + 1 : 1;
    const newUser = {
        id: newId.toString(),
        username
    }

    bcrypt.hash(password, 10)
        .then(hashedPassword => {
            return {...newUser, password: hashedPassword}
        })
        .then(user => {
            data.setUsers([...data.users, user]);
            return filesChanger.writeToFile('models', 'users.json', JSON.stringify(data.users));
        })
        .then(() => response.status(201).json(newUser))
        .catch((error) => {
            console.error(error)
            response.status(500).json({"status": "500", "message": "Internal server error"});
        });
}

module.exports = {addNewUser};