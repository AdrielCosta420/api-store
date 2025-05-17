# Backend de Vendas - API com Node.js, Fastify, Prisma e MongoDB

Este repositório contém o backend da aplicação de análise de dados e gestão de vendas, desenvolvido com foco em desempenho e escalabilidade. Ele fornece endpoints para manipulação de produtos, vendas, clientes e autenticação, consumidos posteriormente pelo agente Python e pelo frontend Flutter.

---

## Tecnologias Utilizadas

- **Node.js** — runtime JavaScript para o servidor  
- **Fastify** — framework web leve e de alta performance  
- **Prisma** — ORM para modelagem e interação com banco de dados  
- **MongoDB** — banco de dados NoSQL para armazenamento dos dados  
- **JWT** — autenticação baseada em token  

---

## Funcionalidades

- CRUD completo para produtos, vendas, clientes e usuários  
- Autenticação e autorização via JWT  
- Validação e tratamento de erros robustos  
- Integração direta com o agente Python para análise e resposta  
- Logs e monitoramento básico via Fastify plugins  

---

## Estrutura do Projeto

- `/src` — código fonte principal  
  - `/controllers` — lógica dos endpoints  
  - `/models` — definição dos esquemas com Prisma  
  - `/routes` — definição das rotas Fastify  
  - `/services` — serviços auxiliares e integrações  
  - `/middlewares` — autenticação e validações  
- `.env` — variáveis de ambiente (não versionado)  
- `prisma/schema.prisma` — esquema do banco de dados  

---

## Integração com o agente Python

O backend expõe endpoints REST que fornecem dados atualizados de vendas, produtos e clientes. O agente Python consome essas APIs para gerar análises, recomendações e interpretações contextuais em linguagem natural, criando uma experiência inteligente para o usuário final.

---

## Próximos passos

- Implementar documentação interativa com Swagger ou similar  
- Adicionar testes unitários e de integração  
- Automatizar deploy com CI/CD  


