describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = { name: "test", username: "test", password: "test" };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173");
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
      checkLogin({ username: "test", password: "test" });
    });

    it("fails with wrong password", function () {
      checkLogin({ username: "test", password: "wrong", fails: true });
    });

    it("fails with wrong username", function () {
      checkLogin({ username: "wrong", password: "test", fails: true });
    });

    it("fails with wrong username and password", function () {
      checkLogin({ username: "wrong", password: "wrong", fails: true });
    });
  });
});
