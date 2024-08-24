import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
         logout:(state,value)=>{
             state.user = null;
            //  state.token = null;
             localStorage.removeItem("user");
             localStorage.removeItem("token");
         }
    },
});

export const {setUser, setLoading,logout} = profileSlice.actions;
export default profileSlice.reducer;