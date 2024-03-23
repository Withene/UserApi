## **Projeto Node.js com Autenticação JWT, Nodemailer, Recuperação de Senha e Knex.js**

**Descrição**

Este projeto demonstra como criar um sistema de autenticação com tokens JWT em Node.js, utilizando o módulo `jsonwebtoken`. Também inclui funcionalidades de recuperação de senha através do módulo `nodemailer` para envio de emails. O armazenamento de dados é realizado com Knex.js e uma base de dados MySQL.

**Tecnologias**

* Node.js
* Express.js
* MySQL
* Knex.js
* JWT (jsonwebtoken)
* Nodemailer
* Bcrypt
* Dotenv

**Funcionalidades**

* Cadastro de usuários
* Autenticação com JWT
* Recuperação de senha
* Validação de dados
* Segurança com Bcrypt

**Instalação**

1. Clone o repositório:

```
git clone git@github.com:Withene/UserApi.git
```

2. Instale as dependências:

```
npm install
```

3. Crie o arquivo `.env` e configure as variáveis de ambiente:

```
# Credenciais do banco de dados MySQL
MYSQL_HOST=seu-host
MYSQL_USER=seu-usuario
MYSQL_PASSWORD=suasenha
MYSQL_DATABASE=projeto-node-jwt

# Chave secreta para JWT
JWT_SECRET=sua-chave-secreta

# Email de remetente para recuperação de senha
NODEMAILER_EMAIL=seuemail@dominio.com

# Senha do email de remetente
NODEMAILER_PASSWORD=suasenha

# URL do servidor (opcional)
SERVER_URL=http://localhost:3000
```

4. Configure o Knex.js no arquivo `database/connection.js`:

```javascript
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
});

module.exports = knex;
```

5. Inicie o servidor:

```
npm start
```

**Uso**

## Resumo das rotas fornecidas:

**Usuários:**

- **GET /user** (requer autenticação de administrador): Recupera uma lista de usuários.
- **POST /user**: Cria um novo usuário.
- **PUT /user** (requer autenticação de administrador): Edita um usuário existente.
- **GET /user/:id**: Recupera um usuário específico por ID.
- **DELETE /user/:id**: Exclui um usuário específico por ID.

**Gerenciamento de senha:**

- **POST /changepassword/:token/:uuid**: Altera a senha de um usuário.
- **POST /user/recovery**: Inicia o processo de recuperação de senha, enviando um e-mail com instruções.

**Autenticação:**

- **POST /login**: Gerencia o login do usuário e cria um token JWT para autenticação subsequente.


**Observações**

* Este é um projeto simples para fins de demonstração. É recomendável adicionar mais funcionalidades e segurança para um ambiente de produção.
* Consulte a documentação dos módulos utilizados para mais informações.

