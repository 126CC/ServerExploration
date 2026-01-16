
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


    usePost(email, pass, postToggle, () => setPostToggle(false));
    usePut(newEmail, newPass, userId, putToggle, () => setPutToggle(false));
    useDelete(deleteId, deleteToggle, () => setDeleteToggle(false));


    const tempID = useGet(0);


    return (
        <>
            <h1>Test GET</h1>
            <p>{tempID?.email}</p>

            <div>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" />
                <button onClick={() => setPostToggle(true)}>Create Account</button>
            </div>

            <div>
                <input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="New Email" />
                <input value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="New Password" />
                <button onClick={() => setPutToggle(true)}>Update Account</button>
            </div>

            <div>
                <button onClick={() => { setDeleteId(0); setDeleteToggle(true); }}>
                    Delete Account
                </button>
            </div>
        </>
    );
}


function useGet(id:number) {
    const [data, setData] = useState<{id:number,email:string,pass:string} | null>(null)
    useEffect(() => {
        const API_URL=`https://server-for-serverexploration-edpu.onrender.com:3000/${id}`;
        fetch(API_URL)
            .then(r => r.json())
            .then(setData);
    }, [id]);

    return data;
}



function usePost(email: string, pass: string, trigger: boolean, reset: () => void) {
    useEffect(() => {
        if (!trigger) return;

        const API_URL = 'https://server-for-serverexploration-edpu.onrender.com/users';
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, pass }),
        })
            .finally(reset);
    }, [email, pass, trigger]);
}


function usePut(newEmail: string, newPass: string, id: number, trigger: boolean, reset: () => void) {
    useEffect(() => {
        if (!trigger) return;

        const API_URL = `https://server-for-serverexploration-edpu.onrender.com:3000/users/${id}`;
        fetch(API_URL, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newEmail, newPass }),
        })
            .finally(reset);
    }, [newEmail, newPass, id, trigger]);
}


function useDelete(id: number, trigger: boolean, reset: () => void) {
    useEffect(() => {
        if (!trigger) return;

        const API_URL = `https://server-for-serverexploration-edpu.onrender.com:3000/users/${id}`;
        fetch(API_URL, {
            method: "DELETE",
        })
        .finally(reset);
    }, [id, trigger]);
}

export default App

