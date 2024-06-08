import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FoodItem from "../../components/FoodItem";
import FoodItemContainer from "../../components/FoodItemContainer";
import { fetchFoods } from "../../redux/slices/foodSlice";
import FoodLinks from "../../components/FoodLinks";

const rice = () => {
  const {
    food: { data },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const riceItems = data.filter((item) => item.loai === "Sushi");

  useEffect(() => {
    dispatch(fetchFoods());
  }, []);
  return (
    <>
      <div className="max-w-6xl mx-auto min-h-[83vh] p-3">
        <FoodLinks />
        <FoodItemContainer>
          {riceItems.map((item) => {
            return <FoodItem key={item.idMonAn} item={item} />;
          })}
        </FoodItemContainer>
      </div>
    </>
  );
};

export default rice;
