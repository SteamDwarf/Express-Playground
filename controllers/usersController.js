const filesChanger = require('../utils/filesChanger');

const data = {
    users: require('../models/users.json'),
    setUsers: (newUsers) => {data.users = newUsers}
}

const getAllUsers = (request, response) => {
    filesChanger.readFromFile('models', 'users.json', response)
        .catch(() => {
            response.status(500).json({"status": "500", "message": "Internal server error"});
        });
};

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


module.exports = {getAllUsers, deleteUser, getUser}