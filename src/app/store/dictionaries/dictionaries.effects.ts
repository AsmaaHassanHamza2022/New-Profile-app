import { Injectable } from "@angular/core";
import {Effect, ofType ,Actions } from "@ngrx/effects";

import * as DictinaliesActions from './dictionaries.actions' ;
import {  AngularFirestore, DocumentChangeAction } from "@angular/fire/compat/firestore";
import { Observable, catchError, map, of, switchMap, take, zip } from "rxjs";
import { ControlItem, Item } from "src/app/models/frontend";
import { Dictionaries, Dictionary } from "./dictionaries.model";
import * as jsonCountries from '../../../assets/countries.json';


const documentToItem = (x: DocumentChangeAction<any>): Item => {
    const data = x.payload.doc.data();
    return {
        id: x.payload.doc.id,
        ...data
    };
};

const itemToControlItem = (x: Item): ControlItem => ({
    value: x.id,
    label: x.name,
    icon: x.icon
});

const addDictionary = (items: Item[]): Dictionary => ({
    items,
    controlItems: [...items].map(x => itemToControlItem(x))
});

@Injectable()
export class DictionariesEffects {

    constructor(
        private actions: Actions,
        private afs: AngularFirestore
    ) { }

    @Effect()
    read: Observable<any> = this.actions.pipe(
        ofType(DictinaliesActions.Read),
        switchMap(() => {
            return zip(
                this.afs.collection('roles').snapshotChanges().pipe(
                    take(1),
                    map(items => items.map(x => documentToItem(x)))
                ),
                this.afs.collection('specializations').snapshotChanges().pipe(
                    take(1),
                    map(items => items.map(x => documentToItem(x)))
                ),
                this.afs.collection('qualifications').snapshotChanges().pipe(
                    take(1),
                    map(items => items.map(x => documentToItem(x)))
                ),
                this.afs.collection('skills').snapshotChanges().pipe(
                    take(1),
                    map(items => items.map(x => documentToItem(x)))
                ),
                of((jsonCountries as any).default.map((country:any)=> ({
                    id: country.code.toUpperCase(),
                    name: country.name,
                    icon: {
                        src: null,
                        cssClass: 'fflag fflag-' + country.code.toUpperCase()
                    }
                })
                )
                )
            ).pipe(
                map(([roles, specializations, qualifications, skills]) => {

                    const dictionaries: Dictionaries = {
                        roles: addDictionary(roles),
                        specializations: addDictionary(specializations),
                        qualifications: addDictionary(qualifications),
                        skills: addDictionary(skills),
                        countries:addDictionary(skills)
                    };

                    return  DictinaliesActions.Read_Success({dictinaries:dictionaries});
                }),
                catchError(err => of( DictinaliesActions.Read_Error(err.message)))
            );
        })
    );
}