import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuItem {
    menu: string,
    img: any,
    quantities: number,
    price: number // Price ของแต่ละเมนู
}

interface MenuState {
    menuLists: MenuItem[],
    totalPrice: number // ราคารวมทั้งหมด
}

const initialState: MenuState = {
    menuLists: [],
    totalPrice: 0 // Initial value เป็น 0
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        addMenu: (state, action: PayloadAction<MenuItem>) => {
            const configSameMenu = state.menuLists.findIndex(
                (item) => item.menu === action.payload.menu
            );
            // Check if the menu already exists
            if (configSameMenu !== -1) {
                state.menuLists[configSameMenu].quantities += 1;
            } else {
                state.menuLists.push(action.payload);
            }

            // คำนวณราคารวมใหม่
            state.totalPrice = state.menuLists.reduce((sum, item) => 
                sum + (item.quantities * item.price), 0);
        },
        decreaseQuantityMenu: (state, action: PayloadAction<string>) => {
            const existIndexMenu = state.menuLists.findIndex(
                (item) => item.menu === action.payload
            );

            if (existIndexMenu !== -1 && state.menuLists[existIndexMenu].quantities > 1) {
                state.menuLists[existIndexMenu].quantities -= 1;
            }

            // คำนวณราคารวมใหม่
            state.totalPrice = state.menuLists.reduce((sum, item) => 
                sum + (item.quantities * item.price), 0);
        },
        removeMenu: (state, action: PayloadAction<string>) => {
            state.menuLists = state.menuLists.filter(
                (item) => item.menu !== action.payload
            );

            // คำนวณราคารวมใหม่
            state.totalPrice = state.menuLists.reduce((sum, item) => 
                sum + (item.quantities * item.price), 0);
        },
        setPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice = action.payload;
        },
        clearMenuList: (state) => {
            // Clear รายการเมนูทั้งหมดและตั้งราคารวมเป็น 0
            state.menuLists = [];
            state.totalPrice = 0;
        }
    }
});

export const { addMenu, removeMenu, decreaseQuantityMenu, setPrice, clearMenuList } = menuSlice.actions;

export default menuSlice.reducer;
