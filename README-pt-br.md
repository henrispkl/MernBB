# MernBB

Uma plataforma de forum construída com React, Ant Design, Express, Node and MongoDB

![alt text](./splash.jpg)

## :pencil: Descrição

Usando a stack MERN, esse projeto é um bulletin board/forum onde usuários podem autenticar, criar tópicos e responder a eles em diferentes categorias divididas por subcategorias. O usuário pode autenticar usando JWT consumindo uma api com CRUDs e outras operações para categorias, subcategorias, usuários, grupos de usuários, tópicos e posts.

[Exemplo funcional](https://mernbb.herokuapp.com/)

### :pushpin: Tecnologias usadas

* React com hooks
* React Router
* Ant Design
* autenticação JWT com Passport.js
* Node
* MongoDB

### :rocket: Roadmap

* Tornar tudo responsivo
* Editar pefil de usuário
* Ver perfil de usuário
* Dashboard para administradores
* Gerenciar grupos de usuários, categorias e subcategorias no dashboard
* Editor de texto WYSIWYG
* Deletar tópicos e posts
* Adicionar arquivos de teste e prop-types
* ... e mais um monte de coisas!

## :zap: Começando

### :package: Instalando

* Clone o repositório

      git clone https://github.com/henrispkl/MernBB.git

* Navegue até a pasta e instale as dependencias

      cd MernBB/
      npm install

* Renomeie o arquivo `.env.example` para `.env`, adicione o string de conexão do MongoDB e mude a secret key da autenticação JWT.

      mv .env.example .env

* Buildar o projeto

      npm run build

### :fire: Executando

* Executando no modo de desenvolvimento

      npm run dev

* Executando em produção

      npm start

## :+1: Como Contribuir

Pra contribuir com esse projeto, sinta-se livre pra criar pull request e issues, ficarei feliz em dar uma olhada neles :)

## :page_facing_up: Licença

Este projeto está licenciado sob a Licença MIT. Eu :heart: coisas em open source!