# sales-control
Sales Control API
Esta é uma API RESTful para controle de vendas e gerenciamento de produtos e clientes.

Tecnologias Utilizadas: 

Node.js
TypeScript
Express
Sequelize
Mysql
Autenticação e autorização com JWT

Instalação:
Clone este repositório para o seu ambiente de desenvolvimento local.
Execute npm install para instalar todas as dependências.
Crie um arquivo .env na raiz do projeto com as seguintes informações:

PORT=3000

Execute npm start para iniciar o servidor.

Endpoints
A API possui os seguintes endpoints:

GET /
Retorna um objeto json com a string: Página home.

GET /products
Retorna a quantidade de produtos cadastrados do cliente que está logado.

GET /logout
Retorna um objeto json com a string: Você saiu!

GET /productSold
Retorna um objeto json com a string dos produtos vendidos do usuário logado.

POST /signup
Verifica de existe algum usuário cadastrado com o email informado, se sim, retorna um objeto json com o email do usuário.
Se não existir um usuário cadastrado com o email fornecido retornará um objeto json com a string: Usuário criado com sucesso e o email cadastrado.



Contribuindo
Contribuições são bem-vindas! Por favor, abra uma issue ou envie um pull request com suas sugestões e melhorias.

Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter detalhes.





