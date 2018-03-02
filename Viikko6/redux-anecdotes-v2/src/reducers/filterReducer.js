const filterReducer = (store = '', action) => {
    switch(action.type) {
        case 'FILTER_CHANGE':
            return action.filter
        default:
            return store
    }

}

export const filterChange = (filter) => {
    return {
        type: 'FILTER_CHANGE',
        filter
    }
}

export default filterReducer