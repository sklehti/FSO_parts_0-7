describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Saara L",
      username: "sleh",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("sleh");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("Saara L logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("wrong_user");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", "logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "sleh", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("test blog");
      cy.get("#author").type("tester");
      cy.get("#url").type("joku url osoite...");
      cy.get("#create-button").click();

      cy.contains("test blog tester");
    });

    describe("A blog can be created again", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "second blog created by cypress",
          author: "second test user",
          url: "http address...",
        });
      });
      it("show blog you created", function () {
        cy.contains("second blog created by cypress").contains("view").click();
      });

      it("the user can like the blog", function () {
        cy.contains("second blog created by cypress").contains("view").click();
        cy.get("#like-button").click();
        cy.contains("likes:1");

        cy.get("#like-button").click();
        cy.contains("likes:2");
      });

      describe("remove blog", function () {
        it("incorrect blog removing", function () {
          cy.get("#logout-button").click();

          const user = {
            name: "toinen käyttäjä",
            username: "toinen",
            password: "toinen",
          };
          cy.request("POST", "http://localhost:3003/api/users/", user);
          cy.visit("http://localhost:3000");

          cy.contains("login").click();
          cy.get("#username").type("toinen");
          cy.get("#password").type("toinen");
          cy.get("#login-button").click();

          cy.contains("second blog created by cypress")
            .contains("view")
            .click();

          cy.get("button").should("not.contain", "remove");
        });

        it("correct blog removing", function () {
          cy.contains("second blog created by cypress")
            .contains("view")
            .click();
          cy.contains("remove").click();
          cy.get("html").should(
            "not.contain",
            "second blog created by cypress"
          );
        });
      });

      describe("likes sorted correctly", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "third blog created by cypress",
            author: "third test user",
            url: "http address...",
            likes: 2,
          });
          cy.createBlog({
            title: "fourth blog created by cypress",
            author: "fourth test user",
            url: "http address...",
            likes: 5,
          });
          cy.createBlog({
            title: "fifth blog created by cypress",
            author: "fift test user",
            url: "http address...",
            likes: 20,
          });
        });

        it("likes sorted correctly", async function () {
          await cy
            .request("GET", "http://localhost:3003/api/blogs")
            .then(({ body }) => {
              for (let i = 0; i < body.length; i++) {
                cy.contains(body[i].title).contains("view").click();
                //cy.log(JSON.stringify(body[i].likes));
              }
              cy.contains(body[3].title).contains("likes:20");
              cy.contains(body[2].title).contains("likes:5");
              cy.contains(body[1].title).contains("likes:2");
              cy.contains(body[0].title).contains("likes:0");

              cy.contains(body[0].title).contains("like").click();
              cy.wait(1000);

              cy.contains(body[0].title).contains("like").click();
              cy.wait(1000);

              cy.contains(body[0].title).contains("like").click();
              cy.wait(1000);

              cy.contains(body[3].title).contains("likes:20");
              cy.contains(body[2].title).contains("likes:5");
              cy.contains(body[0].title).contains("likes:3");
              cy.contains(body[1].title).contains("likes:2");
            });
        });
      });
    });
  });
});
