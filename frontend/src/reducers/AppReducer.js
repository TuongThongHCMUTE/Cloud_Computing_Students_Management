const appReducer = (state, action) => {
    switch (action.type) {
        case "CURRENT_USER":
            return {...state, user: action.payload};
        case "CURRENT_USER_INFO":
            console.log("PAYLOAD: ", action.payload);
            return {...state, userInfo: action.payload};
        case "UPDATE_CURRENT_USER_INFO":
            return {
                ...state,
                userInfo: {...state.userInfo, ...action.payload}
            };
        default:
            return state;
    }
}

export default appReducer;