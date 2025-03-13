https://github.com/fullstackclubeducacao/fullstackweek-donalds

https://www.figma.com/design/i77rEtLPNV1vksk94wJCFv/FSW-Donald%E2%80%99s---Live


Aula 1: Boas vindas e apresentação do evento | Full Stack Week
https://www.youtube.com/watch?v=pTuQFHvtwx8

Aula 2: Setup do Projeto | Full Stack Week
https://www.youtube.com/watch?v=BMTj4dk1Zlk&t=3976s

Aula 3: Tela do restaurante | Full Stack Week
https://www.youtube.com/watch?v=EEvF4GfZE6o&t=4s

Aula 4: Tela do produto | Full Stack Week
https://www.youtube.com/watch?v=4A0iu6-1Pmo

Aula 5: Carrinho de Compras e Deploy do Projeto
https://www.youtube.com/watch?v=W6s2BQAA9FA

Aula 6: Sorteio + Certificado + Tira dúvidas | Full Stack Week
https://www.youtube.com/watch?v=o6ziU63mDyw



`npx create-next-app@latest . --empty`


## Prisma

`npm i prisma`

`npx prisma init`

`npx prisma migrate dev`

`npm i -D ts-node`

// add to package.json
```json
"prisma":{
    "seed": "ts-node ./prisma/seed.ts"
  }
```

`npx prisma db seed`


## Shadcn

`npx shadcn@latest init`

`npx shadcn@latest add button`

`npx shadcn@latest add card`

`npx shadcn@latest add scroll-area`

`npx shadcn@latest add sheet`

`npx shadcn@latest add drawer`

`npx shadcn@latest add form`

`npx shadcn@latest add input`

`npx shadcn@latest add sonner`


## ESlint

`npm i -D eslint-plugin-simple-import-sort`
// add to eslint.config.mjs
```json
{
    "plugins": {
      "simple-import-sort": simpleImportSort,
    },
    "rules": {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
```

`npm i -D prettier-plugin-tailwindcss`
// add to .prettierrc.json
```json
{
  "plugin": ["prettier-plugin-tailwindcss"]
}
```

`npm install --save-dev --save-exact prettier`



## Form

`npm i react-number-format`