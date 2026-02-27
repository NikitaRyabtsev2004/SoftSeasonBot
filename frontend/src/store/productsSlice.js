import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = '/api';

export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async () => {
        const response = await axios.get(`${API}/categories`);
        return response.data;
    }
);

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (category = null) => {
        const url = category ? `${API}/products?category=${category}` : `${API}/products`;
        const response = await axios.get(url);
        return response.data;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        categories: [],
        currentCategory: null,
        selectedProduct: null,
        zoomedMaterial: null,
        currentImageIndex: {},
        loading: false,
        error: null,
        currentPage: 1,
        itemsPerPage: 12,
    },
    reducers: {
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
            state.currentPage = 1;
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        setZoomedMaterial: (state, action) => {
            state.zoomedMaterial = action.payload;
        },
        setCurrentImageIndex: (state, action) => {
            state.currentImageIndex = {
                ...state.currentImageIndex,
                [action.payload.productId]: action.payload.index,
            };
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        resetImageIndex: (state, action) => {
            const { productId } = action.payload;
            state.currentImageIndex[productId] = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.currentPage = 1;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export const {
    setCurrentCategory,
    setSelectedProduct,
    setZoomedMaterial,
    setCurrentImageIndex,
    setCurrentPage,
    resetImageIndex,
} = productsSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectCategories = (state) => state.products.categories;
export const selectCurrentCategory = (state) => state.products.currentCategory;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectZoomedMaterial = (state) => state.products.zoomedMaterial;
export const selectCurrentImageIndex = (state) => state.products.currentImageIndex;
export const selectLoading = (state) => state.products.loading;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectItemsPerPage = (state) => state.products.itemsPerPage;
export const selectPaginatedProducts = (state) => {
    const { items, currentPage, itemsPerPage } = state.products;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
};
export const selectTotalPages = (state) =>
    Math.ceil(state.products.items.length / state.products.itemsPerPage);

export default productsSlice.reducer;