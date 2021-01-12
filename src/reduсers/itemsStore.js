const  SET_COUNT = "SET_COUNT"

const defaultState = {
    items:{
        name: "andrey"
    },
    isFetching: true,
}

export default  function reposReducer (statee = defaultState, action){

    switch (action.type){
        case SET_COUNT:
            return {
                ...statee,
                items: action.payload
            }
        default:
            return statee
    }
}



export const  setCount = (items) => ({type:SET_COUNT, payload: items})

