import React, { use, useState } from 'react';
import { Link } from 'react-router';



const Users = ({ usersPromie }) => {

    const initialUsers = use(usersPromie);
    const [users, setUsers] = useState(initialUsers)
    console.log(initialUsers);

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
            if (data.insertedId) {
                newUser._id = data.insertedId;
                const newUsers = [...users, newUser];
                setUsers(newUsers)
                alert('user added successfully');
                e.target.reset();
            }
        })
    };



    const handleUserDelete = (id) => {
        console.log('delete', id);
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers)
                    console.log('after delete', data);
                }
            })
    }

    return (
        <div>

            <div>
                <h4>User: {users.length}</h4>
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
                    <Link style={{ marginRight: "10px" }} to={`/users/${user._id}`}>Details</Link>
                    <Link to={`/update/${user._id}`}>Edit</Link>

                    <button onClick={() => handleUserDelete(user._id)}>X</button>
                </p>)}
            </div>
        </div>
    );
};

export default Users;