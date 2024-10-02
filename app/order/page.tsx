"use client";
import Image from "next/image";
import { orderData } from "./orderData";
import lessIcon from '../images/lessIcon.svg';
import plusIcon from '../images/addIco.svg';
import cartIcon from '../images/cartIcon.png';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { addMenu, decreaseQuantityMenu } from "@/redux/slices/counterSlice";
import HeaderTitle from "@/components/headerTitle";
import { CiShoppingCart } from "react-icons/ci";

const OrderPayment = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const menuLists = useSelector((state: RootState) => state.menu.menuLists);

    const handleIncrease = (menu: string, img: any) => {
        const existingItem = menuLists.find(item => item.menu === menu);
        const quantities = existingItem ? existingItem.quantities + 1 : 1;
        dispatch(addMenu({
            menu, img, quantities,
            price: 0
        }));
    };

    const handleDecrease = (menu: string) => {
        const existingItem = menuLists.find(item => item.menu === menu);
        if (existingItem && existingItem.quantities > 0) {
            dispatch(decreaseQuantityMenu(menu));
        }
    };

    const getTotal = () => {
        return menuLists.reduce((total, item) => total + item.quantities * 10, 0);
    };

    const confirmOrder = () => {
        router.push('/ConfirmOrder');
    };

    const backToSelectShop = () => {
        router.push('/SelectShop');
    };

    return (
        <div className={` min-h-screen w-full bg-primary pt-5`}>
            <HeaderTitle title={"ชาบูเสียบไม้"} link={backToSelectShop} />
            <div className="bg-white relative p-5 rounded-t-3xl shadow-lg mt-11">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-5 pb-5">
                    {orderData.map((data, index) => {
                        const menuItem = menuLists.find(item => item.menu === data.name);
                        const quantity = menuItem ? menuItem.quantities : 0;

                        return (
                            <div key={index} className="items-center">
                                <Image src={data.image} alt="product" width={350} height={350} />
                                <div className="ml-5">
                                    <h1 className="text-lg text-center mt-2">{data.name}</h1>
                                    <h1 className="text-lg text-center">{quantity * 10}฿</h1>
                                    <div className="flex items-center justify-center mt-2">
                                        <button onClick={() => handleDecrease(data.name)}>
                                            <Image src={lessIcon} alt="less" width={30} height={30} />
                                        </button>
                                        <h1 className="text-lg text-center mx-7">{quantity}</h1>
                                        <button onClick={() => handleIncrease(data.name, data.image)}>
                                            <Image src={plusIcon} alt="plus" width={30} height={30} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex items-center justify-between sticky bottom-0 bg-white border-t-2 py-4 px-4 border-primary w-full">
                    <div className="text-lg mt-6 flex gap-2 justify-center items-center">
                        <div className="w-[35px] h-[35px] rounded-lg bg-primary flex justify-center items-center">
                            <CiShoppingCart color="white" size={28}/>
                        </div>
                        <h2>Total: ฿{getTotal()}</h2>
                    </div>
                    <button
                        className=" bg-primary text-white py-4 px-5 rounded-md hover:bg-orange-700 transition duration-300 transform hover:scale-105"
                        onClick={confirmOrder}
                    >
                        ยืนยันรายการสินค้า
                    </button>
                </div>
        </div>
    );
};

export default OrderPayment;
