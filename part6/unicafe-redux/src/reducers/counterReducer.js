const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    let newState = {...state} // clone the object
    switch (action.type) {
      case 'GOOD':
        newState.good++
        break;
      case 'OK':
        newState.ok++
        break
      case 'BAD':
        newState.bad++
        break
      case 'ZERO':
        newState = initialState
        break
    //   default:         
    }
    return newState
  
  }
  
  export default counterReducer