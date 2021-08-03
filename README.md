# cypress-semana-agilizei
 
 Semana de Imersão em Cypress oferecida pelo Agilizei, ministrada por @samlucax.

 
﻿## Ferramentas e tecnologias utilizadas:

- Node v 14.16.0
- Cypress 8.0.0


﻿## Como iniciar um novo projeto:

**1** - Iniciar um novo projeto com:
```
npm init --yes
```

**2** - Instalar o cypress com:
```
npm install -D cypress
```

**3** - Após baixadas as dependências do cypress na pasta node_modules, executar o comando a seguir para verificar se o cypress pode ser executado, abrí-lo em caso positivo e criar a estrutura de pastas padrão para podermos trabalhar:
```
npx cypress open
```

﻿## Comandos úteis:

- Executar o cypres:
```
npx cypress run
```

- Executar o cypress no formato mobile:
```
npx cypress run --config viewportWidth=411,viewportHeight=823 
```



## Sobre a aplicação:


Site: https://devfinance-agilizei.netlify.app/

Visão geral: A aplicação alvo do teste é um site de finanças, para inclusão de entradas (por exemplo salário) e saídas (por exemplo gastos).

- O usuário pode realizar novos lançamentos através da opção "+ Nova Transação", onde visualiza um formulário com descrição, valor e data.

![2 - inclusao](https://user-images.githubusercontent.com/7033231/127940482-ea11a8bd-2da4-4f0a-b19b-47d610786783.png)


- O usuário visualiza uma lista de valores já inseridos

![1 - visao geral](https://user-images.githubusercontent.com/7033231/127940471-fa81c164-de29-40a0-b986-19d2f92ec5c3.png)


- O total é o cálculo de entradas e saídas


