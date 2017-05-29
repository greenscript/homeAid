# HomeAid

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

# Especificaciones de Development

## Instalación

Vamos a usar [Yarn](https://code.facebook.com/posts/1840075619545360) para las instalaciones de dependencias,
para instalarlo, usen `npm install -g yarn` o `sudo npm install -g yarn`, dependiendo de sus permisos, despues nada mas hagan `cd` al directorio de este proyecto y ejecuten el comando `yarn` para instalar las dependencias.

Yarn es similar a `npm`, pero instala las dependencias mucho mas rapido.

## Como instalar paquetes con Yarn

Para instalar paquetes con [Yarn](https://code.facebook.com/posts/1840075619545360) se hace de la siguiente manera: `yarn add node-sass --dev`.
el `add` funciona igual que el `install` de `npm` y el `--dev` igual que `--save-dev`.

## Getting Started

Hice un comando Shell que deberia de usarse cada vez que alguien no haya trabajado en el respositorio en un rato o para la primera vez que corre el proyecto,
para usarlo ejecuten el comando `sh start.sh`, este comando, borrara la carpeta `node_modules` y los `yarn.lock` y volvera a instalar las dependencias, esto
para que si alguien instalo alguna dependencia el proyecto no se quiebre cuando lo traten de correr, tambien ejecutara `npm start` para no tener que hacerlo y
abrira el browser por defecto en su maquina en la ruta `http://localhost:4200/`. En resumen, ejecuta la instalacion, `npm start` y les abre el browser.

## Development

`git checkout dev` para pasarse al branch de Development.

## Recomendaciones de paquetes de Atom

Este paquete es bastante util a la hora de resolver [conflictos](https://github.com/smashwilson/merge-conflicts) de git.
Este es el paquete de [TypeScript](https://github.com/TypeStrong/atom-typescript) para Atom.

## Tecnologías

### CSS

Para manejar los estilos, usaremos `scss`, ya configure el proyecto para que reconociera los archivos con extension .scss e inclusive a la hora
de ejecutar `ng generate component component-name` generara un archivo .ts, uno .html y uno .scss. 




<!-- ## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). -->

<!-- ## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`. -->

<!-- ## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md). -->
