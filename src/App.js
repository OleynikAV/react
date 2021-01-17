import React,{useState,useEffect} from 'react'
import './App.scss'

import fire from "./firebase";
import Authorization from './components/authorization'
import Navbar from "./components/navbar";
import base from "./firebase";
import {useDispatch, useSelector} from "react-redux";


function App() {
    const dispatch = useDispatch()
    const stateUsers = useSelector(state => state.storeUsers.users)


    const  [email , setEmail] = useState('');
    const  [password, setPassword] = useState('');
    const  [emailError, setEmailError] = useState('');
    const  [passwordError , setPasswordError] = useState('');
    const  [hasAccount , setHasAccount] = useState(false);

    const clearInputs = ()=>{
        setEmail('');
        setPassword('');

    }
    const  clearErrors = ()=>{
        setEmailError('');
        setPasswordError('');
    }

    const  handleLogin = ()=>{
        clearErrors()
        fire
            .auth()
            .signInWithEmailAndPassword(email,password)
            .catch((err)=>{
                switch (err.code){
                    case 'auth/invalid-email':
                    case "auth/user-disabled":
                    case "auth/user-nor-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            })
    }
    const  handleSignup = ()=>{
        clearErrors()
        fire
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .catch((err)=>{
                switch (err.code){
                    case 'auth/email-already-in-use':
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            })
    }

    const  handleLogout = ()=>{
        fire.auth().signOut();
    }

    const  authListener = ()=>{
        fire.auth().onAuthStateChanged(user =>{
            if (user){
                clearInputs()
                // setUser(user)
                dispatch({ type: 'SET_USERS', payload:user })
            }else {
                // setUser("")
                dispatch({ type: 'SET_USERS', payload: user })
            }
        })
    }

    useEffect(()=>{
        authListener();
        upload()


    },[])

    const upload = async ()=>{

        try {
            const items = await base.database().ref('items/');
            items.on('value', (snapshot) => {
                const data = snapshot.val();

                if (data == null){
                    let nameLengths = [];
                    dispatch({ type: 'SET_ITEMS', payload:nameLengths })
                }else {
                    let nameLengths = Object.values(data);
                    // dispatchItems(setCount(nameLengths))
                    dispatch({ type: 'SET_ITEMS', payload:nameLengths })
                }

            });
        }catch (e){
            console.log(e.message)
        }
    };



  return (
    <div className="App">
        {stateUsers ? (
            <Navbar handleLogout={handleLogout}/>
        ):(
            <Authorization email={email}
                           setEmail={setEmail}
                           password={password}
                           setPassword={setPassword}
                           handLelogin={handleLogin}
                           handLeSignup={handleSignup}
                           hasAccount={hasAccount}
                           setHasAccount={setHasAccount}
                           emailError={emailError}
                           passwordError={passwordError}
            />
        )}
    </div>
  );
}

export default App;
