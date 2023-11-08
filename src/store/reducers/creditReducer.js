export default function reducer(state = 0, action) {
    if(action.type === 'credit') {
        return state + action.payload
    } else if(action.type === 'debit') {
        return state - action.payload
    } else {
        return state
    }
}