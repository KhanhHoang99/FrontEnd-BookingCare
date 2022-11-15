import actionTypes from '../actions/actionTypes';



const initialState = {
   genders: [],
   roles: [],
   positions: [],
   isLoadingGender: false
}

const adminReducer = (state = initialState, action) => {

    let copyState = {...state};
    switch (action.type) {
        
        case actionTypes.FETCH_GENDER_START:

            console.log('FETCH_GENDER_START');
            copyState.isLoadingGender = true;

            return {
                ...copyState,
                
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            
            // console.log(action);
            console.log('FETCH_GENDER_SUCCESS');
            copyState.genders = action.data
            copyState.isLoadingGender = false;
            
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED:

            console.log('FETCH_GENDER_FAILED');
            copyState.isLoadingGender = false;

            return {
                ...copyState,
            }
        case actionTypes.FETCH_POSITION_SUCCESS: 
        
            copyState.positions = action.data     

            return {
                ...copyState,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ROLE_SUCCESS: 
        
            copyState.roles = action.data     
            
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...copyState,
            }
            
        default:
            return state;
    }
}

export default adminReducer;