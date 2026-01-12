
import './App.css'
import {useEffect, useState} from "react";

function App() {

    const [users, setUser] = useState<{id: number}[]>([]);
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const[newPass, setNewPass] = useState<string>('');
    const [userId] = useState(0);



    useEffect(() => {
        const API_URL = 'http://localhost:3000/';

        fetch(API_URL)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
            })
            .finally(() => {
                // setLoading(false);
            });
    });



    useEffect(() => {
        const API_URL = 'http://localhost:3000/users';
        fetch(API_URL,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, pass}),
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
    }, [email, pass]);

        useEffect(() => {
            const API_URL = 'http://localhost:3000/users' + userId;
            fetch(API_URL,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({newEmail, newPass}),
            })
                .then((response) => {
                    if(!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
        }, [newEmail, newPass]);

        useEffect(() => {
            const API_URL = 'http://localhost:3000/users' + userId;
            const userIndex = users.findIndex(u => u.id === userId);
            fetch(API_URL,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userIndex),
            })
                .then((response) => {
                    if(!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
        }, []);


    return (
        <>


            <div id={"containera"}>
                <input id={"search"}
                       type="text"
                       placeholder="Email name"
                />
                <input id={"search2"}
                       type="text"
                       placeholder="Password here"
                />
                <button id={"button"} onClick={() => {
                    setEmail((document.getElementById("search") as HTMLInputElement).value)
                    setPass((document.getElementById("search2") as HTMLInputElement).value)




                }}>create account
                </button>
            </div>


            <div>
                <p>{email}</p>
                <p>{pass}</p>
            </div>


            <div>
                <input id={"search3"}
                       type="text"
                       placeholder="New Email name"
                />
                <input id={"search4"}
                       type="text"
                       placeholder="New Password here"
                />
                <button id={"button"} onClick={() => {
                    setNewEmail((document.getElementById("search3") as HTMLInputElement).value)
                    setNewPass((document.getElementById("search4") as HTMLInputElement).value)




                }}>change account details
                </button>
            </div>


            {/*<div>*/}
            {/*    <button onClick={() => setDeleteId(0)}>*/}
            {/*        delete account*/}
            {/*    </button>*/}
            {/*</div>*/}


            <div>
                <p>{newEmail}</p>
                <p>{newPass}</p>
            </div>


        </>
    )
}



export default App

