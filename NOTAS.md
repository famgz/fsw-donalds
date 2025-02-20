https://github.com/fullstackclubeducacao/fullstackweek-donalds

https://www.figma.com/design/i77rEtLPNV1vksk94wJCFv/FSW-Donald%E2%80%99s---Live



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