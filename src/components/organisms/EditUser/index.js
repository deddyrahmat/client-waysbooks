import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    MdModeEditOutline,
    MdAttachFile,
    MdKeyboardBackspace,
} from "react-icons/md";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';

// utils
import MessageValidation from "utils/MessageValidation";

// state global
import { authBiodata } from "store/authSlice";

// component
import Buttons from "components/atoms/Buttons";
import Input from "components/atoms/Form/Input";
import Modal from "components/atoms/Modal";
import Select from "components/atoms/Form/Select";
import LoadingAnimate from "components/atoms/LoadingAnimate";

// config
import ApiUsers from "config/Endpoint/user";

function EditUser() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { biodata } = useSelector((state) => state.authReducer);
    const [isLoading, setIsLoading] = useState(false);

    // validation form
    const dataGender = [
        {
            id: 1,
            value: "male",
            label: "Male",
        },
        {
            id: 2,
            value: "female",
            label: "Female",
        },
    ];

    const formValidation = Yup.object().shape({
        fullname: Yup.string()
            .min(3, MessageValidation.minChar(3))
            .required(MessageValidation.required),
        gender: Yup.string()
            .required(MessageValidation.required)
            .oneOf(["male", "female"]),
        mail: Yup.string()
            .email(MessageValidation.formatEmail)
            .required(MessageValidation.required),
        phone: Yup.string()
            .min(10, MessageValidation.minChar(10))
            .required(MessageValidation.required),
        location: Yup.string()
            .min(3, MessageValidation.minChar(3))
            .required(MessageValidation.required),
    });

    const initForm = {
        fullname: "",
        gender: "",
        mail: "",
        phone: "",
        location: "",
    };

    const handleSubmit = async (values) => {
        // console.log("values", values);
        const { fullname, gender, mail, phone, location } = values;
        setIsLoading(true);
        try {
            // update avatar
            if (image.raw !== "") {
                const configAvatar = {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                };

                const bodyAvatar = new FormData();
                bodyAvatar.append("avatar", image.raw);
                const responseAvatar = await ApiUsers.updateAvatar(
                    bodyAvatar,
                    configAvatar
                );

                if (responseAvatar.status === 0) {
                    setIsLoading(false);
                    toast.error(responseAvatar.message);
                }
            }

            // update user
            const body = JSON.stringify({
                fullname,
                email : mail,
                gender,
                phone,
                location
            });
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
            const response = await ApiUsers.update(body, config);

            if (response.status === 1) {
                dispatch(
                    authBiodata({
                        biodata : response.data
                    })
                );
                setIsLoading(false);
                navigate('/profile');
            }
        } catch (error) {
            console.log("Your System ", error);
            setIsLoading(false);
        }
    };

    const savedValues = {
        fullname: biodata.fullname,
        gender: biodata.gender,
        mail: biodata.email,
        phone: biodata.phone,
        location: biodata.location,
    };
    // validation form

    // handle preview image payment in modal popup
    const [previewImage, setPreviewImage] = useState(false);
    const handlePreview = () => {
        setPreviewImage(!previewImage);
    };

    // handle upload image payment
    const [image, setImage] = useState({ preview: "", raw: "" });
    const handleImageTransaction = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }

        // console.log(" e.target.files image",  e.target.files[0].type);
    };
    // console.log("image", image);
    // image book
    // ==============================================================

    return (
        <div className="container mx-auto my-10 px-5 sm:px-20">
            <h6 className="font-bold text-xl sm:text-4xl mb-6 font-tinos">
                Edit Profile
            </h6>

            <Formik
                initialValues={savedValues || initForm}
                validationSchema={formValidation}
                onSubmit={(values) => handleSubmit(values)}
                // untuk bisa fitur edit, tambahkan field diabawah
                enableReinitialize
            >
                {(formik) => {
                    return (
                        <Form>
                            <div className="mb-2">
                                <Input
                                    type="text"
                                    name="fullname"
                                    placeholder="Fullname"
                                    propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600"
                                />
                            </div>
                            <div className="mb-2">
                                <Input
                                    type="email"
                                    name="mail"
                                    placeholder="Email"
                                    propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600"
                                />
                            </div>
                            <div className="mb-2">
                                <Select
                                    name="gender"
                                    label="gender"
                                    options={dataGender}
                                    className="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600 "
                                />
                            </div>
                            <div className="mb-2">
                                <Input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600"
                                />
                            </div>
                            <div className="mb-2">
                                <Input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600"
                                />
                            </div>

                            <div className="mb-2">
                                <label
                                    htmlFor="file"
                                    className="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC] w-12/12 lg:w-3/12  xl:w-2/12 block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600 cursor-pointer"
                                >
                                    <div className="flex items-center justify-center space-x-3 text-gray-400 text-lg font-bold">
                                        <p>Update Image</p>
                                        <MdAttachFile size={23} />
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    className="hidden"
                                    onChange={handleImageTransaction}
                                />
                            </div>
                            {image.preview && (
                                <>
                                    <div
                                        className="h-[80px] w-[80px] mt-5 mb-1 cursor-pointer"
                                        onClick={() => handlePreview()}
                                    >
                                        <img
                                            src={image.preview}
                                            alt="Book"
                                            className="object-cover object-center w-full h-full"
                                            onChange={handleImageTransaction}
                                        ></img>
                                    </div>
                                    <p className="text-sm mb-3">
                                        Click to Show Preview
                                    </p>
                                    <Modal
                                        open={previewImage}
                                        handleProps={() => handlePreview()}
                                    >
                                        <div className="h-1/2 w-1/2 mx-auto mt-5 mb-3 cursor-pointer">
                                            <img
                                                src={image.preview}
                                                alt="Book"
                                                className="object-cover object-center w-full h-full"
                                                onChange={
                                                    handleImageTransaction
                                                }
                                            ></img>
                                        </div>
                                    </Modal>
                                </>
                            )}

                            <div className="w-full flex justify-between items-center mt-14 flex-col md:flex-row space-y-3 md:space-y-0">
                                <Buttons
                                    type="link"
                                    href="/profile"
                                    className=" block border-2 border-[#393939] rounded-sm py-1.5 w-full md:w-2/12 min-w-[100px] text-center hover:text-white hover:bg-[#393939] active:bg-[#393939] focus:outline-none focus:ring focus:ring-[#393939]"
                                >
                                    <div className="flex items-center space-x-3 justify-center">
                                        <MdKeyboardBackspace />
                                        <p>Back</p>
                                    </div>
                                </Buttons>
                                <Buttons
                                    type="button"
                                    typeButton="submit"
                                    className={`block border-2 border-[#393939] rounded py-1.5 w-full md:w-2/12 text-white z-10 ${isLoading ? 'pointer-events-none bg-slate-500' : 'hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white bg-[#393939]'}`}
                                >
                                    {isLoading ? (<LoadingAnimate />) : (
                                        <>
                                        <div className="flex items-center space-x-3 justify-center">
                                        <p>Update</p>
                                        <MdModeEditOutline />
                                    </div>
                                        </>
                                    )}
                                </Buttons>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default EditUser;
