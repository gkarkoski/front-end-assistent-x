# AssistentX — Frontend

SPA React para finanças pessoais, integrada ao backend Java em `FullStackAssistentx`.

## Tecnologias

- React 19 + Vite
- Tailwind CSS 4
- React Router DOM
- Fetch API

## Pré-requisitos

1. **Backend** rodando em `http://localhost:8080`
2. **Node.js** 18+ instalado

## Como Executar

```bash
cd front-end-full-stack-assistant
npm install
npm run dev
```

Acesse: http://localhost:5173

O Vite faz proxy de `/api` para `http://localhost:8080`.

## Login de teste

- **E-mail:** joao@email.com.br
- **Senha:** senha

## Rotas

| Rota | Descrição |
|------|-----------|
| `/login` | Autenticação |
| `/dashboard` | Resumo financeiro |
| `/entradas` | CRUD de entradas |
| `/saidas` | CRUD de saídas |
| `/patrimonio` | CRUD de investimentos |
| `/orcamento` | Modelos e resumo por categoria |
| `*` | Página 404 |

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
├── api/
├── components/
├── context/
├── hooks/
├── pages/
├── routes/
└── utils/
```

## Projeto relacionado

Documentação da API: `../FullStackAssistentx/README.md`
