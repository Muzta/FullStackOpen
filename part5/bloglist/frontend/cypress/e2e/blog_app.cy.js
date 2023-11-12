describe("Blog app", () => {
  const NAME = "testName",
    USERNAME = "testUsername",
    PASSWORD = "testPassword";
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = { name: NAME, username: USERNAME, password: PASSWORD };
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Blogs");
    cy.get("#username");
    cy.get("#password");
    cy.get("#login-button");
  });

  describe("Login", function () {
    const checkLogin = function ({ username, password, fails = false }) {
      cy.get("#username").type(username);
      cy.get("#password").type(password);
      cy.get("#login-button").click();

      if (!fails) {
        cy.contains(`${username} logged in`);
      } else {
        cy.get(".notification")
          .should("contain", "Invalid username or password")
          .and("have.css", "color", "rgb(255, 0, 0)")
          .and("have.css", "border-style", "solid");

        cy.get("html").should("not.contain", `${username} logged in`);
      }
    };

    it("succeeds with correct credentials", function () {
      checkLogin({ username: USERNAME, password: PASSWORD });
    });

    it("fails with wrong password", function () {
      checkLogin({ username: USERNAME, password: "wrong", fails: true });
    });

    it("fails with wrong username", function () {
      checkLogin({ username: "wrong", password: PASSWORD, fails: true });
    });

    it("fails with wrong username and password", function () {
      checkLogin({ username: "wrong", password: "wrong", fails: true });
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: USERNAME, password: PASSWORD });
    });

    describe("A new blog creation", function () {
      beforeEach(function () {
        cy.contains("New blog").click();
      });

      const title = "New blog test",
        author = "Test author",
        url = "http://test.com";

      const checkBlogCreation = ({
        title,
        url,
        author = "",
        fails = false,
      }) => {
        if (title) cy.get("#blog-form").get("#title").type(title);
        if (author) cy.get("#blog-form").get("#author").type(author);
        if (url) cy.get("#blog-form").get("#url").type(url);
        cy.get("#blog-form").get("#create").click();

        if (fails) {
          // Match the exact text i.e. there are no elements/blogs
          cy.get("#blog-list").should("have.text", "");
        } else {
          cy.get(".notification")
            .should("contain", "A new blog was added")
            .and("have.css", "color", "rgb(0, 128, 0)")
            .and("have.css", "border-style", "solid");
          cy.get("#blog-list")
            .contains(`${title} ${author}`)
            .contains("View")
            .click();
          cy.get("#blog-content").contains(NAME);
        }
      };

      it("succeeds when all the attributes are given", function () {
        checkBlogCreation({ title, author, url });
      });

      it("succeeds if author missed", function () {
        checkBlogCreation({ title, url });
      });

      it("fails if title missed", function () {
        checkBlogCreation({ author, url, fails: true });
      });

      it("fails if url missed", function () {
        checkBlogCreation({ title, author, fails: true });
      });
    });

    describe.only("Like a blog", function () {
      const title = "New blog test",
        author = "Test author",
        url = "http://test.com";

      beforeEach(function () {
        cy.createBlog({ title, author, url });
      });

      it("succeeds when liked once", function () {
        cy.get("#blog-list")
          .contains(`${title} ${author}`)
          .contains("View")
          .click();
        cy.get("#blog-content").contains("Likes 0");
        cy.get("#blog-content").get("#like-button").click();
        cy.get("#blog-content").contains("Likes 1");
      });

      it("succeeds when liked twice", function () {
        cy.get("#blog-list")
          .contains(`${title} ${author}`)
          .contains("View")
          .click();
        cy.get("#blog-content").contains("Likes 0");
        cy.get("#blog-content").get("#like-button").click().click();
        cy.get("#blog-content").contains("Likes 2");
      });
    });

    afterEach(function () {
      localStorage.clear();
    });
  });
});
