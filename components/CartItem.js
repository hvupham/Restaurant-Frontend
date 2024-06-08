// import React from "react";
// import { useDispatch } from "react-redux";
// import { remove, increaseQuantity, decreaseQuantity } from "../redux/slices/cartSlice";
// import { useSnackbar } from "notistack";
// import { Delete } from "@mui/icons-material";

// const CartItem = ({ item }) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const dispatch = useDispatch();

//   const handleRemoveFromCart = () => {
//     dispatch(remove(item._id));
//     enqueueSnackbar(`Removed ${item.name} from the cart`, {
//       variant: "warning",
//       autoHideDuration: 3000,
//     });
//   };

//   const handleIncreaseQuantity = () => {
//     dispatch(increaseQuantity(item._id));
//   };

//   const handleDecreaseQuantity = () => {
//     if (item.quantity > 1) {
//       dispatch(decreaseQuantity(item._id));
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center p-5 justify-between bg-gray-800 mt-2 mb-2 rounded-xl">
//         <div className="flex p-3">
//           <img src={item.image} className="h-28 rounded-lg" alt="" />
//           <div className="ml-10 self-start space-y-5">
//             <h1 className="text-xl text-green-500 font-bold">{item.name}</h1>
//             <p className="font-semibold">Rs.{item.cost}</p>
//             <div className="flex items-center mt-2">
//               <button
//                 onClick={handleDecreaseQuantity}
//                 className="px-2 py-1 bg-gray-700 text-white rounded-l-lg"
//               >
//                 --
//               </button>
//               <span className="mx-1">{item.quantity}</span>
//               <button
//                 onClick={handleIncreaseQuantity}
//                 className="px-2 py-1 bg-gray-700 text-white rounded-r-lg"
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="bg-gray-700 hover:bg-gray-900 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3">
//           <Delete onClick={handleRemoveFromCart} className="text-green-500" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartItem;
import React from "react";
import { useDispatch } from "react-redux";
import { remove, increaseQuantity, decreaseQuantity } from "../redux/slices/cartSlice";
import { useSnackbar } from "notistack";
import { Delete } from "@mui/icons-material";

const CartItem = ({ item }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(remove(item.idMonAn)); // Thay đổi trường idMonAn theo tên thích hợp trong ứng dụng của bạn
    enqueueSnackbar(`Removed ${item.name} from the cart`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(item.idMonAn)); // Thay đổi trường idMonAn theo tên thích hợp trong ứng dụng của bạn
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.idMonAn)); // Thay đổi trường idMonAn theo tên thích hợp trong ứng dụng của bạn
    }
  };

  return (
    <>
      <div className="flex items-center p-5 justify-between bg-gray-800 mt-2 mb-2 rounded-xl">
        <div className="flex p-3">
          <img src={item.image} className="h-28 rounded-lg" alt="" /> {/* Thêm hình ảnh nếu có */}
          <div className="ml-10 self-start space-y-5">
            <h1 className="text-xl text-green-500 font-bold">{item.tenMon}</h1>
            <p className="font-semibold">Rs.{item.donGia}</p>
            {/* Hiển thị các trường mới của hóa đơn */}
            <div className="flex items-center mt-2">
               <button
                onClick={handleDecreaseQuantity}
                className="px-2 py-1 bg-gray-700 text-white rounded-l-lg"
              >
                --
              </button>
              <span className="mx-1">{item.quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="px-2 py-1 bg-gray-700 text-white rounded-r-lg"
              >
                +
              </button>
            </div>
            {/* <p>Quantity: {item.quantity}</p> */}
            <p>Total: {item.quantity * item.donGia} vnđ</p>
          </div>
        </div>
        <div className="bg-gray-700 hover:bg-gray-900 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3">
          <Delete onClick={handleRemoveFromCart} className="text-green-500" />
        </div>
      </div>
    </>
  );
};

export default CartItem;
