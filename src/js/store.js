// // // // // // // // // // // // // // //

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => (listeners = listeners.filter((l) => l !== listener));
  };

  dispatch({});
  return { getState, dispatch, subscribe };
};

// // // // // // // // // // // // // // //

const RETRIEVE_DATA = 'data';
const retrieveData = (payload) => ({ type: RETRIEVE_DATA, payload: payload });

// // // // // // // // // // // // // // //

const initialState = {
  word: '',
  phonetic: '',
  audio: '',
  source: '',
  meanings: '',
};

// // // // // // // // // // // // // // //

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'data':
      return {
        word: action.payload.word,
        phonetic: action.payload.phonetic,
        audio: action.payload.audio,
        source: action.payload.source,
        meanings: action.payload.meanings,
      };

    default:
      return state;
  }
};

// // // // // // // // // // // // // // //

const store = createStore(reducer);

// // // // // // // // // // // // // // //

export { retrieveData };
export const dispatch = store.dispatch;
export const subscribe = store.subscribe;
export const selectData = () => store.getState();

// // // // // // // // // // // // // // //

// store.subscribe(() => console.log(store.getState()));
