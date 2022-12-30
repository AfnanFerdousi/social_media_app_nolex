import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../../components/shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';

const Register = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const [token] = useToken(user || gUser);

    const navigate = useNavigate();
    let signUpError;

    if (gLoading || loading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || updateError) {
        signUpError = <p className='text-red-500 font-bold'><small>{error?.message || gError?.message || updateError?.message}</small></p>
    }

    if (token) {
        navigate('/')
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
    };

    return (
        <div className="mt-6 bg-purple-100 flex flex-cols justify-center items-center">
            <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* name */}

                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your Name" className="input input-bordered w-full max-w-md" {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Name is required'
                                }
                            })} />
                            <label className="label">
                                {errors.name?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>

                        {/* email */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Your Email" className="input input-bordered w-full max-w-md" {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid email'
                                }
                            })} />
                            <label className="label">
                                {errors.email?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>

                        {/* password */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password" className="input input-bordered w-full max-w-md" {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer'
                                }
                            })} />
                            <label className="label">
                                {errors.password?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>

                        {signUpError}
                        <input className='btn w-full max-w-md' value="SIGN UP" type="submit" />
                    </form>
                    <p><small>Already have an account? <Link className='text-secondary font-bold' to='/login'>Please Login</Link></small></p>
                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline uppercase"
                    >Continue With Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;