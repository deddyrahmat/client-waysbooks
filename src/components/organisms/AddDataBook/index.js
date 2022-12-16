import React,{useState} from 'react'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { MdLibraryAdd, MdAttachFile } from "react-icons/md";

// utils
import MessageValidation from "utils/MessageValidation";

import Buttons from "components/atoms/Buttons";
import Input from "components/atoms/Form/Input";
import Textarea from 'components/atoms/Form/Textarea';
import Modal from 'components/atoms/Modal';


function AddDataBook() {
  const navigate = useNavigate();

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

const handleSubmit = (values) => {
    console.log('values', values)
    

}
// validation form

// handle preview image payment in modal popup
const [previewImage, setPreviewImage] = useState(false);
const handlePreview = () => {
  setPreviewImage(!previewImage);
}

// handle upload image payment
const [image, setImage] = useState({ preview: "", raw: "" });
const handleImageTransaction = (e) => {
  if (e.target.files.length) {
      setImage({
          preview : URL.createObjectURL(e.target.files[0]),
          raw : e.target.files[0]
      })
  }

  // console.log(" e.target.files image",  e.target.files[0].type);
}
// console.log("image", image);
// image book
// ==============================================================

  return (
    <div className="container mx-auto my-10 px-5 sm:px-20">
      <h6 className='font-bold text-xl sm:text-4xl mb-6 font-tinos'>Add Book</h6>

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
                            type="text"
                            name="title"
                            placeholder="Title"
                            propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600"
                        />
                      </div>
                      <div className="mb-2">
                        <Input
                            type="text"
                            name="pages"
                            placeholder="Pages"
                            propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600"
                        />
                      </div>
                      <div className="mb-2">
                        <Input
                            type="text"
                            name="isbn"
                            placeholder="ISBN"
                            propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600"
                        />
                      </div>
                      <div className="mb-2">
                        <Input
                            type="text"
                            name="price"
                            placeholder="Price"
                            propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600"
                        />
                      </div>
                      <div className="mb-2">
                        <Textarea
                          name="description"
                          placeholder="About this book"
                          notifWarning="gray"
                          rows="3"
                          className="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600"
                        />
                      </div>

                      <div className="mb-2">
                        <label htmlFor="file" className="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-2/12 block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600 cursor-pointer">
                          <div className="flex items-center justify-center space-x-3 text-gray-400 text-lg font-bold">
                            <p>Attach Book File</p>
                            <MdAttachFile size={23} />
                          </div>
                        </label>
                        <input type="file" name="file" id="file" className='hidden' onChange={handleImageTransaction}  />
                      </div>
                      {
                        image.preview && (
                          <>
                            <div className="h-[80px] w-[80px] mt-5 mb-1 cursor-pointer" onClick={() => handlePreview()}>
                              <img src={image.preview} alt="Book" className='object-cover object-center w-full h-full' onChange={handleImageTransaction}></img>
                            </div>
                            <p className='text-sm mb-3'>Click to Show Preview</p>
                            <Modal open={previewImage} handleProps={() => handlePreview()}>
                              <div className="h-1/2 w-1/2 mx-auto mt-5 mb-3 cursor-pointer">
                                <img src={image.preview} alt="Book" className='object-cover object-center w-full h-full' onChange={handleImageTransaction}></img>
                              </div>
                            </Modal>
                          </>
                        )
                    }

                        <Buttons type="button" typeButton="submit" className="mt-3 block border-2 border-[#393939] bg-[#393939] rounded py-1.5 w-2/12 text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white z-10 float-right">
                          <div className="flex items-center space-x-3 justify-center">
                            <p>Add Book</p>
                            <MdLibraryAdd />
                          </div>
                        </Buttons>
                    </Form>
                );
            }}
        </Formik>
    </div>
  )
}

export default AddDataBook