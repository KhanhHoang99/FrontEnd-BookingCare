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
            // console.log('res: ', res)
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

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.getTopDoctorHomeService('6');
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }else{

                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (error) {
            console.log("'FETCH_TOP_DOCTORS_FAILED: ", error)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.getAllDoctors();
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }else{

                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (error) {
            console.log("'FETCH_ALL_DOCTORS_FAILED: ", error)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {

            // console.log(data)

            const res = await userService.saveDetailDoctor(data);
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
                toast.success('Save info Detail Doctor succeed!')
            }else{
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
                toast.error('Save info Detail Doctor failed!')
            }
        } catch (error) {
            toast.error('Save info Detail Doctor failed!')
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchAllScheduleTime = (type) => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.getAllCodeService('TIME');
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }else{

                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (error) {
            console.log("'FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ", error)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

export const getAllRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})

            const resPrice = await userService.getAllCodeService('PRICE');
            const resPayment = await userService.getAllCodeService('PAYMENT');
            const resProvince = await userService.getAllCodeService('PROVINCE');
            const resSpecialty = await userService.getAllSpecialty();
            const resClinic = await userService.getAllClinic();

            if(
                resPrice && resPrice.errCode === 0 && 
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0
            ){
                let data = { 
                            resPrice: resPrice.data,
                            resPayment: resPayment.data,
                            resProvince: resProvince.data,
                            resSpecialty: resSpecialty.data,
                            resClinic: resClinic.data
                        }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            }else{

                dispatch(fetchRequiredDoctorInforFailed())
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInforFailed())
            console.log(error)
        }
    }
}

const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
    
})

const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})