import images from '~/assets/images';
import { toast } from 'react-toastify';

import CommonUtils from '~/utils/CommonUtlis';
import { getAllBanner, updateBanner } from '~/services';
import { useEffect } from 'react';
import { useState } from 'react';

function Banner() {
    let [bannerFour, setBannerFour] = useState([]);
    let [mainBanner, setMainBanners] = useState('');
    let [bannerLong, setBannerLong] = useState('');

    useEffect(() => {
        fetchApi();
    }, []);
    const fetchApi = async () => {
        const res = await getAllBanner();
        if (res.data && res.data.length > 0) {
            setMainBanners(res.data[0].Image.photo);
            setBannerFour(
                res.data.filter((item, index) => {
                    return index > 0 && index < 5;
                }),
            );
            setBannerLong(res.data[5].Image.photo);
        }
    };

    console.log('checkkk ', bannerFour);

    const handleOnchangeImg = async (e, id) => {
        console.log('check res', id);

        let data = e.target.files;
        let files = data[0];

        if (typeof id === 'number') {
            let base64 = await CommonUtils.getBase64(files);
            if (base64) {
                let res = await updateBanner({ id: id, photo: base64 });
                if (res.errCode === 0) {
                    toast.success(res.errMessage);
                    fetchApi();
                } else {
                    toast.success(res.errMessage);
                }
            }
        }
    };
    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="flex flex-col gap-5 my-auto mx-auto border rounded-lg w-fit p-5">
                <h1 className="text-center font-bold italic ">
                    Cách chỉnh: hãy bấm vào nút <span className="text-red-500">Choose File</span> để thay đổi ảnh!
                </h1>

                <div className="flex items-center justify-center gap-3">
                    <div className="w-[509px] h-[341px]">
                        <img className="rounded-lg" src={mainBanner !== null ? mainBanner : images.banner} alt="" />
                        <input
                            className="text-[12px] w-[173px] border-none"
                            onChange={(e) => handleOnchangeImg(e, 11)}
                            type="file"
                            id="file"
                            style={{ display: 'block' }}
                        />
                    </div>
                    <div className="w-[406px] h-[380px] flex flex-wrap gap-1">
                        {bannerFour && bannerFour.length === 4 ? (
                            bannerFour.map((item, index) => {
                                let id = item.Image.id;

                                return (
                                    <div key={index} className="">
                                        <img
                                            className="w-[201px] h-[180px]"
                                            src={item.Image.photo !== null ? item.Image.photo : images.banner1}
                                            alt=""
                                        />
                                        {/* <label className="" htmlFor="file">
                                            Image: <DriveFolderUploadOutlined />
                                        </label> */}
                                        <input
                                            className="text-[12px] w-[173px] border-none"
                                            onChange={(e) => handleOnchangeImg(e, id)}
                                            type="file"
                                            id="file"
                                            style={{ display: 'block' }}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                <div>
                                    <img className="w-[201px] h-[180px]" src={images.banner1} alt="" />
                                </div>
                                <div>
                                    <img className="w-[201px] h-[180px]" src={images.banner1} alt="" />
                                </div>
                                <div>
                                    <img className="w-[201px] h-[180px]" src={images.banner1} alt="" />
                                </div>
                                <div>
                                    <img className="w-[201px] h-[180px]" src={images.banner1} alt="" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="w-full mt-2">
                    <img className="rounded-lg" src={bannerLong ? bannerLong : images.bannerSale} alt="" />
                    <input
                        className="text-[12px] w-[173px] border-none"
                        onChange={(e) => handleOnchangeImg(e, 186)}
                        type="file"
                        id="file"
                        style={{ display: 'block' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Banner;
