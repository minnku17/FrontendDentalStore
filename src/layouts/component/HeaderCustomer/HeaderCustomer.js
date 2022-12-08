import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { getListParentCategory } from '~/redux/apiReques';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function HeaderCustomer() {
    let [listParent, setListParent] = useState();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchApi() {
            let res = await getListParentCategory(dispatch);
            if (res) {
                setListParent(res.data);
            }
        }
        fetchApi();
    }, []);

    const viewCategory = (id) => {
        console.log(id);
        navigate(`/category/${id}`);
    };
    return (
        <>
            <div className="container flex flex-col gap-1 items-center">
                <div className=" mx-auto h-fit grid grid-cols-12 gap-3 ">
                    <div className="hidden px-8 rounded-lg flex-initial col-span-12 sm:h-[200px] md:h-fit md:overflow-auto md:mt-5 md:block md:col-span-3 shadow-md md:px-1 lg:px-0">
                        <aside className="flex flex-col sm:h-[202px] lg:h-[280px]   lg:py-[3px] md:py-[3px] xl:h-full p-5  justify-around">
                            {listParent?.map((item, index) => {
                                return (
                                    <div
                                        className="flex justify-between md:-h[1px] md:py-0 items-center hover:bg-[#e7f3fd] cursor-pointer"
                                        onClick={() => viewCategory(item.id)}
                                    >
                                        <p className="sm:text-[10px] md:text-sm lg:text-xl text-[#216daa] ">
                                            {item.title}
                                        </p>
                                        <div>
                                            <KeyboardArrowRightIcon />
                                        </div>
                                    </div>
                                );
                            })}
                        </aside>
                    </div>
                    <div className="flex-initial col-span-12 py-4  md:col-span-5 ">
                        <img className="bg-no-repeat rounded-lg" src={images.banner} alt="images" />
                    </div>
                    <div className="hidden  flex-initial col-span-12  md:col-span-4  md:grid md:grid-cols-2 gap-1">
                        <img src={images.banner1} className="w-full" alt="" />
                        <img src={images.banner2} className="w-full" alt="" />
                        <img src={images.banner3} className="w-full" alt="" />
                        <img src={images.banner4} className="w-full" alt="" />
                    </div>
                </div>
                <div className="h-fit w-full rounded-lg bg-[#aae5ff] gap-3 py-5 px-5 flex flex-col justify-around items-center">
                    <h1 className="uppercase font-bold">dịch vụ đặt lịch khám bệnh của hệ thống</h1>
                    <div className="flex gap-5 justify-around items-center">
                        <div className=" ">
                            <div className="flex flex-col gap-3 items-center justify-around">
                                <img src={images.schedules1} alt="" />
                                <h1>VẬT LIỆU CHẤT LƯỢNG</h1>
                                <p className="text-center">Các vật liệu tại phòng khám từ các nguồn uy tín</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex flex-col gap-3 items-center justify-around">
                                <img src={images.schedules2} alt="" />
                                <h1>PHÒNG KHÁM VƯỢT TRỘI</h1>
                                <p className="text-center">
                                    Thiết bị nha khoa theo chuẩn giấy phép Đầy đủ thiết bị, dụng cụ, vật liệu
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex flex-col gap-3 items-center justify-around">
                                <img src={images.schedules3} alt="" />
                                <h1>VẬT LIỆU CHẤT LƯỢNG</h1>
                                <p className="text-center">Các vật liệu tại phòng khám từ các nguồn uy tín</p>
                            </div>
                        </div>
                    </div>

                    <button className="border bg-indigo-50 rounded-lg py-3 px-5">Đặt lịch khám ngay</button>
                </div>
            </div>
        </>
    );
}

export default HeaderCustomer;
