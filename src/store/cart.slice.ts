import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const CART_PERSISTENT_STATE = 'cartData';

export interface CartItem {
    _id:string;
    count:number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
    items: []
}

export const cartSlice=createSlice({
    name: 'cart',
    initialState,
    reducers: {
        remove: (state, action:PayloadAction<string>) => {
            state.items=state.items.filter(i => i._id!== action.payload);
        },
        // delete: (state, action:PayloadAction<number>) => {
        //     const existed = state.items.find(i => i.id === action.payload);
        //     if (!existed) {
        //         return;
        //     }
        //         if (existed.count === 1) {
        //             state.items=state.items.filter(i => i.id!== action.payload)
        //         }else {
        //             state.items.map(i => {
        //                 if (i.id==action.payload) {
        //                     i.count-=1;
        //                 }
        //                 return i;
        //             })
        //             return;
        //         }
                
        //     },
        add: (state, action:PayloadAction<string>) => {
            const existed = state.items.find(i => i._id === action.payload);
            if (!existed) {
                state.items.push({_id: action.payload, count:1});
                return;
            }
            state.items.map(i => {
                if (i._id==action.payload) {
                    i.count+=0;
                }
                return i;
            })

        }
    },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;