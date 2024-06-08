
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
import Loading from "../components/Loading";
import Router from "next/router";
import { clearCart } from "../redux/slices/cartSlice";

const Order = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { cart, user: { user } } = useSelector((state) => state);
  const foodNames = cart.map((item) => item.name);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user === null) {
      Router.push("/login");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra giỏ hàng có trống không
    if (cart.length === 0) {
      enqueueSnackbar("Your cart is empty!", {
        variant: "info",
        autoHideDuration: 3000,
      });
      Router.push("/foods");
      return;
    }

    setLoading(true);
    
    try {
      // Gửi yêu cầu đặt hàng đến backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/hoadon/new`, {
        idKh: user.idkh, // Sử dụng id của người dùng để thực hiện đặt hàng
        idBan: 2, // Sử dụng id của bàn của người dùng để thực hiện đặt hàng
        ngayHd: new Date().toISOString().split('T')[0], // Sử dụng ngày hiện tại để thực hiện đặt hàng
        tienMonAn: cart.reduce((total, item) => total + parseFloat(item.donGia) * item.quantity, 0), // Tính tổng tiền món ăn trong giỏ hàng
        codeVoucher: "", // Nếu có sử dụng mã voucher, bạn có thể thêm vào đây
        tienGiam: 0, // Số tiền giảm, nếu có
        tongTien: cart.reduce((total, item) => total + parseFloat(item.donGia) * item.quantity, 0), // Tính tổng tiền thanh toán
        trangThai: "Da thanh toan" // Trạng thái đơn hàng, ở đây là đang chờ xử lý
      });

      setLoading(false);
      enqueueSnackbar(response.data.message, {
        variant: "success",
        autoHideDuration: 3000,
      });
      
      // Xóa giỏ hàng sau khi đặt hàng thành công
      dispatch(clearCart());

      // Chuyển hướng đến trang cảm ơn
      Router.push("/thankyou");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-6xl mx-auto min-h-[83vh] p-3">
          <div className="flex flex-col justify-center items-center p-3">
            <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border-2 border-green-400 mt-3 bg-transparent rounded-lg outline-none font-semibold placeholder:text-sm"
                type="text"
                placeholder="Your name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border-2 border-green-400 mt-3 bg-transparent rounded-lg outline-none font-semibold placeholder:text-sm"
                type="text"
                placeholder="Your email"
              />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-3 border-2 border-green-400 mt-3 bg-transparent rounded-lg outline-none font-semibold placeholder:text-sm w-full"
                type="text"
                placeholder="Your address"
              />
              <input
                type="submit"
                value={"Place order"}
                className="bg-white text-green-500 font-bold p-3 outline-none rounded-lg w-full cursor-pointer mt-3 hover:bg-green-400 hover:text-white transition duration-300 ease-in"
              />
            </form>
            <p className="text-sm font-bold text-green-400 mt-3">
              * Only Cash on delivery is Available
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;

