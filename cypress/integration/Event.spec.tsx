describe('CRA', () => {
  beforeEach(() => {
    cy.intercept('GET', 'image/*', { fixture: 'images/image.jpg' });
    cy.visit('http://localhost:3000/event/123');
  });
  it('should redirect to events', function () {
    cy.location('pathname').should('eq', '/event/123');
  });
  it('shows message', function () {
    cy.get('.App > div').should('be.visible').and('have.text', 'Nie znaleziono wydarzenia');
  });
});
