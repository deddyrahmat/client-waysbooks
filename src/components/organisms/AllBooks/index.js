import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MdSearch } from "react-icons/md";

// config
import ApiBooks from "config/Endpoint/book";

// componet
import Books from "components/molecules/Books";
import LoadingAnimate from "components/atoms/LoadingAnimate";
import Buttons from "components/atoms/Buttons";
import Input from "components/atoms/Form/Input";

// utils
import MessageValidation from "utils/MessageValidation";

function AllBooks() {
    const [dataBooks, setDataBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [statusSearch, setStatusSearch] = useState(false);
    const [keyword, setKeyword] = useState('');

    const handleLimit = useCallback(() => {
        setLimit(limit + 10);
        // setPage(page + 1)
    },[limit])

    const prosesListBooks = async () => {
        try {
            const response = await ApiBooks.list(page, limit);

            if (response.status === 1) {
                setDataBooks(response.data);
                setTotal(response.total_data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Your System ", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (statusSearch) {
            prosesSearch();
        }else{
            prosesListBooks();
        }
    }, [statusSearch, limit]);

    // validation form
    const formValidation = Yup.object().shape({
        keyword: Yup.string().required(MessageValidation.required),
    });

    const initForm = {
        keyword: "",
    };

    const prosesSearch = async () => {
        try {
            const response = await ApiBooks.search(page, limit, keyword);

            if (response.status === 1) {
                setDataBooks(response.data);
                setTotal(response.total_data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Your System ", error);
            setIsLoading(false);
        }
    }
    const handleSubmit = async (values) => {
        setStatusSearch(true)
        setKeyword(values.keyword);
    };
    // console.log('dataBooks', dataBooks)

    return (
        <div className="mt-10">
            <div className="container mx-auto pb-14">
                <Formik
                    initialValues={initForm}
                    validationSchema={formValidation}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <div className="flex w-full lg:w-5/12 items-start justify-center space-x-3 ">
                                    <div className="inline w-full">
                                        <Input
                                            type="text"
                                            name="keyword"
                                            placeholder="Search Title Book"
                                            propsClassName="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC] w-full rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600 "
                                        />
                                    </div>
                                    <Buttons
                                        type="button"
                                        typeButton="submit"
                                        isLoading={isLoading}
                                        className=" border-2 border-[#393939] bg-[#393939] rounded py-2.5 w-4/12 text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white "
                                    >
                                        {isLoading ? (
                                            <LoadingAnimate />
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <MdSearch size={22} />
                                                <p>Search</p>
                                            </div>
                                        )}
                                    </Buttons>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
                <div className="grid lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-16 mt-10">
                    {isLoading ? (
                        <LoadingAnimate />
                    ) : dataBooks?.length > 0 ? (
                        dataBooks?.map((book) => (
                            <Books key={book.id} data={book} />
                        ))
                    ) : (
                        <div>
                            <p className="text-red-900 text-xl font-bold block">
                                Data Not Found
                            </p>
                            <Buttons className="mt-5 block border-2 border-[#393939] bg-[#393939] rounded py-2.5 w-4/12 text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white " onClick={() => prosesListBooks()}>
                                <p>Back</p>
                            </Buttons>
                        </div>
                    )}
                </div>
                {
                    dataBooks.length < total && (
                        <Buttons onClick={() => {handleLimit()}} isDisabled={isLoading} className={`mt-10 w-4/12 mx-auto block text-center flex-1 rounded text-white py-2 text-xl font-bold ${isLoading ? 'bg-slate-400 pointer-events-none' : 'border-2 border-[#393939] bg-[#393939] hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white'}`}>
                            {
                                isLoading ? (<LoadingAnimate />) : ("Load More")
                            }
                        </Buttons>
                    ) 
                }
            </div>
        </div>
    );
}

export default AllBooks;
