const registrationForm = document.querySelector('#registrationForm');
const changeUsernameForm = document.querySelector('#changeUsernameForm');

let userID = null;


registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = [...new FormData(e.target)];
    const userData = {};

    formData.forEach(([key, value]) => {
        userData[key] = value;
    });

    fetch("http://localhost:5000/sign-up", { 
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => {
        userID = data.id;
        console.log(data);
    })
    .catch(error => {
        error.json()
            .then(errorData => console.error(errorData));
    });
    
})

changeUsernameForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = [...new FormData(e.target)];
    const userData = {id: userID};

    formData.forEach(([key, value]) => {
        userData[key] = value;
    });

    try {
        const  response = await fetch("http://localhost:5000/profile", { 
            method: "PUT",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        if(response.ok){
            console.log(data);
            return 
        };

        throw data;
    } catch (error) {
        console.error(error);
    }
})