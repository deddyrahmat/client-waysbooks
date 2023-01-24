import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

// component
import Buttons from "components/atoms/Buttons";
import Modal from "components/atoms/Modal";
import Input from "components/atoms/Form/Input";

// utils
import MessageValidation from "utils/MessageValidation";

// state global
import { authStore } from "store/authSlice";

// config
import ApiAuth from "config/Endpoint/auth";
import { toast } from "react-toastify";
import LoadingAnimate from "components/atoms/LoadingAnimate";

function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();

    const handleOpenLogin = () => {
        dispatch(
            authStore({
                login: true,
                register: false,
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
        confpassword: Yup.string()
            .oneOf([Yup.ref("password"), ""], MessageValidation.confirmationPassword)
            .required(MessageValidation.required),
        fullname: Yup.string()
            .min(2, MessageValidation.minChar(2))
            .required(MessageValidation.required),
    });

    const initForm = {
        email: "",
        password: "",
        fullname: "",
        confpassword : ""
    };

    const handleSubmit = async (values) => {
        
        const {email, password, fullname} = values;
        setIsLoading(true);
        try {
            const body = JSON.stringify({
                email,
                password,
                fullname
            });
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
            const response = await ApiAuth.register(body, config)
            // console.log('response', response)
            if (response.status === 1) {
                values.fullname ="";
                values.email ="";
                values.password ="";
                values.confpassword ="";

                setIsLoading(false);
                toast.success("Register Success. Please Login")
                dispatch(
                    authStore({
                        login: true,
                        register: false,
                    })
                );
                
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

     // show confirmation password
    const [showConfPassword, setShowConfPassword] = useState(false);

    const handleClickShowConfPassword = () => {
        setShowConfPassword(!showConfPassword);
    };

    const typePassConf = showConfPassword ? "text" : "password";

        const imageEyeConf = showConfPassword
        ? <FaEye size={18} className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer z-50" onClick={() => handleClickShowConfPassword()} />
        : <FaEyeSlash size={18} className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer z-50" onClick={() => handleClickShowConfPassword()} />
    // show confirmation password
    return (
        <>
            <Modal open={register}>
                <h6 className="font-tinos font-bold text-4xl mb-9">Register</h6>
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
                                    type="text"
                                    name="fullname"
                                    placeholder="fullname"
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
                            <div className="mb-2">
                            <Input
                                type={typePassConf}
                                name="confpassword"
                                iconRight={imageEyeConf}
                                placeholder="Konfirmasi Password"
                                propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600 pr-9 appearance-none"
                            />
                            </div>

                                <Buttons type="button" typeButton="submit" className={`mt-3 block border-2 border-[#393939] rounded py-1.5 w-full text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white z-10 ${isLoading ? 'bg-slate-500 pointer-events-none' : 'bg-[#393939]'}`}>
                                    {isLoading ? <LoadingAnimate /> : "Register"}
                                </Buttons>
                            </Form>
                        );
                    }}
                </Formik>
                <p className="text-lg text-center mt-5">
                    Already have an account ?{" "}
                    <span
                        className="font-bold cursor-pointer"
                        onClick={() => handleOpenLogin()}
                    >
                        Click Here
                    </span>
                </p>
            </Modal>
        </>
    );
}

export default Register;
