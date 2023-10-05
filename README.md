# todo-list

## Iniciando

Para poder ejecutar este proyecto, es necesario contar con un servidor de **Redis**. Para lograrlo, procederemos a la ejecución del servidor.

```sh
#/bin/sh

docker-compose -f ./core.yaml -p todo-infra up -d

```

Después de haber configurado nuestro servidor Redis, procederemos a iniciar los componentes necesarios para la ejecución de este proyecto. Para lograrlo, procederemos a la ejecución del siguiente comando.

```sh
#/bin/sh

npx nx run-many --target=serve --all

```

Por separado

BACKEND:

```sh
#/bin/sh

npx nx run backend:serve

```

FRONTEND:

```sh
#/bin/sh

npx nx run frontend:serve

```

compilar todo

```sh
#/bin/sh
npx nx run-many --target=build --all

```
