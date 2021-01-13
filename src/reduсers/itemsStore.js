
const  SET_COUNT = "SET_COUNT"

const defaultState = {
    items:{
        name: 'Andrey'
    },
    isFetching: true,
}



export default  function reposReducer (state = defaultState, action){

    switch (action.type){
        case SET_COUNT:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}



export const  setCount = (items) => ({type:SET_COUNT, payload: items})

