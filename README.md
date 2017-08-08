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

Vamos a usar [Yarn](https://yarnpkg.com/en/) para las instalaciones de dependencias,
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

Para evitar errores a la hora de instalacion instalar:
  * npm install -g concurrently
  * npm install -g pug-cli

## Development

`git checkout dev` para pasarse al branch de Development.

## Recomendaciones de paquetes de Atom

 * Este paquete es bastante útil a la hora de resolver [conflictos](https://github.com/smashwilson/merge-conflicts) de git.
 * Este es el paquete de [TypeScript](https://github.com/TypeStrong/atom-typescript) para Atom.
 * Este paquete da soporte del lenguaje [Jade/Pug] (https://atom.io/packages/language-pug/).

## Tecnologías

### Angular CLI

Version 1.0.4

`npm install -g @angular/cli`

## Node

Usaremos la última versión de `node`, la cual es la 7.10.0 y la 4.2.0 de `npm`.  
Recomiendo usar [NVM](https://github.com/creationix/nvm#installation) para el [manejo](https://github.com/creationix/nvm#usage) de `node` y sus versiones.

## Bootstrap

Usaremos `ngx-bootstrap`, es un paquete que posee todas las características de Bootstrap, pero para Angular 2.  
Aqui esta la [documentación](http://valor-software.com/ngx-bootstrap/#/).

## Angular Material

Usaremos Angular Material junto con Bootstrap para la implementacion del UI
Aqui esta la [documentación](https://material.angular.io/).
## Pug

Usaremos Pug para agilizar el proceso de escribir HTML, Pug es una herramienta que ofrece una nueva sintaxis para escribir HTML, donde no son necesarios los tags y es por indentación, aca esta la [documentación](https://pugjs.org/api/getting-started.html).

### SCSS

Para manejar los estilos, usaremos `scss`, ya configure el proyecto para que reconociera los archivos con extensión `.scss` e inclusive a la hora
de ejecutar `ng generate component component-name` generará un archivo `.ts`, uno `.html` y uno `.scss`.



### Firebase

Comming soon.

## Estándares (Alpha)


### TypeScript

El siguiente es el ejemplo de cómo debería de estar escrito un componente, definiremos las propiedades de la clases con `public`, en caso de que el componente tenga un nombre extenso, será separado por un `-`, como por ejemplo `ticket-component`.

```TypeScript
   import { Component } from '@angular/core';

   @Component({
     selector: 'ticket',
     templateUrl: './ticket.component.html',
     styleUrls: ['./ticket.component.scss']
   })
   export class TicketComponent {
     public title: string = 'Hello World';
     public description: string = 'What up!';

     sayDescription() {
       console.log(this.description);
     }
   }
```


### SCSS

Para escribir en archivos `scss` usaremos la metodología [BEM](https://cssguidelin.es/#bem-like-naming), en este link pueden ver ejemplos y también en el componente
`ticket`. Aunque, en vez de separar con `__` los Blocks de los Elements se usará `-` y en caso de un Modifier se usará `_`.
Ejemplo:

```scss
.ticket {
 &-title {
   color: green;
   &_icon: {
     color: blue;
   }
 }
}
```
Esto hará que el elemento con clase `ticket-name` sea verde y `ticket-name_icon` sea azul. Esta metodología permite la creación de estilos de una manera más ordenada e intuitiva.

### Pug

Este es un ejemplo de código en Pug.

```pug
.ticket
  h1.ticket-title {{title}}
  p.ticket-description {{description}}
  button.btn.btn-success((click)="sayDescription()") Say Hello
```
Esto compilara en esto:

```html
<div class="ticket">
  <h1 class="ticket-title">{{title}}</h1>
  <p class="ticket-description">{{description}}</p>
  <button class="btn btn-success" (click)="sayDescription()">Say Hello</button>
</div>
```


### CSS hover

Para utilizar el hover de los botones:
  http://ianlunn.github.io/Hover/








<!-- ## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). -->

<!-- ## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`. -->

<!-- ## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md). -->
