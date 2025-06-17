import React from 'react';

const Users = () => {

    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const newUser = { name, email };
        console.log(newUser);


        // create user in the DB

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newUser)

        }).then(res => res.json()).then(data => {
            console.log('Data after creating user in the DB', data);
        })
    }

    return (
        <div>

            <div>
                <form onSubmit={handleAddUser}>
                    <input type="text" name="name" id="" />
                    <br />
                    <input type="email" name="email" id="" />
                    <br />
                    <input type="submit" value="Add User" />
                </form>
            </div>
        </div>
    );
};

export default Users;