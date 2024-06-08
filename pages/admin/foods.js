
import React, { useState, useEffect } from "react";
import AdminDrawer from "../../components/admin/AdminDrawer";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Add, Cancel, Image } from "@mui/icons-material";
import { Modal, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchFoods } from "../../redux/slices/foodSlice";
import { useSnackbar } from "notistack";
import Router from "next/router";
import axios from "axios";
import Loading from "../../components/Loading";
import AdminFoodList from "../../components/admin/AdminFoodList";

const Foods = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tenMon, setName] = useState("");
  const [loai, setCategory] = useState("");
  const [donGia, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const {
    user: { user },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoods())
      .then((response) => {
        setFoods(response.payload);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  const handleDeleteFood = (idMonAn) => {
    setFoods((prevFoods) => prevFoods.filter((food) => food.id_mon_an !== idMonAn));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = window.localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API, {
        method: "POST",
        body: formData,
      });
      const res2 = await res.json();

      const newFood = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/foods/new`,
        {
          tenMon,
          loai,
          donGia,
          description,
          image: res2.secure_url,
        },
        { headers: { Authorization: token } }
      );

      setLoading(false);
      setName("");
      setCategory("");
      setCost("");
      setDescription("");
      setSelectedImage(null);
      setOpenModal(false);
      enqueueSnackbar("Food item added successfully!", { variant: "success", autoHideDuration: 3000 });

      setFoods((prevFoods) => [...prevFoods, newFood.data]); // Update the state with the new food item
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(err.response?.data?.message || "Failed to add food item", { variant: "error", autoHideDuration: 3000 });
    }
  };

  useEffect(() => {
    if (user === null) {
      Router.push("/");
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="hidden lg:flex justify-center max-w-6xl mx-auto min-h-[83vh] p-3">
            <AdminSidebar />
            <div className="flex-grow min-w-fit ml-5">
              <div className="flex flex-col items-center">
                <h1 className="text-lg font-semibold text-green-400 mb-5">
                  FOOD ITEMS
                </h1>
                {foods.map((item) => (
                  <AdminFoodList key={item.id_mon_an} item={item} onDelete={handleDeleteFood} />
                ))}
              </div>
            </div>
          </div>
          <div className="min-h-[83vh] p-3 lg:hidden">
            {/* Mobile version */}
            <div className="flex flex-col">
              <AdminDrawer />
              <div className="flex flex-col justify-center items-center mt-3">
                <h1 className="text-lg font-semibold text-green-400">FOOD ITEMS</h1>
                {foods.map((item) => (
                  <AdminFoodList key={item.id_mon_an} item={item} onDelete={handleDeleteFood} />
                ))}
              </div>
            </div>
          </div>
          <Tooltip title="Add new food">
            <div
              className="fixed h-14 w-14 cursor-pointer hover:scale-110 transition duration-300 ease-in bottom-32 right-4 md:right-28 rounded-full bg-green-600 flex justify-center items-center"
              onClick={() => setOpenModal(true)}
            >
              <Add className="text-white font-bold text-3xl" />
            </div>
          </Tooltip>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div className="h-full w-full md:h-[600px] md:w-[450px] border-none rounded-lg outline-none bg-gray-700 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center relative justify-center h-full">
                <form
                  className="flex flex-col items-center justify-center"
                  onSubmit={handleSubmit}
                >
                  <input
                    value={tenMon}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 border-2 border-green-400 mt-3 bg-transparent rounded-lg outline-none font-semibold placeholder:text-sm"
                    type="text"
                    placeholder="Food name"
                  />
                  <input
                    value={loai}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-3 border-2 border-green-400 mt-3 bg-transparent rounded-lg outline-none font-semibold placeholder:text-sm"
                    type="text"
                    placeholder="Category"
                  />
                  <input
                    value={donGia}
                    onChange={(e) => setCost(e.target.value)}
                    className="p-3 border-2 border-green-400 mt-3 bg-transparent rounded-lg outline-none font-semibold placeholder:text-sm"
                    type="text"
                    placeholder="Price"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-3 border-2 border-green-400 mt-3 bg-transparent rounded-lg outline-none font-semibold placeholder:text-sm w-full"
                    placeholder="Description"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <label htmlFor="image">
                      <Image className="text-green-500 text-3xl cursor-pointer" />{" "}
                      {selectedImage && (
                        <h1 className="text-white text-sm font-semibold mt-2 mb-3">
                          {selectedImage.name}
                        </h1>
                      )}
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                      className="opacity-0 w-48"
                      id="image"
                    />
                  </div>
                  <input
                    type="submit"
                    value="Add New Food"
                    className="bg-white text-green-500 font-bold p-3 outline-none rounded-lg w-full cursor-pointer mt-3 hover:bg-green-400 hover:text-white transition duration-300 ease-in"
                  />
                </form>
                <div className="absolute top-2 left-2 flex justify-center items-center bg-gray-700 h-10 w-10 rounded-full cursor-pointer">
                  <Cancel
                    className="text-3xl"
                    onClick={() => setOpenModal(false)}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Foods;
