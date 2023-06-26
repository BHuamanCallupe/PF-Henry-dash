import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Products, User } from '../../types';
import { getProductByID, getProducts, getUser, logicDeleteProductByID } from '../thunks';
import { formValues } from '../../pages/Form/FormPostProduct';
import { boolean } from 'zod';

type userState = {
  userData: User;
  products: Products[];
  session: boolean;
  currentProductbyID: Products;
  currentProductID: string
  // customers: Customers[]
};

const initialState: userState = {
  userData: {
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    province: '',
    postalCode: 0,
    phone: '',
    commerceName: '',
    purchasedProducts: [],
    role: '',
    cart: '',
    id: '',
  },
  products: [
    {
      name: '',
      price: 0,
      description: '',
      stock: 0,
      hasDiscount: true,
      discount: 0,
      photos: [
        {
          url: '',
          public_id: '',
        },
      ],
      category: '',
      freeShipping: true,
      sales: 0,
      rating: 0,
      reviews: [],
      seller: '',
      isActive: true,
      id: '',
    },
  ],
  session: false,
  currentProductbyID: {
    name: '',
    price: 0,
    description: '',
    stock: 0,
    hasDiscount: true,
    discount: 0,
    photos: [
      {
        url: '',
        public_id: '',
      },
    ],
    category: '',
    freeShipping: true,
    sales: 0,
    rating: 0,
    reviews: [],
    seller: '',
    isActive: true,
    id: '',
  },
  currentProductID: ""
  // customers: [],
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<boolean>) => {
      state.session = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      if (action.payload?.id) {
        state.userData = action.payload;
      }
    },
    setCurrentProductID: (state, action: PayloadAction<string>) => {
      state.currentProductID = action.payload
    },
    clearCurrentProductID: (state) => {
      state.currentProductID = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.userData = action.payload;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = [...action.payload];
    });

    builder.addCase(getProductByID.fulfilled, (state, action) => {
      state.currentProductbyID = action.payload;
    });

    builder.addCase(logicDeleteProductByID.fulfilled, (state, action) => {
      state.products = state.products;
    });

    // builder.addCase(postProduct.fulfilled, (state, action: PayloadAction<formValues>) => {
    //   state.products = [...action.payload];
    // });

    // TODO: create Product
  },
});

export const { setSession, setCurrentUser, setCurrentProductID, clearCurrentProductID } = counterSlice.actions;

export default counterSlice.reducer;
