import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        // logout:(state,action)=>{
        //     state.token = null;
        //     localStorage.removeItem("token");
        // }
    },
})

export const { setSignupData, setLoading, setToken  } = authSlice.actions;
export default authSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const initialToken = localStorage.getItem("token");
// console.log("TOKEN:"+initialToken);
// const token = initialToken ? initialToken : null;

// const initialState = {
//   signupData: null,
//   loading: false,
//   token: token,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialState,
//   reducers: {
//     setSignupData(state, action) {
//       state.signupData = action.payload;
//     },
//     setLoading(state, action) {
//       state.loading = action.payload;
//     },
//     setToken(state, action) {
//       state.token = action.payload;
//     },
//   },
// });

// export const { setSignupData, setLoading, setToken } = authSlice.actions;
// export default authSlice.reducer;
