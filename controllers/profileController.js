const filesChanger = require('../utils/filesChanger');

const data = {
    users: require('../models/users.json'),
    setUsers: (newUsers) => {data.users = newUsers}
}

const updateUser = (request, response) => {
    const {id, username} = request.body;

    if(!id) {
        return response.status(400).json({"status": "400", "message": "User ID is empty"});
    }
    if(!username) {
        return response.status(400).json({"status": "400", "message": "Field username is required!"});
    }

    const changableUser = data.users.find((user) => user.id === request.body.id);

    if(!changableUser) {
        return response.status(400).json({"status": "400", "message": "User not found"});
    }

    const {password, ...changableUserData} = changableUser;
    const filteredUsers = data.users.filter(user => user.id != id);

    changableUserData.username = username;

    const unsortedUsers = [...filteredUsers, {...changableUserData, password}];
    const sortedUsers = unsortedUsers.sort((a, b) => a.id > b.id ? 1 : -1);

    filesChanger.writeToFile('models', 'users.json', JSON.stringify(sortedUsers))
        .then(() => response.status(200).json(changableUserData))
        .catch(() => {
            response.status(500).json({"status": "500", "message": "Internal server error"});
        });
}

module.exports = {updateUser}