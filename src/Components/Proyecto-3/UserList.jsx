
import { useState, useEffect } from "react";
import { UserService } from "../../userService";
import './userList.css'

const UserList = () => {

    const [user, setUser] = useState(

        {
            userName: "",
            userFirstSurname: "",
            userSecondSurname: "",
            userEmail: "",
            userNumber: ""
        }
    );



    const [userList, setUserList] = useState([]);


    async function getData() {

        let users = await UserService.getAllUsers();

        setUserList(users)

    }


    function handleNameChange(e) {


        setUser({ ...user, [e.target.name]: e.target.value })
    };



    async function handleAddUserToList() {

        await UserService.submitUser(user);

        setUser({
            userName: "",
            userFirstSurname: "",
            userSecondSurname: "",
            userEmail: "",
            userNumber: ""
        });

    }

    //Hace que el getData se ejecute solamente una vez
    useEffect(() => {
        getData();
      },[]);

    return (

        <>
            <section className="mainGroup">

                <div className="formulary-background">

                    <form className="formulary">

                        <div>
                            <label htmlFor="userName">Nombre:</label>
                            <input className="input" type="text" name="userName" value={user.userName} onChange={handleNameChange} />
                        </div>


                        <div className="double-column">

                            <div>
                                <label htmlFor="userFirstSurname">Primer apellido:</label>
                                <input id="first-lastname" className="input" type="text" name="userFirstSurname" value={user.userFirstSurname} onChange={handleNameChange} />
                            </div>

                            <div>
                                <label htmlFor="userSecondSurname">Segundo apellido:</label>
                                <input id="second-lastname" className="input" type="text" name="userSecondSurname" value={user.userSecondSurname} onChange={handleNameChange} />
                            </div>

                        </div>

                        <div>
                            <label htmlFor="userEmail">Correo electrónico:</label>
                            <input className="input" type="text" name="userEmail" value={user.userEmail} onChange={handleNameChange} />
                        </div>


                        <div>
                            <label htmlFor="userNumber">Número de teléfono:</label>
                            <input className="input" type="text" name="userNumber" value={user.userNumber} onChange={handleNameChange} />
                        </div>

                        <button className="send-button" onClick={handleAddUserToList}>Añadir usuario</button>

                    </form>
                </div>

                <section className="table-container">
                    <table className="whole-table">

                        <thead className="table-head">
                            <tr className="table-head-row">
                                <th>Nombre</th>
                                <th>Primer apellido</th>
                                <th>Segundo apellido</th>
                                <th>Email</th>
                                <th>Número de teléfono</th>
                            </tr>
                        </thead>

                        <tbody className="table-body">
                            {userList.map((user, index) => (
                                <tr className="table-row" key={index}>
                                    <td className="name">{user.userName}</td>
                                    <td className="first-surname">{user.userFirstSurname}</td>
                                    <td className="second-surname">{user.userSecondSurname}</td>
                                    <td className="email">{user.userEmail}</td>
                                    <td className="number">{user.userNumber}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </section>
            </section>
        </>

    )
}

export default UserList;




