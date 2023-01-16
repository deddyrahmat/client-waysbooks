import Buttons from 'components/atoms/Buttons';
import Books from 'components/molecules/Books';
import React from 'react'
import { MdMailOutline, MdFemale, MdMale, MdOutlinePhone, MdLocationOn } from "react-icons/md";
import { useSelector } from "react-redux";

function DataProfile({purchaseBooks}) {
    const { biodata } = useSelector((state) => state.authReducer);
    console.log('biodata', biodata)
  return (
    <div className="mt-20">
        <div className="container mx-auto px-10 pb-14">
            <h6 className='font-bold text-4xl mb-6 font-tinos'>Profile</h6>
            {/* profile */}
            <div className="rounded-lg bg-[#FFD9D9] h-full w-full p-10 flex flex-col lg:flex-row items-start justify-between">
                <div className="w-full lg:w-10/12 mb-10 lg:mb-0">
                    <div className="flex space-x-3 items-center mb-5 lg:mb-10">
                        <MdMailOutline size={35} className="hidden md:block" color="gray" />
                        <div className="flex flex-col">
                            <p className='text-sm font-extrabold break-all'>{biodata.email}</p>
                            <p className='text-xs text-[#8A8C90]'>Email</p>
                        </div>
                    </div>
                    <div className="flex space-x-3 items-center mb-5 lg:mb-10">
                        <MdMale size={35} className="hidden md:block" color="gray" />
                        <div className="flex flex-col">
                            <p className='text-sm font-extrabold break-all'>{biodata.gender ? biodata.gender : '- - -'}</p>
                            <p className='text-xs text-[#8A8C90]'>Gender</p>
                        </div>
                    </div>
                    <div className="flex space-x-3 items-center mb-5 lg:mb-10">
                        <MdOutlinePhone size={35} className="hidden md:block" color="gray" />
                        <div className="flex flex-col">
                            <p className='text-sm font-extrabold break-all'>{biodata.phone ? biodata.phone : '- - -'}</p>
                            <p className='text-xs text-[#8A8C90]'>Phone</p>
                        </div>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <MdLocationOn size={35} className="hidden md:block" color="gray" />
                        <div className="flex flex-col">
                            <p className='text-sm font-extrabold break-all'>{biodata.location ? biodata.location : '- - -'}</p>
                            <p className='text-xs text-[#8A8C90]'>Address</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/12">
                    {biodata.avatar ? (
                        <div className="w-full">
                            <img src={biodata.avatar} alt="profile-user" className='object-cover object-center w-full h-full rounded-lg' />
                        </div>
                    ) : (
                        <div className="w-full">
                            <img src="/assets/images/avatar.png" alt="profile-user" className='object-cover object-center w-full h-full rounded-lg' />
                        </div>
                    )}
                        <Buttons type='link' href='/profile/edit' className='block mt-5 bg-[#D60000] rounded py-3 w-full text-center text-lg font-bold text-white hover:bg-red-500 active:bg-red-500 focus:outline-none focus:ring focus:ring-red-500'>
                            Edit Profile
                        </Buttons>
                </div>
            </div>

            {/* my books */}
            <h6 className='font-bold text-4xl mb-6 font-tinos mt-20'>My Books</h6>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-16">
                {
                    purchaseBooks?.data?.length > 0 && (
                    purchaseBooks?.data?.map(book => (
                        <Books key={book.id} data={book} />
                    ))
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default DataProfile