/// <reference types="cypress" />
import { format } from '../support/utils'

context('Dev Finances Agilizei', () => {

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app');
        cy.get('#data-table > tbody > tr').should('have.length',0)
    });

    it.only('Validar saldo com diversas transações', () => {

        const entrada = 'Mesada'
        const saida = 'Chiclete'
        let incomes = 0
        let expenses = 0

        cy.get('#transaction .button').click(); //id + classe
        cy.get('#description').type(entrada); //id
        cy.get('[name=amount]').type(12);; //atributos
        cy.get('[type=date]').type('2021-07-29'); //atributos
        cy.get('button').contains('Salvar').click(); //tipo e valor

        cy.get('#transaction .button').click(); //id + classe
        cy.get('#description').type(saida); //id
        cy.get('[name=amount]').type(-0.50);; //atributos
        cy.get('[type=date]').type('2021-07-29'); //atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        cy.get('#data-table tbody tr')
        .each(($el, index, $list) => {
            //cy.log(index)
            cy.log(index)
            cy.get($el).find('td.income, td.expense').invoke('text').then(text => {
                    if(text.includes('-')){
                        expenses = expenses + format(text)
                    } else {
                        incomes = incomes + format(text)
                    }
                    cy.log('entradas',incomes)
                    cy.log('saídas',expenses)
                })

        });

        cy.get('#totalDisplay').invoke('text').then (text =>{
            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses

            expect(formattedTotalDisplay).to.eq(expectedTotal)
        })
        
    });
});