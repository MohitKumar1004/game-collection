export const creditCoins = (coins) => {
    return (dispatch) =>{
        dispatch({
            type: 'credit',
            payload: coins
        })
    }
}

export const debitCoins = (coins) => {
    return (dispatch) =>{
        dispatch({
            type: 'debit',
            payload: coins
        })
    }
}