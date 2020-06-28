import _ from 'lodash'
import jsonPlaceholder from '../apis/jsonPlaceholder'

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts())
  
  const ids = _.uniq(_.map(getState().posts, 'userId'))
  ids.forEach(id => dispatch(fetchUser(id)))
}

export const fetchPosts = () => async (dispatch) => {
  const { data } = await jsonPlaceholder.get('/posts')

  dispatch({ type: 'FETCH_POSTS', payload: data })
}

export const fetchUser = (id) => async (dispatch) => {
  const { data } = await jsonPlaceholder.get(`/users/${id}`)

  dispatch({ type: 'FETCH_USER', payload: data })
}
// one approach to solve over fetching users from api
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch)
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const { data } = await jsonPlaceholder.get(`/users/${id}`)

//   dispatch({ type: 'FETCH_USER', payload: data })
// })
