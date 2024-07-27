# Api Whatsapp


### Dependencias
- docker
- docker compose
- node > 18



### Variaveis de ambiente 
TOKEN_SECRET="mopopooppopop"

TOKEN_EXPIRATION="7d"

### Dependencias
- docker
- docker compose
- node > 18

### instalar node modules

```bash
npm install 

yarn
```

### iniciar prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed


yarn prisma generate
yarn prisma migrate dev --name init
yarn prisma seed
```

### Iniciar projeto
```bash
npm run dev

yarn dev
```