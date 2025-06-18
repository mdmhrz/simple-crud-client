import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {

    const user = useLoaderData();
    console.log(user);

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = { name, email };

        // update User info in the DB

        fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        }).then(res => res.json()).then(data => {
            if (data.modifiedCount) {

                console.log('Update Done', data);
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name="name" defaultValue={user.name} id="" />
                <br />
                <input type="email" name="email" defaultValue={user.email} id="" />
                <br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default UpdateUser;