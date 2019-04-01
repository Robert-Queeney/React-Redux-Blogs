import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    // need to dispatch since we are calling action creator insode an action creator
    await dispatch(fetchPosts());
// using lodash version of map and uniq b/c it skips some logic
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // // iterating over the usrIds from above and dispatching them
    // userIds.forEach(id => dispatch(fetchUser(id)));

// optional refactor:
// _.chain will take the previous arg and automatically call it
    _.chain(getState.posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
}

export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({ type: 'FETCH_POSTS', payload: response.data })
        // console.log(response)
    }
}; 

export const fetchUser = (id) =>async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data})
};


// This is how we did it with lodash & memoize
// import _ from 'lodash';
// import jsonPlaceholder from '../apis/jsonPlaceholder';

// export const fetchPosts = () => {
//     return async (dispatch) => {
//         const response = await jsonPlaceholder.get('/posts');

//         dispatch({ type: 'FETCH_POSTS', payload: response.data })
//         // console.log(response)
//     }
// }; 

// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch);
// }

// // the "_" before the function means it is a private function and no one else should use it 
// // here is where we memoize
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: 'FETCH_USER', payload: response.data})
// })
