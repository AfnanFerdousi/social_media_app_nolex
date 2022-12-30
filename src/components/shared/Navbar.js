import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';

const Navbar = () => {

     const [user, loading, error] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    };

    return (
        <div>
            <div className="navbar bg-base-100 lg:md:px-20 px-10 border-b-[1px]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                             <li><Link to="/home">Home</Link></li>
                            <li><Link to="/media">Media</Link></li>
                              <li><Link to="/">Message</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li>
                                {
                                    user
                                        ?
                                        <button className='btn btn-ghost rounded-lg ' onClick={logout}>Sign Out</button>
                                        :
                                        <Link to='/login' className='btn btn-ghost rounded-lg'>LOGIN</Link>
                                }
                            </li>
                            <li>
                                {
                                    user ?
                                        <div className="btn sm:mt-3 text-white rounded-full">
                                            <h2>{user.displayName}</h2>
                                        </div>
                                        :
                                        <></>
                                }
                            </li>
                        </ul>
                    </div>
                    <Link to="/" className="font-bold text-blue-300 cursor-pointer normal-case text-2xl">Nolax</Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/media">Media</Link></li>
                        <li><Link to="/">Message</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li>
                            {
                                user
                                    ?
                                    <button className='rounded-lg' onClick={logout}>Sign Out</button>
                                    :
                                    <Link to='/login' className='btn btn-ghost rounded-lg'>Login</Link>
                            }
                        </li>
                        <li>
                            {
                                user ?
                                    <div className="btn sm:mt-3 text-[#fff] rounded-full">
                                        <h2>{user.displayName}</h2>
                                    </div>
                                    :
                                    <></>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;