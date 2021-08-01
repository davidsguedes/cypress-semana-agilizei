/// <reference types="cypress" />


//como rodar o programa em resolucao mobile
//cy.viewport
//arquivos de config
//configs por linha de comando = npx cypress open --config viewportWidth=411,viewportHeight=823


//como rodar o teste em modo Headless (por baixo dos panos, sem a abertura do browser)
//--> npx cypress run --config viewportWidth=411,viewportHeight=823
//é gerado um vídeo na pasta vídeos


//se quiser configurar alguns scripts para serem rodados ao chamar um comando, altero o arquivo package.json, objeto scripts
//para rodá-lo, chamo via terminal npm run cypress:run:mobile


context('Dev Finances Agilizei', () => {

    //hooks
    //trechos que executam antes ou depois de todos ou de algum teste
    //before -> antes de todos os testes
    //beforeEach -> antes de cada teste
    //after -> depois de todos os testes
    //afeterEach -> depois de cada teste

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app');
        cy.get('#data-table > tbody > tr').should('have.length',0)
    });


    it('Cadastrar entrada', () => {

        cy.get('#transaction .button').click() //id + classe
        cy.get('#description').type('Mesada') //id
        cy.get('[name=amount]').type(12) //atributos
        cy.get('[type=date]').type('2021-07-29') //atributos
        cy.get('button').contains('Salvar').click() //tipo e valor

        cy.get('#data-table > tbody > tr').should('have.length',1)
        
    });

    it('Cadastrar saída', () => {

        cy.get('#transaction .button').click(); //id + classe
        cy.get('#description').type('Chiclete'); //id
        cy.get('[name=amount]').type(-0.50); //atributos
        cy.get('[type=date]').type('2021-07-29'); //atributos
        cy.get('button').contains('Salvar').click(); //tipo e valor

        cy.get('#data-table > tbody > tr').should('have.length',1)
        
    });

    it('Remover entradas e saídas', () => {

        const entrada = 'Mesada'
        const saida = 'Chiclete'

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
});