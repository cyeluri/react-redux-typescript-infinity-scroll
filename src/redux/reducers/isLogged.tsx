const isLoggedReducer = (state:boolean = false, action: any) => {
    switch(action.type) {
        case'SING_IN' : return !state;
        default : return false;
    }
}

export default isLoggedReducer;