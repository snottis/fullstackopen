

describe('Blog app', function() {
    beforeEach(function() {
      cy.clearLocalStorage();
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      cy.visit('http://localhost:3000');
    });
  
    it('Login form is shown', function() {
      cy.contains('username');
      cy.contains('password');
    });

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('test');
            cy.get('#password').type('sala');
            cy.get('#logIn').click();
            cy.contains('Logged in');
        });

        it('fails with invalid credentials', function () {
            cy.get('#username').type('wrong');
            cy.get('#password').type('sala');
            cy.get('#logIn').click();
            cy.contains('Error logging in');
        });
    });

    describe('when logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('test');
            cy.get('#password').type('sala');
            cy.get('#logIn').click();
        });

        it('user can create new blog', function () {
            cy.contains('new blog').click();
            cy.get('#author').type('Blogin Kirjoittaja');
            cy.get('#title').type('Title of my newest blog');
            cy.get('#url').type('www.localhost.it');
            cy.get('#create').click();
            cy.get('.blogDefaults').contains('Title of my newest blog');
        });

        it('blog can be liked', function () {
            cy.contains('new blog').click();
            cy.get('#author').type('Blogin Kirjoittaja');
            cy.get('#title').type('Title of my newest blog');
            cy.get('#url').type('www.localhost.it');
            cy.get('#create').click();
            cy.contains('view').click();
            cy.get('.likeButton').click();
            cy.contains('likes 1');
        });

        it('blog can be removed by creator', function() {
            cy.contains('new blog').click();
            cy.get('#author').type('Blogin Kirjoittaja');
            cy.get('#title').type('Title of my newest blog');
            cy.get('#url').type('www.localhost.it');
            cy.get('#create').click();
            cy.contains('view').click();
            cy.contains('remove').click();
            cy.contains('Removed Title of my newest blog');
        });

        it('sorts blogs correctly', function() {
            cy.contains('new blog').click();
            cy.get('#author').type('Blogin Kirjoittaja');
            cy.get('#title').type('Title of my newest blog');
            cy.get('#url').type('www.localhost.it');
            cy.get('#create').click();
            cy.contains('new blog').click();
            cy.get('#author').type('Toinen Kirjuri');
            cy.get('#title').type('The secondary blog');
            cy.get('#url').type('intranet.fi');
            cy.get('#create').click();
            cy.wait(200);
            cy.get('.blogOutest').contains('Title of my newest blog').parent().within( () => { 
                cy.get('.viewButton').click();
                cy.get('.likeButton').click();
            });

            cy.get('.blogDefaults').contains('Title of my newest blog').parent().contains('likes 1');
            cy.get('.blogOutest:first').contains('Title of my newest blog');

            cy.get('.blogOutest').contains('The secondary').parent().within( () => { 
                cy.get('.viewButton').click();
                cy.get('.likeButton').click();
                cy.get('.likeButton').click();
            });

            cy.wait(200);

            cy.get('.blogOutest:first').contains('The secondary blog').parent().contains('likes 2');

        });
    });
  });
  