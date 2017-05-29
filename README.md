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
para instalarlo, usen `npm install -g yarn` o `sudo npm install -g yarn`, dependiendo de sus permisos, después nada más hagan `cd` al directorio de este proyecto y ejecute el comando `yarn` para instalar las dependencias.

Yarn es similar a `npm`, pero instala las dependencias mucho más rápido.
Antes de ejecutar `yarn` para instalar las dependencias, lean la sección de Getting Started.

## Como instalar paquetes con Yarn

Para instalar paquetes con [Yarn](https://code.facebook.com/posts/1840075619545360) se hace de la siguiente manera: `yarn add node-sass --dev`.
el `add` funciona igual que el `install` de `npm` y el `--dev` igual que `--save-dev`, en el ejemplo anterior el paquete `node-sass` hace referencia a cualquier paquete que tambien este para `npm`, en raros casos, puede que el paquete no se encuentre disponible para Yarn, en ese caso se podría instalar de la manera regular, con `npm`.

## Getting Started

Hice un comando [Shell](https://en.wikipedia.org/wiki/Shell_%28computing%29) que debería de usarse cada vez que alguien no haya trabajado en el repositorio en un rato o para la primera vez que corre el proyecto,
para usarlo ejecuten el comando `sh start.sh` en el directorio de este proyecto, este comando, borrara la carpeta `node_modules` y los `yarn.lock` y volverá a instalar las dependencias, esto por si alguien instalo alguna dependencia en el proyecto y cuando alguien más lo ejecute no se quiebre por la falta de esa dependencia, también ejecutará `npm start` para no tener que hacerlo y
abre el browser por defecto en su máquina en la ruta `http://localhost:4200/`. En resumen, ejecuta la instalación, les abre el browser y ejecuta `npm start`.
Una vez que haya terminado de compilar con `npm start` el browser se refrescara.

## Development

`git checkout dev` para pasarse al branch de Development.

## Recomendaciones de paquetes de Atom

Este paquete es bastante útil a la hora de resolver [conflictos](https://github.com/smashwilson/merge-conflicts) de git.
Este es el paquete de [TypeScript](https://github.com/TypeStrong/atom-typescript) para Atom.

## Tecnologías

### CSS

Para manejar los estilos, usaremos `scss`, ya configure el proyecto para que reconociera los archivos con extensión `.scss` e inclusive a la hora
de ejecutar `ng generate component component-name` generará un archivo `.ts`, uno `.html` y uno `.scss`.




<!-- ## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). -->

<!-- ## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`. -->

<!-- ## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md). -->
