import { createSlice } from '@reduxjs/toolkit'

const initialState={
    client:{toggleForm:false,conferenceScenarioMode:undefined}
}
export const ReducerSlice = createSlice({
    name:"confy",
    initialState,
    reducers:{
        toggleChangeAction:(state)=>{
            state.client.toggleForm= !state.client.toggleForm
        },
        conferenceModeChangeAction:(state,actions)=>{
            state.client.conferenceScenarioMode = actions.payload
        }
    }
})

export const{toggleChangeAction,conferenceModeChangeAction} = ReducerSlice.actions
export default ReducerSlice.reducer;