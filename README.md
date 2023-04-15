# sales-control
Sales Control API
Esta é uma API para controle de vendas e gerenciamento de produtos e clientes.

Tecnologias Utilizadas
Node.js
Express
Mysql
Autenticação e autorização com JWT

Instalação
Clone este repositório para o seu ambiente de desenvolvimento local.
Execute npm install para instalar todas as dependências.
Crie um arquivo .env na raiz do projeto com as seguintes informações:

PORT=3000

Execute npm start para iniciar o servidor.

Endpoints
A API possui os seguintes endpoints:

GET /home
Retorna um json com a string: Página home.

GET /produtos/:id
Retorna um produto específico com base no ID fornecido.

POST /produtos
Cria um novo produto.

PUT /produtos/:id
Atualiza um produto existente com base no ID fornecido.

DELETE /produtos/:id
Exclui um produto específico com base no ID fornecido.


POST /clientes
Cria um novo cliente.


DELETE /clientes/:id
Exclui um cliente específico com base no ID fornecido.


Contribuindo
Contribuições são bem-vindas! Por favor, abra uma issue ou envie um pull request com suas sugestões e melhorias.

Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter detalhes.





