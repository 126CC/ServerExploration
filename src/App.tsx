
import './App.css'
import {useEffect, useState} from "react";



function App() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [userId] = useState(0);


    const [postToggle, setPostToggle] = useState(false);
    const [putToggle, setPutToggle] = useState(false);
    const [deleteToggle, setDeleteToggle] = useState(false);


    const [deleteId, setDeleteId] = useState<number>(-1);


    usePost(email, pass, postToggle);
    usePut(newEmail, newPass, userId, putToggle);
    useDelete(deleteId, deleteToggle);


    const tempID = useGet(0);


    return (
        <>
            <div>
                <h1>test get</h1>
                <p>{tempID && tempID.email}</p>
            </div>


            <div id="containera">
                <input id="search" type="text" placeholder="Email name" />
                <input id="search2" type="text" placeholder="Password here" />
                <button
                    onClick={() => {
                        setEmail((document.getElementById("search") as HTMLInputElement).value);
                        setPass((document.getElementById("search2") as HTMLInputElement).value);
                        setPostToggle(true);
                    }}
                >
                    create account
                </button>
            </div>


            <div>
                <input id="search3" type="text" placeholder="New Email name" />
                <input id="search4" type="text" placeholder="New Password here" />
                <button
                    onClick={() => {
                        setNewEmail((document.getElementById("search3") as HTMLInputElement).value);
                        setNewPass((document.getElementById("search4") as HTMLInputElement).value);
                        setPutToggle(true);
                    }}
                >
                    change account details
                </button>
            </div>


            <div>
                <button
                    onClick={() => {
                        setDeleteId(0);
                        setDeleteToggle(true);
                    }}
                >
                    delete account
                </button>
            </div>
        </>
    );
}

function useGet(id:number) {
    const [data, setData] = useState<{id:number,email:string,pass:string}>({id:0, email:"email@email.com",pass:"1234" })
    useEffect(() => {
        const API_URL="https://server-for-serverexploration-edpu.onrender.com:3000/"+id;
        fetch(API_URL)
            .then((response) =>{
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data)=>{
                setData(data)


            })
            .finally(()=>{
                //  setLoading(false);
            });
    }, [id]);

    return data;
}



function usePost(email: string, pass: string, trigger: boolean) {
    useEffect(() => {
        if (!trigger) return;


        const API_URL = "https://server-for-serverexploration-edpu.onrender.com:3000/users";
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, pass }),
        });
    }, [email, pass, trigger]);
}


function usePut(newEmail: string, newPass: string, id: number, trigger: boolean) {
    useEffect(() => {
        if (!trigger) return;


        const API_URL = "https://server-for-serverexploration-edpu.onrender.com:3000/users" + id;
        fetch(API_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newEmail, newPass }),
        });
    }, [newEmail, newPass, id, trigger]);
}


function useDelete(id: number, trigger: boolean) {
    useEffect(() => {
        if (!trigger) return;
        const API_URL = "https://server-for-serverexploration-edpu.onrender.com:3000/users" + id;
        fetch(API_URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
    }, [id, trigger]);
}

export default App

