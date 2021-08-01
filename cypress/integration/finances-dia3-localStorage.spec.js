/// <reference types="cypress" />
import { format, prepareLocalStorage } from '../support/utils'

context('Dev Finances Agilizei', () => {

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app', {
        onBeforeLoad: (win) => {         //essa opção fornece uma massa de testes. A função prepareLocalStorage passa um JSON para a tela (win)
            prepareLocalStorage(win)
        }
        });
    });

    it('Cadastrar entrada', () => {

        cy.get('#data-table > tbody > tr').should('have.length',2)
        
    });

    it('Cadastrar saída', () => {

        cy.get('#data-table > tbody > tr').should('have.length',2)
        
    });

    it('Remover entradas e saídas', () => {

        const entrada = 'Mesada'
        const saida = 'Suco Kapo'

        //estratégia 1: voltar para o elemento pai e avançar para um td img + atributo
        cy.get('td.description')
            .contains(entrada)
            .parent()
            .find('img[onclick*=remove]')
            .click()

        //estratégia 2: buscar todos os irmãos e buscar todos os que tem img + atributo]
        cy.get('td.description')
        .contains(saida)
        .siblings()
        .children('img[onclick*=remove]')
        .click()


        cy.get('#data-table > tbody > tr').should('have.length',0)
        
    });

    it('Validar saldo com diversas transações', () => {

        let incomes = 0
        let expenses = 0

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