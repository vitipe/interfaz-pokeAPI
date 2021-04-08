/// <reference types="Cypress" />

//Me parece que lo que es pruebas de los llamados a la API y eso lo explica después Fabricios 
//Creo que se utiliza cy.intercept o cy.request

describe('Probando la carga del home', () => {
    
    it('Entra a la página', () => {
        cy.visit('http://127.0.0.1:8080')
    })

    it('Chequea que carguen las imágenes', () => {
        cy.get('img').eq(0).should('have.attr', 'src', 'images/1.png')
        cy.get('img').eq(19).should('have.attr', 'src', 'images/20.png')
    })

    it('Chequea que carguen los nombres de los pokemones', () => {
        cy.get('.card-title').eq(0).should('have.text', 'Bulbasaur')
        cy.get('.card-title').eq(19).should('have.text', 'Raticate')
    })

    it('Chequea que en el botón detalles esté el enlace al pokemon correspondiente', () => {
        cy.get('a').eq(0).should('have.attr', 'target', 'https://pokeapi.co/api/v2/pokemon/1/')
        cy.get('a').eq(19).should('have.attr', 'target', 'https://pokeapi.co/api/v2/pokemon/20/')
    })
})

describe('Chequea que se muestren los detalles', () => {
    it('Clickea en el botón detalles', () => {
        cy.get('a').eq(0).click()
    })

    it('Chequea que el popover aparezca', () => {
        cy.get('.popover')
    })

    it('Chequea que haya cargado toda la data de ese pokemon en el popover', () => {
        cy.get('.popover').contains('Bulbasaur')
        cy.get('.popover').contains('ID: #1')
        cy.get('.popover').contains('Peso: 6.9 kgs')
        cy.get('.popover').contains('Altura: 0.7 m.')
        cy.get('.popover').contains('Tipo: Grass + poison')
        cy.get('.popover').contains('HP: 45')
        cy.get('.popover').contains('Ataque: 49')
        cy.get('.popover').contains('Defensa: 49')
        cy.get('.popover').contains('Ataque especial: 65')
        cy.get('.popover').contains('Defensa especial: 65')
        cy.get('.popover').contains('Velocidad: 45')
    })

    it('Prueba eso mismo pero con el último pokemon', () => {
        cy.get('a').eq(19).click()
        cy.get('.popover')
        cy.wait(100)
        cy.get('.popover').contains('Raticate')
        cy.get('.popover').contains('ID: #20')
        cy.get('.popover').contains('Peso: 18.5 kgs')
        cy.get('.popover').contains('Altura: 0.7 m.')
        cy.get('.popover').contains('Tipo: Normal')
        cy.get('.popover').contains('HP: 55')
        cy.get('.popover').contains('Ataque: 81')
        cy.get('.popover').contains('Defensa: 60')
        cy.get('.popover').contains('Ataque especial: 50')
        cy.get('.popover').contains('Defensa especial: 70')
        cy.get('.popover').contains('Velocidad: 97')
    })

    it('Chequea que al hacer click afuera del popover este desaparezca', () => {
        cy.get('span').click()
        cy.wait(500) //Esto es un anti-patrón y no se recomienda, en realidad tendría que esperar los elementos y no tiempos arbitrarios
        cy.get('.popover').should('not.exist')
    })
})

describe('Chequea que el paginador funcione', () => {
    it('Hace click en boton siguiente', () => {
        cy.get('#boton-next').click()
    })

    it('Chequea que hayan cambiado las imágenes', () => {
        cy.get('img').eq(0).should('have.attr', 'src', 'images/21.png')
        cy.get('img').eq(19).should('have.attr', 'src', 'images/40.png')
    })

    it('Chequea que hayan cambiado los nombres de los pokemones', () => {
        cy.get('.card-title').eq(0).should('have.text', 'Spearow')
        cy.get('.card-title').eq(19).should('have.text', 'Wigglytuff')
    })

    it('Chequea que en el botón detalles esté el enlace al pokemon correspondiente', () => {
        cy.get('a').eq(0).should('have.attr', 'target', 'https://pokeapi.co/api/v2/pokemon/21/')
        cy.get('a').eq(19).should('have.attr', 'target', 'https://pokeapi.co/api/v2/pokemon/40/')
    })

    it('Chequea que el popover actualice el ID', () => {
        cy.get('a').eq(0).click()
        cy.get('.popover')
        cy.wait(100)
        cy.get('.popover').contains('Spearow')
        cy.get('.popover').contains('ID: #21')
    })

    it('Apreta atrás y vuelve al inicio', () => {
        cy.get('#boton-previous').click()
    })

    it('Chequea que los pokemones sean los mismos que al principio', () => {
        cy.get('img').eq(0).should('have.attr', 'src', 'images/1.png')
        cy.get('img').eq(19).should('have.attr', 'src', 'images/20.png')
        cy.get('.card-title').eq(0).should('have.text', 'Bulbasaur')
        cy.get('.card-title').eq(19).should('have.text', 'Raticate')
        cy.get('a').eq(0).should('have.attr', 'target', 'https://pokeapi.co/api/v2/pokemon/1/')
        cy.get('a').eq(19).should('have.attr', 'target', 'https://pokeapi.co/api/v2/pokemon/20/')
    })

    it('Chequea que al apretar inicio desde dos páginas adelante vuelve al principio', () => {
        cy.get('#boton-next').click()
        cy.get('#boton-next').click()
        cy.get('#boton-inicio').click()
    })

    it('Chequea que de nuevo sean los pokemones del principio', () => {
        cy.get('img').eq(0).should('have.attr', 'src', 'images/1.png')
        cy.get('img').eq(19).should('have.attr', 'src', 'images/20.png')
        cy.get('.card-title').eq(0).should('have.text', 'Bulbasaur')
        cy.get('.card-title').eq(19).should('have.text', 'Raticate')
        cy.get('a').eq(0).should('have.attr', 'target', 'https://pokeapi.co/api/v2/pokemon/1/')
        cy.get('a').eq(19).should('have.attr', 'target', 'https://pokeapi.co/api/v2/pokemon/20/')
    })
})