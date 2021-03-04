describe('CRA', () => {
  beforeEach(() => {
    cy.intercept('GET', 'events', { fixture: 'events.json' });
    cy.intercept('GET', 'image/*', { fixture: 'images/image.jpg' });
    cy.visit('http://localhost:3000');
  });
  it('should redirect to events', function () {
    cy.location('pathname').should('eq', '/events');
  });
  it('shows title', function () {
    cy.get('.header > h1').should('be.visible').and('have.text', 'Wydarzenia');
  });

  it('shows button', function () {
    cy.get('#add-event-container button').should('be.visible').and('have.text', 'Dodaj wydarzenie');
  });

  it('shows event', function () {
    cy.get('.cards-container a').should('be.visible').and('have.length', 1);
  });

  it('redirects to event', function () {
    const card = cy.get('.cards-container a');
    card.click();
    cy.location('pathname').should('contain', '/event/');
  });

  it('redirects on button click', function () {
    cy.location('pathname').should('eq', '/events');
    cy.get('#add-event-container button').click();
    cy.location('pathname').should('eq', '/add-event');
  });
});
