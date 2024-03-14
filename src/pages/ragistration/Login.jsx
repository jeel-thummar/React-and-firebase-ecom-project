import React, { useContext, useState } from 'react'
import Layout from '../../componets/layout/Layout'
import { Link, useNavigate} from 'react-router-dom'
import myContext from '../../contex/myContex'
import toast from 'react-hot-toast';
import Loder from '../../componets/loder/Loder';

//firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/Firebaseconfing";
import {  collection, onSnapshot, query, where } from "firebase/firestore";


function Login() {
    const contex = useContext(myContext);
    const {loding, setLoding} = contex;
    const navigate = useNavigate();

    //user login state
    const [userLogin, setUserLogin] = useState({
        email : "",
        password : "",
    })

    //user Login function 
    const userLoginFunction = async () => {
        // validation 
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return; // Add a return statement to exit the function
        }
    
        setLoding(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
    
            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
    
                    if (user) {
                        localStorage.setItem("users", JSON.stringify(user));
                        setUserLogin({
                            email: "",
                            password: ""
                        });
                        toast.success("Login Successfully");
                        setLoding(false);
                        
                        if (user.role === "user") {
                            navigate('/user-Dashbord');
                        } else {
                            navigate('/admin-Dashbord');
                        }
                    } else {
                        toast.error("User not found");
                        setLoding(false);
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoding(false);
            }
        } catch (error) {
            console.log(error);
            setLoding(false);
            toast.error("Login Failed");
        }
    }
    

  return (
    <Layout>
        <div className='flex justify-center items-center h-screen'>
            {loding && <Loder/>}
            {/* Login Form  */}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>Login Form
                    </h2>
                </div>
                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                        value={userLogin.email}
                        onChange={(e) =>{
                            setUserLogin({
                                ...userLogin,
                                email : e.target.value
                            })
                        }}
                    />
                </div>
                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                        value={userLogin.password}
                        onChange={(e) =>{
                            setUserLogin({
                                ...userLogin,
                                password : e.target.value
                            })
                        }}
                    />
                </div>
                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                        onClick={userLoginFunction}
                    >Login
                    </button>
                </div>
                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Login