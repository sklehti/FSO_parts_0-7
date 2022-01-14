const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "testi",
    author: "testikirjailija",
    url: "https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/",
    likes: 1,
  },
  {
    title: "testi_2",
    author: "testikirjailija_2",
    url: "https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/",
    likes: 10,
  },
  {
    title: "testi_3",
    author: "testikirjailija_3",
    url: "https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/",
    likes: 0,
  },
  {
    title: "testi_4",
    author: "testikirjailija_4",
    url: "https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/",
    likes: 0,
  },
  {
    title: "uusi_blogi",
    author: "kirjailija_uusi",
    url: "https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/",
    likes: 111,
  },
];

const blogInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogInDb,
  usersInDb,
};
