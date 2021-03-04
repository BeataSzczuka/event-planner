describe('CRA', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/add-event');
  });
  it('shows title', function () {
    cy.get('h1').should('be.visible').and('have.text', 'dodaj wydarzenie');
  });

  it('shows all fields', function () {
    cy.get('form > div > label').should('be.visible').and('include.text', 'Tytuł');
    cy.get('form > div > label').should('be.visible').and('include.text', 'Data i czas');
    cy.get('form > div > label').should('be.visible').and('include.text', 'Opis');
    cy.get('form > div > label').should('be.visible').and('include.text', 'Dodaj zdjęcie');
    cy.get('form > div > label').should('be.visible').and('include.text', 'Rodzaj wydarzenia');
    cy.get('form > div > label')
      .should('be.visible')
      .and('include.text', 'Numer telefonu kontaktowego');
    cy.get('form > div > label').should('be.visible').and('include.text', 'Adres email kontaktowy');
  });

  it('has required fields', function () {
    cy.get('button[type="submit"]').should('include.text', 'Zapisz wydarzenie').click();
    cy.get('.error').should('have.length', '8').and('include.text', 'To pole jest wymagane');
  });

  it('rejects non-numeric phone number', function () {
    cy.get('form #phoneNumber').should('be.visible').type('invalid number');
    cy.get('form #email').click();
    cy.get('.error #phoneNumber-helper-text')
      .should('be.visible')
      .and('have.text', 'Niepoprawny numer');
  });

  it('rejects too short phone number', function () {
    cy.get('form #phoneNumber').should('be.visible').type('61');
    cy.get('form #email').click();
    cy.get('.error #phoneNumber-helper-text')
      .should('be.visible')
      .and('have.text', 'Niepoprawny numer');
  });

  it('accepts valid phone number', function () {
    cy.get('form #phoneNumber').should('be.visible').type('123456789');
    cy.get('form #email').click();
    cy.get('.error #phoneNumber-helper-text').should('not.exist');
  });

  it('rejects email without at', function () {
    cy.get('form #email').should('be.visible').type('invalid');
    cy.get('form #place').click();
    cy.get('.error #email-helper-text')
      .should('be.visible')
      .and('have.text', 'Niepoprawny adres email');
  });

  it('rejects invalid email', function () {
    cy.get('form #email').should('be.visible').type('invalid@');
    cy.get('form #place').click();
    cy.get('.error #email-helper-text')
      .should('be.visible')
      .and('have.text', 'Niepoprawny adres email');
  });

  it('accepts valid email', function () {
    cy.get('form #email').should('be.visible').type('valid@valid.com');
    cy.get('form #place').click();
    cy.get('.error #email-helper-text').should('not.exist');
  });

  it('clears errors', function () {
    cy.get('form #email').should('be.visible').type('invalid@email');
    cy.get('form #title').click();
    cy.get('.error').should('exist');

    cy.get('button.MuiButton-containedSecondary').click();

    cy.get('.error').should('not.exist');
  });

  it('clears all fields', function () {
    cy.get('form #title').should('be.visible').type('test');
    cy.get('form #email').should('be.visible').type('invalid@email');

    cy.get('button[type="submit"]').should('include.text', 'Zapisz wydarzenie').click();
    cy.get('button.MuiButton-containedSecondary').click();

    cy.get('form #title').should('have.value', '');
  });
});
