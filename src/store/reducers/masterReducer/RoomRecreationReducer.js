import {
    ADD_SUCCESS_ROOM_RECREATION_DATA,
    ADD_FAILED_ROOM_RECREATION_DATA,
    SUCCESS_ROOM_RECREATION_LIST_DATA,
    SUCCESS_GET_ROOM_RECREATION_DATA_BY_ID,
    FAILED_ROOM_RECREATION_LIST_DATA,
    FAILED_GET_ROOM_RECREATION_DATA_BY_ID,
    UPDATE_SUCCESS_ROOM_RECREATION_DATA,
    UPDATE_FAILED_ROOM_RECREATION_DATA,
    ROOM_RECREATION_DUPLICATE,
    SUCCESS_LAST_MODIFIED_DATE_ROOM_RECREATION,
    FAILED_LAST_MODIFIED_DATE_ROOM_RECREATION
} from '../../constant/master/RoomRecreationConstant';

const initialState = {
    roomRecreation: null,
    roomRecreations: [],
    roomRecreationpToUpdate: null,
    errorMsg: null,
    duplicateRoomRecreation: null,
    lastModifiedDateTime: null
};

export const roomRecreationReducer = (state = initialState, action) => {
    const { data } = action;
    console.log(data);
    switch (action.type) {
        case ADD_SUCCESS_ROOM_RECREATION_DATA:
            return { ...state, roomRecreation: data.payload[0] };

        case ADD_FAILED_ROOM_RECREATION_DATA:
            return {
                ...state,
                roomRecreation: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_GET_ROOM_RECREATION_DATA_BY_ID:
            return { ...state, roomRecreationpToUpdate: data.payload[0] };

        case FAILED_GET_ROOM_RECREATION_DATA_BY_ID:
            return {
                ...state,
                roomRecreationpToUpdate: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case UPDATE_SUCCESS_ROOM_RECREATION_DATA:
            return { ...state, roomRecreation: data.payload[0] };

        case UPDATE_FAILED_ROOM_RECREATION_DATA:
            return {
                ...state,
                roomRecreation: null,
                errorMsg: data ? data.errorMessages : 'netwok error'
            };

        case SUCCESS_ROOM_RECREATION_LIST_DATA:
            return { ...state, roomRecreations: data };

        case FAILED_ROOM_RECREATION_LIST_DATA:
            return { ...state, roomRecreations: data };

        case ROOM_RECREATION_DUPLICATE:
            return { ...state, duplicateRoomRecreation: data };

        case SUCCESS_LAST_MODIFIED_DATE_ROOM_RECREATION:
            return { ...state, lastModifiedDateTime: data.payload[0].dateTime };

        case FAILED_LAST_MODIFIED_DATE_ROOM_RECREATION:
            return { ...state, lastModifiedDateTime: data };

        default:
            return state;
    }
};
