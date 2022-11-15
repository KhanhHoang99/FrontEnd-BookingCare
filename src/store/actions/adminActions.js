import actionTypes from './actionTypes';
import userService from '../../services/userService';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// });

export const fetchGenderStart =  () => {
   
    return async (dispatch, getState) => {
        try {

            dispatch({type: actionTypes.FETCH_GENDER_START});

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


export const fetchPositionStart =  () => {
   
    return async (dispatch, getState) => {
        try {

            let res = await userService.getAllCodeService("POSITION");
            if(res && res.errCode === 0) {
                dispatch(fetchPositonSuccess(res.data));
            }else {
                dispatch(fetchPositonFailed())
            }
        } catch (error) {
            console.log('fetch position error', error)
            dispatch(fetchPositonFailed());
        }
    }
};

export const fetchPositonSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});

export const fetchPositonFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
});

export const fetchRoleStart =  () => {
   
    return async (dispatch, getState) => {
        try {

            let res = await userService.getAllCodeService("ROLE");
            if(res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            console.log('fetch role error', error)
            dispatch(fetchRoleFailed());
        }
    }
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
});