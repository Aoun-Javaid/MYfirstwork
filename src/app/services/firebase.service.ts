
import { NgZone } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '../../environments/environment';


export function AngularFirestoreCricket(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfigCricket, 'firebaseProjectCricket', false, null, platformId, zone, null, '', '');
}
export function AngularFirestoreSoccer(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfigSoccer, 'firebaseProjectSoccer', false, null, platformId, zone, null, '', '');
}
export function AngularFirestoreTennis(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfigTennis, 'firebaseProjectTennis', false, null, platformId, zone, null, '', '');
}
export function AngularFirestoreOther(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfigOther, 'firebaseProjectOther', false, null, platformId, zone, null, '', '');
}
export function AngularFirestoreBinary(platformId: Object, zone: NgZone) {
  return new AngularFirestore(environment.firebaseConfigBinary, 'firebaseProjectBinary', false, null, platformId, zone, null, '', '');
}

