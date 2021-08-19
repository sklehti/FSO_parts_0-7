const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const api = supertest(app);
const Blog = require("../models/blog");
let token = null;

describe("when there is initially some notes saved", () => {
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("salaisuus", 10);
    const user = new User({ username: "root_1", passwordHash });

    await user.save();

    const t = await api
      .post("/api/login")
      .send({ username: "root_1", password: "salaisuus" });

    token = t.body.token;
  });

  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("bloglist are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returned the correct amount blogs", async () => {
    //const response = await api.get("/api/blogs");
    const blogAtEnd = await helper.blogInDb();

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("the identification field for returned blogs should be named id", async () => {
    //const response = await api.get("/api/blogs");
    const blogAtEnd = await helper.blogInDb();

    expect(blogAtEnd[0].id).toBeDefined();
  });

  test("a valid blog can be added", async () => {
    const users = await helper.usersInDb();

    const newBlog = {
      title: "uusi_blogi2",
      author: "kirjailija_uusi2",
      url: "https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/",
      likes: 111,
      userId: users[0].id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    //const response = await api.get("/api/blogs");
    const blogAtEnd = await helper.blogInDb();

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogAtEnd).toContainEqual(
      expect.objectContaining({
        title: "uusi_blogi2",
        author: "kirjailija_uusi2",
        url: "https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/",
        likes: 111,
      })
    );
  });

  test("blog without likes is likes: 0", async () => {
    const users = await helper.usersInDb();

    const newBlog = {
      title: "React patterns_3",
      author: "Michael Chan_3",
      url: "https://reactpatterns.com/",
      userId: users[0].id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    //const response = await api.get("/api/blogs");
    const blogAtEnd = await helper.blogInDb();

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogAtEnd).toContainEqual(
      expect.objectContaining({
        title: "React patterns_3",
        author: "Michael Chan_3",
        url: "https://reactpatterns.com/",
        likes: 0,
      })
    );
  });

  test("blog without title and url is not added", async () => {
    const users = await helper.usersInDb();

    const newBlog = {
      author: "kirjailija_testi",
      likes: 0,
      userId: users[0].id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400);

    //const response = await api.get("/api/blogs");
    const blogAtEnd = await helper.blogInDb();

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is a valid", async () => {
      const users = await helper.usersInDb();

      const newBlog = {
        title: "uusi_blogi2",
        author: "kirjailija_uusi2",
        url: "https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/",
        likes: 111,
        userId: users[0].id,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogsAtMiddle = await helper.blogInDb();

      const blogToDelete = blogsAtMiddle[blogsAtMiddle.length - 1];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogInDb();
      console.log(blogsAtMiddle.length, blogsAtEnd.length);

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1 + 1);
      //tai
      expect(blogsAtEnd).toHaveLength(blogsAtMiddle.length - 1);
    });
  });

  describe("updated blogs", () => {
    test("blog is updated right", async () => {
      const blogsAtStart = await helper.blogInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedBlog = {
        title: "testi",
        author: "testikirjailija",
        url: "https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/",
        likes: 111111111111111,
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set("Authorization", `bearer ${token}`)
        .send(updatedBlog)
        .expect(200);

      const blogsAtEnd = await helper.blogInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      expect(blogsAtEnd).toContainEqual(
        expect.objectContaining({
          title: "testi",
          author: "testikirjailija",
          url: "https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/",
          likes: 111111111111111,
        })
      );
    });
  });

  describe("when there is initially one user at db", () => {
    /*
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash("salaisuus", 10);
      const user = new User({ username: "root_1", passwordHash });

      await user.save();
    });
    */

    test("creation succeds with a fresh suername", async () => {
      const userAtStart = await helper.usersInDb();

      const newUser = {
        username: "sleh",
        name: "Saara L",
        password: "salainen",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(userAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test("creation fails with proper statuscode and message if username is too short", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "ro",
        password: "salaisuus",
      };

      const result = await api
        .post("/api/users")
        .set("Authorization", `bearer ${token}`)
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain(
        "`username` (`ro`) is shorter than the minimum allowed length (3)"
      );

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test("creation fails with proper statuscode and message if username is missing", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        name: "invalid user",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("`username` is required");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test("creation fails with proper statuscode and message if username already taken", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root_1",
        name: "Superuser",
        password: "salainen_taas",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("`username` to be unique");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
