import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: [],
//   reducers: {
//     add: (state, action) => {
//       const itemIndex = state.findIndex(item => item.idMonAn === action.payload.idMonAn);
//       if (itemIndex >= 0) {
//         state[itemIndex].quantity += 1;
//       } else {
//         state.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     remove: (state, action) => {
//       return state.filter(item => item.idMonAn !== action.payload);
//     },
//     increaseQuantity: (state, action) => {
//       const itemIndex = state.findIndex(item => item.idMonAn === action.payload);
//       if (itemIndex >= 0) {
//         state[itemIndex].quantity += 1;
//       }
//     },
//     decreaseQuantity: (state, action) => {
//       const itemIndex = state.findIndex(item => item.idMonAn === action.payload);
//       if (itemIndex >= 0 && state[itemIndex].quantity > 1) {
//         state[itemIndex].quantity -= 1;
//       }
//     },
//     clearCart: (state) => {
//       return [];
//     }
//   }
// });

// export const { add, remove, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    add: (state, action) => {
      const itemIndex = state.findIndex(item => item.idMonAn === action.payload.idMonAn);
      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    remove: (state, action) => {
      return state.filter(item => item.idMonAn !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.findIndex(item => item.idMonAn === action.payload);
      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.findIndex(item => item.idMonAn === action.payload);
      if (itemIndex >= 0 && state[itemIndex].quantity > 1) {
        state[itemIndex].quantity -= 1;
      }
    },
    clearCart: (state) => {
      return [];
    }
  }
});

export const { add, remove, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
