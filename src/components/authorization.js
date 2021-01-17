import React from 'react';
import '../scss/authorization.scss'

const Authorization = (props)=>{
    const {
        email,
        setEmail,
        password,
        setPassword,
        handLelogin,
        handLeSignup,
        hasAccount,
        setHasAccount,
        emailError,
        setEmailError,
        passwordError,
        setPasswordError
    } = props
    return(
        <div className={'authorization'}>
            <div className={'authorizationContainer'}>
                <label>Username</label>
                <input type="text"
                       autoFocus
                       required
                       value={email}
                onChange={
                    (e)=>
                        setEmail(e.target.value)
                }/>
                <p className={'errorMsg'}>{emailError}</p>
                <label>Password</label>
                <input type="password"
                required
                value={password}
                onChange={(e)=>
                    setPassword(e.target.value)
                }/>
                <p className={'errorMsg'}>{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount?(
                        <>
                            <button onClick={handLelogin}>Войти</button>
                            <p>Нету аккаунта ?
                                <span onClick={()=> setHasAccount(!hasAccount)}>Зарегистрироваться</span></p>
                        </>
                    ) : (
                        <>
                            <button onClick={handLeSignup}>Зарегистрироваться</button>
                            <p>Есть аккаунт ?
                                <span onClick={()=> setHasAccount(!hasAccount)}>Войти</span></p>
                        </>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Authorization;