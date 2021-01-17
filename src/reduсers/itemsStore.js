
const  SET_USERS = "SET_USERS"
const  SET_ITEMS = "SET_ITEMS"

const itemsStore = {
    items:[],
    isFetching: true,
}
const itemsUsers = {
    users:[],
    isFetching: true,
}
export  function itemsReducer (state = itemsStore, action){

    switch (action.type){
        case SET_ITEMS:
            return {
                ...itemsStore,
                items: action.payload,
            }

        default:
            return state
    }
}
export function userReducer (state = itemsUsers , action){

    switch (action.type){
        case SET_USERS:
            return{
                ...itemsUsers,
                users: action.payload
            }
        default:
            return state
    }
}
export const  setUsers = (users) => ({type:SET_ITEMS, payload: users})
export const  setCount = (items) => ({type:SET_ITEMS, payload: items})

