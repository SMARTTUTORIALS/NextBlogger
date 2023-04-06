import Notification from '@/components/Notification';
import db, { auth } from '@/firebase/firebaseutils';
import React, { useRef, useState } from 'react'


const RegisterLogin = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const userNameRef = useRef();

    const [userRole, setUserRole] = useState('viewer');

    const [showPass, setShowPass] = useState(false);
    const [notificationData, setNotificationData] = useState();
    const [loginUser, setLoginUser] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailRef.current.value || !emailRef.current.value.includes('@')) {
            setNotificationData({
                category: "Warning!",
                message: "Enter a Valid Email",
                timestamp: "",
            });
            const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
            toast.show();

        } else if (!passRef.current.value) {
            setNotificationData({
                category: "Warning!",
                message: "Password cannot be empty",
                timestamp: "",
            });
            const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
            toast.show();

        } else if (loginUser) {
            //login user with email and pass.

            auth.signInWithEmailAndPassword(emailRef.current.value, passRef.current.value)
                .then(() => {
                    setNotificationData({
                        category: "Success!",
                        message: "Welcome to Next Blogger App.",
                        timestamp: "",
                    });
                    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
                    toast.show();
                })
                .catch(() => {
                    setNotificationData({
                        category: "Failure!",
                        message: "Unable to login. Please check for valid email and password.",
                        timestamp: "",
                    });
                    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
                    toast.show();
                })
        } else {
            //This block will create a new user in data base and add the additional informations
            // The additional information is stored in firebase db

            auth.createUserWithEmailAndPassword(emailRef.current.value, passRef.current.value)
                .then((authUser) => {

                    db.collection('users')
                    .doc(authUser.user.uid)
                    .set({
                        name: userNameRef.current.value,
                        email: emailRef.current.value,
                        role: userRole,
                    },)
                        .then(() => {
                            setNotificationData({
                                category: "Success!",
                                message: "You have successfully registered",
                                timestamp: "",
                            });
                            const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
                            toast.show();
                        })
                        .catch(() => {
                            setNotificationData({
                                category: "Failure!",
                                message: "Unable to create user. Please try again later.",
                                timestamp: "",
                            });
                            const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
                            toast.show();
                        })

                })
                .catch(() => {
                    setNotificationData({
                        category: "Failure!",
                        message: "Unable to create user. Please try again later.",
                        timestamp: "",
                    });
                    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
                    toast.show();
                })

        }
    }

    return (
        <form onSubmit={handleSubmit} className='form-control d-flex flex-column justify-content-center login-form'>
            <h3 className='text-center mt-3'>{`${loginUser ? 'Log In' : 'Sign Up'}`}</h3>
            <div className="input-group my-3">
                <span className="input-group-text" id="email-input"><i className="fa-solid fa-envelope" /></span>
                <input
                    ref={emailRef}
                    type="email"
                    className="form-control input-box"
                    placeholder="example@example.com"
                    required
                />
            </div>
            <div className="input-group my-3">
                <span className="input-group-text" id="pass-input"><i className="fa-solid fa-lock" /></span>
                <input
                    ref={passRef}
                    type={`${showPass ? "text" : "password"}`}
                    className="form-control input-box"
                    placeholder="*************"
                    required
                />
                <span className="input-group-text cursor-pointer" onClick={() => setShowPass(!showPass)}><i className={`fa-solid ${showPass ? 'fa-eye' : 'fa-eye-slash'}`} /></span>
            </div>
            <div className={`input-group my-3 ${loginUser && 'visually-hidden'}`}>
                <span className="input-group-text" id="pass-input"><i className="fa-solid fa-user" /></span>
                <input
                    ref={userNameRef}
                    type="text"
                    className="form-control input-box"
                    placeholder="Sam Perry"
                    
                />

            </div>
            <div className={`input-group d-flex gap-3 my-3 ${loginUser && 'visually-hidden'}`}>
                <p className='container-fluid'>Select User Role</p>
                <div className="form-check" onClick={() => setUserRole('admin')}>
                    <input className="form-check-input" type="radio" name="user-role" id="admin" />
                    <label className="form-check-label" htmlFor="admin">
                        Admin
                    </label>
                </div>
                <div className="form-check" onClick={() => setUserRole('author')}>
                    <input className="form-check-input" type="radio" name="user-role" id="author" />
                    <label className="form-check-label" htmlFor="author">
                        Author
                    </label>
                </div>
                <div className="form-check" onClick={() => setUserRole('viewer')}>
                    <input className="form-check-input" type="radio" name="user-role" id="viewer" defaultChecked />
                    <label className="form-check-label" htmlFor="viewer">
                        Viewer
                    </label>
                </div>
            </div>

            <div className={`text-center fs-6 mt-3 ${!loginUser && 'visually-hidden'}`}>
                <span>Do not have an account?</span><span className="btn-link" onClick={() => setLoginUser(false)}> Sign Up Now.</span>
            </div>
            <div className={`text-center fs-6 mt-3 ${loginUser && 'visually-hidden'}`}>
                <span>Already have an account?</span><span className="btn-link" onClick={() => setLoginUser(true)}> Log In Now.</span>
            </div>

            <button type="submit" className="btn btn-primary mt-3">{`${loginUser ? 'Log In' : 'Sign Up'}`}</button>
            <Notification {...notificationData} />
        </form>
    )
}

export default RegisterLogin