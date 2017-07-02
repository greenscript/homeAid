import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class RegisterService {

  constructor(
    private afAuth: AngularFireAuth) {

    }


}
