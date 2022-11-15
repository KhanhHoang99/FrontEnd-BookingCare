import actionTypes from './actionTypes';
import userService from '../../services/userService';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// });

export const fetchGenderStart =  () => {
   
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService("GENDER");
            if(res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            console.log('fetch error', error)
            dispatch(fetchGenderFailed());
        }
    }
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
});