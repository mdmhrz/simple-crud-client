import React, { use, useState } from 'react';



const Users = ({ usersPromie }) => {

    const initialUsers = use(usersPromie);
    const [users, setUsers] = useState(initialUsers)
    console.log(initialUsers);

    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const newUser = { name, email };
        // console.log(newUser);


        // create user in the DB

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newUser)

        }).then(res => res.json()).then(data => {
            console.log('Data after creating user in the DB', data);
            if (data.insertedId) {
                newUser._id = data.insertedId;
                const newUsers = [...users, newUser];
                setUsers(newUsers)
                alert('user added successfully');
                e.target.reset();
            }
        })
    };



    const handleUserDelete = () => {
        console.log('delete ');
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

            <div>
                {users.map(user => <p
                    key={user._id}>
                    {user.name}: {user.email}
                    <button>X</button>
                </p>)}
            </div>
        </div>
    );
};

export default Users;