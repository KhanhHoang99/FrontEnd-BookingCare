import actionTypes from './actionTypes';
import userService from '../../services/userService';
import { toast } from "react-toastify";

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

export const createNewUser = (data) => {
    
    return async (dispatch, getState) => {
        try {

            let res = await userService.createNewUser(data);
            console.log('res: ', res)
            if(res && res.errCode === 0) {
                toast.success("CREATE A USER SUCCESS");
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUserStart());
            }else {
                toast.error(res.message);
                dispatch(saveUserFailed());
            }
        } catch (error) {
            console.log('fetch role error', error)
            dispatch(saveUserFailed());
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUserStart =  () => {
   
    return async (dispatch, getState) => {
        try {

            let res = await userService.getAllUsers("All");
            if(res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users));
            }else {
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            console.log('fetch role error', error)
            dispatch(fetchRoleFailed());
        }
    }
};

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const deleteUser = (userId) => {
    
    return async (dispatch, getState) => {
        try {

            let res = await userService.deleteUserService(userId);
            console.log('res: ', res)
            if(res && res.errCode === 0) {
                toast.success("DELETE THE USER SUCCESS");
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUserStart());
            }else {
                toast.error("DELETE THE USER ERROR");
                dispatch(saveUserFailed());
            }
        } catch (error) {
            console.log('fetch role error', error)
            dispatch(saveUserFailed());
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})


export const editUser = (user) => {
    
    return async (dispatch, getState) => {
        try {

            let res = await userService.editUserService(user);
            // console.log('res: ', res)
            if(res && res.errCode === 0) {
                toast.success("EDIT USER SUCCESS");
                dispatch(editUserSuccess(res.data));
                dispatch(fetchAllUserStart());
            }else {
                toast.error("Edit user error: ", res.message);
                dispatch(editUserFailed());
            }
        } catch (error) {
            console.log('fetch role error', error)
            dispatch(saveUserFailed());
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})