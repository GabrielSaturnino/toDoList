# Gestão de tarefas
Aplicação de desenvolvimento e estudo com **React, TypeScript, Meteor e Material UI**, voltada ao cadastro e acompanhamento de tarefas.

## Funcionalidades
- Cadastro de tarefas com título, descrição e tipo.
- Listagem e visualização dos detalhes.
- Edição de título e descrição.
- Alternância do estado de conclusão.
- Exclusão de tarefas.
- Integração da interface com a camada de dados do Meteor.

Os componentes incluem verificações de autoria para algumas ações. Isso descreve a implementação existente e não substitui uma revisão completa das permissões no servidor.

## Tecnologias
| Camada | Tecnologias |
| --- | --- |
| Interface | React 18, TypeScript, Material UI 5 e Emotion |
| Navegação | React Router |
| Aplicação e dados | Meteor e MongoDB |
| Ferramentas presentes | Prettier, Mocha e Cypress |

## Executar localmente
O projeto registra **Meteor 2.10.0** em `.meteor/release`. Utilize um ambiente compatível com essa versão; o Meteor gerencia seu próprio runtime Node.js.

```bash
git clone https://github.com/GabrielSaturnino/toDoList.git
cd toDoList
meteor npm install
meteor npm start
```

Acesse a URL informada no terminal, normalmente `http://localhost:3000`. Se houver configurações adicionais de serviços externos, revise-as antes de ativar essas integrações.

## Organização
```text
imports/modules/toDos/       Módulo de tarefas: API, schema, rotas e telas
imports/ui/components/      Componentes da interface
imports/userprofile/        Perfil de usuário
imports/seguranca/          Recursos de controle de acesso da base
client/                     Entrada do cliente
server/                     Entrada do servidor
```

## Comandos disponíveis
```bash
meteor npm test                 # Runner Mocha configurado no projeto
meteor npm run cypress:gui      # Interface do Cypress
meteor npm run cypress:headless # Execução headless do Cypress
```

A presença dos comandos não garante cobertura nem aprovação dos testes. A aplicação e os testes não foram executados na revisão desta documentação.

## Origem e créditos
Este projeto utiliza o boilerplate [MeteorReactBaseMUI, da Synergia Labs](https://github.com/synergia-labs/MeteorReactBaseMUI). Os componentes de infraestrutura e a arquitetura fornecidos pela base não são apresentados como criação integral deste repositório.

O módulo de tarefas pode ser consultado em [imports/modules/toDos](imports/modules/toDos) e no componente [TaskCard](imports/ui/components/TaskCard/TaskCard.tsx).
