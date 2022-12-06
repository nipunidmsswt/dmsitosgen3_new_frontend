import {
    SAVE_ROOM_RECREATION_DATA,
    GET_ALL_ROOM_RECREATION_DATA,
    GET_ROOM_RECREATION_DATA_BY_ID,
    UPDATE_ROOM_RECREATION_DATA,
    CHECK_ROOM_RECREATION_DUPLICATE,
    GET_LAST_MODIFIED_DATE_TIME_ROOM_RECREATION
} from '../../constant/master/RoomRecreationConstant';

export const saveRoomRecreationData = (data) => {
    console.log('saveTax group Data action s called', data);
    return {
        type: SAVE_ROOM_RECREATION_DATA,
        data
    };
};

export const getAllRoomRecreationDetails = () => {
    console.log('get all group Data action s called');
    return {
        type: GET_ALL_ROOM_RECREATION_DATA
    };
};

export const getRoomRecreationDataById = (id) => {
    console.log('getTaxDataById  called', id);
    return {
        type: GET_ROOM_RECREATION_DATA_BY_ID,
        data: { id }
    };
};

export const updateRoomRecreationData = (data) => {
    console.log('getTaxDataById  called', data);
    return {
        type: UPDATE_ROOM_RECREATION_DATA,
        data: data
    };
};

export const checkDuplicateRoomRecreationCode = (data) => {
    console.log('getTaxDataById  called', data);
    return {
        type: CHECK_ROOM_RECREATION_DUPLICATE,
        data: data
    };
};

export const getLatestModifiedRoomRecreationDetails = () => {
    return {
        type: GET_LAST_MODIFIED_DATE_TIME_ROOM_RECREATION
    };
};
