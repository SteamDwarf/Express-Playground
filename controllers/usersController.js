const filesChanger = require('../utils/filesChanger');

const data = {
    users: require('../models/users.json'),
    setUsers: (newUsers) => this.users = newUsers
}

const getAllUsers = (request, response) => {
    filesChanger.readFromFile('models', 'users.json', response)
        .catch(() => {
            response.status(500).json({"status": "500", "message": "Internal server error"});
        });
};

const addNewUser = (request, response) => {
    if(!request.body.username) {
        return response.status(400).json({"status": "400", "message": "Field username is required!"});
    }

    const newId = data.users.length ? parseInt(data.users[data.users.length - 1].id) + 1 : 1;
    const newUser = {
        id: newId.toString(),
        username: request.body.username
    }
    const newUsersList = [...data.users, newUser]

    filesChanger.writeToFile('models', 'users.json', JSON.stringify(newUsersList))
        .then(() => response.status(201).json(newUser))
        .catch(() => {
            response.status(500).json({"status": "500", "message": "Internal server error"});
        });
}

const updateUser = (request, response) => {
    if(!request.body.id) {
        return response.status(400).json({"status": "400", "message": "User ID is empty"});
    }
    if(!request.body.username) {
        return response.status(400).json({"status": "400", "message": "Field username is required!"});
    }

    const changableUser = data.users.find((user) => user.id === request.body.id);

    if(!changableUser) {
        return response.status(400).json({"status": "400", "message": "User not found"});
    }

    const filteredUsers = data.users.filter(user => user.id != request.body.id);

    changableUser.username = request.body.username;

    const unsortedUsers = [...filteredUsers, changableUser];
    const sortedUsers = unsortedUsers.sort((a, b) => a.id > b.id ? 1 : -1);

    filesChanger.writeToFile('models', 'users.json', JSON.stringify(sortedUsers))
        .then(() => response.status(201).json(changableUser))
        .catch(() => {
            response.status(500).json({"status": "500", "message": "Internal server error"});
        });
}

const deleteUser = (request, response) => {
    if(!request.body.id) {
        return response.status(400).json({"status": "400", "message": "User ID is empty"});
    }

    const deletableUser = data.users.find((user) => user.id === request.body.id);

    if(!deletableUser) {
        return response.status(400).json({"status": "400", "message": "User not found"});
    }

    const filteredUsers = data.users.filter(user => user.id !== request.body.id);

    filesChanger.writeToFile('models', 'users.json', JSON.stringify(filteredUsers))
        .then(() => response.status(201).json({"id": deletableUser.id}))
        .catch(() => {
            response.status(500).json({"status": "500", "message": "Internal server error"});
        });
}

const getUser = (request, response) => {
    const requestedUser = data.users.find(user => user.id === request.params.id);

    if(!requestedUser) {
        return response.status(400).json({"status": "400", "message": "User not found"});
    }

    response.json(requestedUser);
}


module.exports = {getAllUsers, addNewUser, updateUser, deleteUser, getUser}