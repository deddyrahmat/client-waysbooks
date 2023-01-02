import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import { fetchLogin } from "store/authSlice";

// component
import Buttons from "components/atoms/Buttons";
import Modal from "components/atoms/Modal";
import Input from "components/atoms/Form/Input";

// utils
import MessageValidation from "utils/MessageValidation";

// state global
import { authStore, authAccess, authBiodata } from "store/authSlice";

// dummy data
import usersLogin from '../../../dummy/users.json';
import ApiAuth  from 'config/Endpoint/auth';
import { setAuthToken } from 'config/Axios';
import { toast } from 'react-toastify';

function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();

    const handleOpenRegister = () => {
        dispatch(
            authStore({
                login: false,
                register: true,
            })
        );
    };

    // validation form
    const formValidation = Yup.object().shape({
        email: Yup.string()
            .email(MessageValidation.formatEmail)
            .required(MessageValidation.required),
        password: Yup.string()
            .min(8, MessageValidation.minChar(8))
            .required(MessageValidation.required),
    });

    const initForm = {
        email: "",
        password: "",
    };

    const handleSubmit = async (values) => {
        try {
            const {email, password} = values;
            setIsLoading(true);
            const resp = await dispatch(fetchLogin({email,password}));
            // console.log('resp', resp)
            if (resp.payload.status === 1) {
                setIsLoading(false);
                // cek role for redirect page where role user
                if (resp.payload.data.role === "admin") {
                    navigate("/admin/transaction");
                }else{
                    navigate("/");
                }
            }    
        } catch (error) {
            console.log("Your System ", error)
            setIsLoading(false)
        }
        
    }
    // validation form

    // show password
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const typePass = showPassword ? "text" : "password";
    const imageEye = showPassword
    ? <FaEye size={18} className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer z-50" onClick={() => handleClickShowPassword()} />
    : <FaEyeSlash size={18} className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer z-50" onClick={() => handleClickShowPassword()} />
    return (
        <>
            <Modal open={login}>
                <h6 className="font-tinos font-bold text-4xl mb-9">Login</h6>

                <Formik
                    initialValues={initForm}
                    validationSchema={formValidation}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {(formik) => {
                        return (
                            <Form>
                            <div className="mb-2">
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600"
                                />
                            </div>
                            <div className="mb-2">
                            <Input
                                type={typePass}
                                name="password"
                                iconRight={imageEye}
                                placeholder="password"
                                propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600 pr-9 appearance-none"
                            />
                            </div>

                                <Buttons type="button" typeButton="submit" isLoading={isLoading} className="mt-3 block border-2 border-[#393939] bg-[#393939] rounded py-1.5 w-full text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white z-10">
                                    Login
                                </Buttons>
                            </Form>
                        );
                    }}
                </Formik>
                <p className="text-lg text-center mt-5">
                    Don't have an account ?{" "}
                    <span
                        className="font-bold cursor-pointer"
                        onClick={() => handleOpenRegister()}
                    >
                        Click Here
                    </span>
                </p>
            </Modal>
        </>
    );
}

export default Login;
