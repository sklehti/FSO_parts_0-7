import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return [...state, action.data];
    case "INIT_BLOG":
      return action.data;
    case "LIKE_BLOG":
      console.log(action);
      const id = action.data.blogLikes.id;
      const blogToChange = state.find((b) => b.id === id);
      const likes = { ...blogToChange, likes: blogToChange.likes + 1 };
      const likedAdded = state.map((b) => (b.id !== id ? b : likes));

      const likedSorted = likedAdded.sort(function (a, b) {
        return b.likes - a.likes;
      });
      return likedSorted;
    case "REMOVE_BLOG":
      return state.filter((b) => b.id !== action.data.id);

    default:
      return state;
  }
};

export const likeTheBlog = (id, changedBlog) => {
  return async (dispatch) => {
    const blogLikes = await blogService.update(id, changedBlog);

    dispatch({
      type: "LIKE_BLOG",
      data: {
        blogLikes,
      },
    });
  };
};

export const initializeBlogs = (b) => {
  return {
    type: "INIT_BLOG",
    data: b,
  };
};

export const createBlog = (data) => {
  return {
    type: "NEW_BLOG",
    data,
  };
};

export const deleteBlog = (data) => {
  return async (dispatch) => {
    await blogService.remove(data.id);

    dispatch({
      type: "REMOVE_BLOG",
      data,
    });
  };
};

export default blogReducer;
