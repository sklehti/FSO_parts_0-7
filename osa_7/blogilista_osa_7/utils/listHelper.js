const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  if (array.length === 0) {
    return 0;
  } else {
    const array_2 = array.map((a) => a.likes);
    //console.log(Math.max(...array_2), "suurin");

    return array.length === 1 ? array[0].likes : array_2.reduce(reducer, 0);
  }
};

const favoriteBlog = (array) => {
  const array_2 = array.map((a) => a.likes);
  const blog = array.filter((a) => a.likes === Math.max(...array_2));

  const favoriteBlog = {
    title: blog[0].title,
    author: blog[0].author,
    likes: blog[0].likes,
  };
  //console.log(favoriteBlog);
  return favoriteBlog;
};

const mostBlogs = (array) => {
  const array_2 = array.map((a) => a.author);
  const result_array = _.entries(_.countBy(array_2)).map(([author, blogs]) => ({
    author,
    blogs,
  }));
  //console.log(result_array);
  const array_3 = result_array.map((r) => r.blogs);
  const maxBlogs = result_array.filter((a) => a.blogs === Math.max(...array_3));
  //console.log(maxBlogs);

  return maxBlogs[0];
};

const mostLikes = (array) => {
  const result = _(array)
    .groupBy("author")
    .map((author, id) => ({
      author: id,
      likes: _.sumBy(author, "likes"),
    }))
    .value();

  //console.log(result);
  const numberOfLikes = result.map((r) => r.likes);
  //console.log(numberOfLikes);

  const theMostLike = result.filter(
    (r) => r.likes === Math.max(...numberOfLikes)
  );

  console.log(theMostLike);
  return theMostLike[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
