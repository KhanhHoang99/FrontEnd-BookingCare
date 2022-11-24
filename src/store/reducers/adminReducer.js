import actionTypes from '../actions/actionTypes';



const initialState = {
   genders: [],
   roles: [],
   positions: [],
   users: [],
   isLoadingGender: false,
   topDoctors: [],
   allDoctors: [],
   allScheduleTime: []
}

const adminReducer = (state = initialState, action) => {

    let copyState = {...state};
    switch (action.type) {
        
        case actionTypes.FETCH_GENDER_START:

            // console.log('FETCH_GENDER_START');
            copyState.isLoadingGender = true;

            return {
                ...copyState,
                
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            
            // console.log(action);
            // console.log('FETCH_GENDER_SUCCESS');
            copyState.genders = action.data
            copyState.isLoadingGender = false;
            
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILED:

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

        case actionTypes.FETCH_ALL_USER_SUCCESS: {
            copyState.users = action.users;
            return {
                ...copyState,
            }
        }

        case actionTypes.FETCH_ALL_USER_FAILED: {
            return {
                ...copyState,
            }
        }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS: {
            copyState.topDoctors = action.dataDoctors;
            return {
                ...copyState,
            }
        }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED: {
            return {
                ...copyState,
            }
        }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS: {
            copyState.allDoctors = action.dataDoctors
            return {
                ...copyState,
            }
        }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED: {
            return {
                ...copyState,
            }
        }

        case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS: {
            return {
                ...copyState,
            }
        }

        case actionTypes.SAVE_DETAIL_DOCTOR_FAILED: {
            return {
                ...copyState,
            }
        }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: {
            
            copyState.allScheduleTime = action.dataTime

            return {
                ...copyState,
            }
        }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED: {
            return {
                ...copyState,
            }
        }
            
        default:
            return state;
    }
}

export default adminReducer;