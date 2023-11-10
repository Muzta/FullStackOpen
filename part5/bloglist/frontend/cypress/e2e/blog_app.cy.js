describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", () => {
    cy.contains("Blogs");
    cy.get("#username");
    cy.get("#password");
    cy.get("#login-button");
  });
});
