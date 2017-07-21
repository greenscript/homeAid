import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
  providers: [AuthService, DataService]
})
export class MenuAdminComponent implements OnInit {
  public families: FirebaseListObservable<any>;
  public userdata: Array<Object> = [];
  public adminName: string;
  constructor(private as: AuthService, public auth: AngularFireAuth, public db: AngularFireDatabase, public ds: DataService) {}

  ngOnInit() {

    this.ds.admin();

    // metodo del AuthService que se encarga de reconocer si el usuario esta loggeado
    // posiblemente necesario en todos los ngInit de la mayoria o todos los componentes
    this.auth.authState.subscribe(res => {
      // se crea la varibale props, nombrada asi por propiedades y se le asigna this
      // es decir, esta clase o componente, esto por que el this no es accesible en
      // funciones adentro de funciones o varias iteraciones
      let props = this;
      // el res y res.uid, son el response de la promesa que se crea con el metodo suscribe
      // el res en este caso seria el usuario desde firebase y el res.uid, su id
      // si existen ambos significa que el usuario esta loggeado.
      // ${res.uid} esto, jala el id en modo de string, el ${valor} es un selector de es6
      // de javascript, que se llama template string, como el uid del usuario cambia, se usa este metodo
      if (res && res.uid) {
        this.families = this.db.list(`/families/${res.uid}`, {preserveSnapshot: true});
        this.families
        // forma de iterar sobre las propiedades de un objeto en firebase
        // los snapshots llamado asi por firebase, son como los datos de objeto maso menos
        // se crea una promesa mediante suscribe para acceder a los datos, como tiene que sacarlos de firebase
        // le asigno a props o this, les recuerdo que this no se hubiera podido usar adentro del forEach
        // y le hago push al array userdata los identificadores y valores de los datos.
        .subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            props.userdata.push({
              key: snapshot.key,
              value: snapshot.val()
            })
            // llama a la funcion assignProperties
            props.assignProperties(props.userdata)
          });
        })
      } else {
        console.log('user not logged in');
      }
    });
  }

  assignProperties(pData: Array<any>) {
    // recibe como parametro un array
    pData.forEach((pObject) => {
      // si existe la propiedad nombre en los datos del usuario sacados de firebase
      if (pObject.key === 'name') {
        // se le asigna el nombre a adminName
        // esto para tener el nombre o apellido de la familia y mostrarlo en la vista
        this.adminName = pObject.value
      }
    })
  }
}
