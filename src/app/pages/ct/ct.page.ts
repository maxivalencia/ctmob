import { CtService, SearchType } from './../../services/ct.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { key } from 'localforage';

@Component({
  selector: 'app-ct',
  templateUrl: './ct.page.html',
  styleUrls: ['./ct.page.scss'],
})
/* @Injectable({
  providedIn: 'root'
}) */
export class CtPage implements OnInit {
 
  results: Observable<any>;
/*   resultat: Array<any> = [
    {
      'id': "0",
      'title': "Information",
      'description': 'Détails',
    }
  ];*/
  searchTerm: string = '';
  type: SearchType = SearchType.all;
  url: string = '';
  url1: string = '';
  url2: string = '';
  theTodo : any;
  resultat : Array<string>  = new Array<string>();
  adresse: string = "";

  constructor(private ctService: CtService, private http: HttpClient, private storage: Storage) {
    //this.datacharge();
    //this.storage.set('erreur' , "oui");
  }

  ngOnInit() {
    //this.datacharge();
  }

  ionViewWillEnter(){
    //this.datacharge();   
  }

  reload() {
    /* this.http.get(this.url).subscribe(data => {
      this.storage.set('recherche' , this.searchTerm);
    }); */
    window.location.reload();
    /* this.storage.get('Immatriculation').then((val) => {
      this.searchTerm = val;
    }); */
    //this.datacharge();
  }
 
  public async searchChanged() {
    this.storage.set('erreur' , "oui");
    this.adresse = "";
    //this.remiseZero();
    this.datacharge("154.126.79.185");
    /* this.storage.get('erreur').then((val) => {
      this.adresse = val;
      //console.log(this.adresse);
    });
    //console.log(this.adresse);
    if(this.adresse == "oui"){
     // console.log("tonga eto");
    //this.remiseZero();
      this.datacharge("192.168.88.254");
      this.storage.get('erreur').then((val) => {
        this.adresse = val;
      });
      if(this.adresse == "oui"){
        this.remiseZero();
        this.storage.set('Immatriculation_nom' , "Numéro Immatriculation introuvable");
        this.storage.set('Immatriculation' , "n'exist pas encore dans la base");
      }
    } */
    //this.storage.remove('erreur');
    //console.log("tonga eto");
    //this.reload(); 
  }
  searchData(searchTerm: string) {
    throw new Error("Method not implemented.");
  }
 
  getData(lien) {
    return this.http.get(lien);
  }

  // fonction inutile mais seulement pour onchange
  prm(){
    // seule utilisation : garder la fonction onchange de l'input car l'application bug sans cette fonction
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  datacharge(adresse){
    this.remiseZero();
    this.resultat = [];      
    this.storage.set('erreur' , "192.168.88.254");
    this.http.get('http://154.126.79.185:2053/index.php/controles_techniques/one_visite/?IMM=' + this.searchTerm).subscribe(data => {
      if (data){
        this.storage.set('erreur' , "154.126.79.185");
      } else {
        this.storage.set('erreur' , "192.168.88.254");
      }
    });
    this.storage.get('erreur').then((val) => {
      this.url = 'http://' + val + ':2053/index.php/controles_techniques/one_visite/?IMM=' + this.searchTerm;
    });
    this.http.get(this.url).subscribe(data => {
      if (data[0]["cg_immatriculation"] != ""){
        this.remiseZero();
        this.storage.set('Immatriculation_nom' , "Numéro Immatriculation :");
        this.storage.set('Immatriculation' , data[0]["cg_immatriculation"]);
        this.storage.set('Proprietaire_nom' , "Nom propriétaire :");
        this.storage.set('Proprietaire' , data[0]["cg_nom"]+' '+data[0]["cg_prenom"]);
        this.storage.set('Profession_nom' , "Profession :");
        this.storage.set('Profession' , data[0]["cg_profession"]);
        this.storage.set('Adresse_nom' , "Adresse :");
        this.storage.set('Adresse' , data[0]["cg_adresse"]+' '+data[0]["cg_commune"]);
        this.storage.set('MiseService_nom' , "Mise en service :");
        this.storage.set('MiseService' , data[0]["cg_mise_en_service"]);
        this.storage.set('CarteViolette_nom' , "Carte violette :");
        this.storage.set('CarteViolette' , data[0]["cg_num_carte_violette"]+' '+data[0]["cg_date_carte_violette"]);
        this.storage.set('Vignette_nom' , "Vignette :");
        this.storage.set('Vignette' , data[0]["cg_num_vignette"]+' '+data[0]["cg_date_vignette"]);
        this.storage.set('NbPlaceAssise_nom' , "Nombre de place :");
        this.storage.set('NbPlaceAssise' , data[0]["cg_nbr_assis"]);
        this.storage.set('NbDebout_nom' , "Débout :");
        this.storage.set('NbDebout' , data[0]["cg_nbr_debout"]);
        this.storage.set('Cooperative_nom' , "Coopérative :");
        this.storage.set('Cooperative' , data[0]["cg_nom_cooperative"]);
        this.storage.set('Patente_nom' , "Patence :");
        this.storage.set('Patente' , data[0]["cg_patente"]);
        this.storage.set('Puissance_nom' , "Puissance :");
        this.storage.set('Puissance' , data[0]["cg_puissance_admin"]);
        this.storage.set('Carosserie_nom' , "Carosserie :");
        this.storage.set('Carosserie' , data[0]["crs_libelle"]);
        this.storage.set('Marque_nom' , "Marque :");
        this.storage.set('Marque' , data[0]["mrq_libelle"]);
        this.storage.set('Type_nom' , "Type :");
        this.storage.set('Type' , data[0]["vhc_type"]);
        this.storage.set('Energie_nom' , "Energie :");
        this.storage.set('Energie' , data[0]["sre_libelle"]);
        this.storage.set('Moteur_nom' , "Moteur :");
        this.storage.set('Moteur' , data[0]["vhc_num_moteur"]);
        this.storage.set('NumeroSerie_nom' , "Numéro de série :");
        this.storage.set('NumeroSerie' , data[0]["vhc_num_serie"]);
        this.storage.set('Usage_nom' , "Usage :");
        this.storage.set('Usage' , data[0]["usg_libelle"]);
        this.storage.set('ChargeUtile_nom' , "Charge utile :");
        this.storage.set('ChargeUtile' , data[0]["vhc_charge_utile"]);
        this.storage.set('PoidsTotalCharge_nom' , "Poids total à charge :");
        this.storage.set('PoidsTotalCharge' , data[0]["vhc_poids_total_charge"]);
        this.storage.set('PoidsVide_nom' , "Poids à vide :");
        this.storage.set('PoidsVide' , data[0]["vhc_poids_vide"]);
        this.storage.set('Centre_nom' , "Centre :");
        this.storage.set('Centre' , data[0]["ctr_nom"]);
        this.storage.set('Province_nom' , "Province :");
        this.storage.set('Province' , data[0]["prv_nom"]);
        this.storage.set('Verificateur_nom' , "Vérificateur :");
        this.storage.set('Verificateur' , data[0]["nom_verificateur"]);
        this.storage.set('Secretaire_nom' , "Secrétaire :");
        this.storage.set('Secretaire' , data[0]["usr_name"]);
        this.storage.set('NumPV_nom' , "Numéro PV :");
        this.storage.set('NumPV' , data[0]["vst_num_pv"]);
        this.storage.set('DateVisite_nom' , "Date de visite :");
        this.storage.set('DateVisite' , data[0]["vst_created"]);
        this.storage.set('Expiration_nom' , "Expiration :");
        this.storage.set('Expiration' , data[0]["vst_date_expiration"]);
        this.storage.set('Aptitude_nom' , "Aptitude :");
        this.storage.set('Aptitude' , data[0]["vst_is_apte"]);
        this.storage.set('Contre_nom' , "Type de visite :");
        this.storage.set('Contre' , data[0]["vst_is_contre_visite"]);
      }    
    });
    this.storage.get('Immatriculation_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Immatriculation').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Proprietaire_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Proprietaire').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Profession_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Profession').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Adresse_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Adresse').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('MiseService_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('MiseService').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('CarteViolette_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('CarteViolette').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Vignette_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Vignette').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('NbPlaceAssise_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('NbPlaceAssise').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('NbDebout_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('NbDebout').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Cooperative_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Cooperative').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Patente_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Patente').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Puissance_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Puissance').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Carosserie_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Carosserie').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Marque_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Marque').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Type_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Type').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Energie_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Energie').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Moteur_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Moteur').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('NumeroSerie_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('NumeroSerie').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Usage_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Usage').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('ChargeUtile_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('ChargeUtile').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('PoidsTotalCharge_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('PoidsTotalCharge').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('PoidsVide_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('PoidsVide').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Centre_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Centre').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Province_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Province').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Verificateur_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Verificateur').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Secretaire_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Secretaire').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('NumPV_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('NumPV').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('DateVisite_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('DateVisite').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Expiration_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Expiration').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Aptitude_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Aptitude').then((val) => {
      if(val == '1'){ 
        this.resultat.push("Apte");
      }
      else{
        this.resultat.push("Inapte");
      }
    });
    this.storage.get('Contre_nom').then((val) => {
      this.resultat.push(val);
    });
    this.storage.get('Contre').then((val) => {
      if(val == '1'){ 
        this.resultat.push("Contre Visite");
      }
      else{
        this.resultat.push("Première");
      }
    });
  }

  remiseZero(){
    this.storage.set('Immatriculation_nom' , "numéro d'immatriculation introuvable");
    this.storage.set('Immatriculation' , "");
    this.storage.set('Proprietaire_nom' , "");
    this.storage.set('Proprietaire' , "");
    this.storage.set('Profession_nom' , "");
    this.storage.set('Profession' , "");
    this.storage.set('Adresse_nom' , "");
    this.storage.set('Adresse' , "");
    this.storage.set('MiseService_nom' , "");
    this.storage.set('MiseService' , "");
    this.storage.set('CarteViolette_nom' , "");
    this.storage.set('CarteViolette' , "");
    this.storage.set('Vignette_nom' , "");
    this.storage.set('Vignette' , "");
    this.storage.set('NbPlaceAssise_nom' , "");
    this.storage.set('NbPlaceAssise' , "");
    this.storage.set('NbDebout_nom' , "");
    this.storage.set('NbDebout' , "");
    this.storage.set('Cooperative_nom' , "");
    this.storage.set('Cooperative' , "");
    this.storage.set('Patente_nom' , "");
    this.storage.set('Patente' , "");
    this.storage.set('Puissance_nom' , "");
    this.storage.set('Puissance' , "");
    this.storage.set('Carosserie_nom' , "");
    this.storage.set('Carosserie' , "");
    this.storage.set('Marque_nom' , "");
    this.storage.set('Marque' , "");
    this.storage.set('Type_nom' , "");
    this.storage.set('Type' , "");
    this.storage.set('Energie_nom' , "");
    this.storage.set('Energie' , "");
    this.storage.set('Moteur_nom' , "");
    this.storage.set('Moteur' , "");
    this.storage.set('NumeroSerie_nom' , "");
    this.storage.set('NumeroSerie' , "");
    this.storage.set('Usage_nom' , "");
    this.storage.set('Usage' , "");
    this.storage.set('ChargeUtile_nom' , "");
    this.storage.set('ChargeUtile' , "");
    this.storage.set('PoidsTotalCharge_nom' , "");
    this.storage.set('PoidsTotalCharge' , "");
    this.storage.set('PoidsVide_nom' , "");
    this.storage.set('PoidsVide' , "");
    this.storage.set('Centre_nom' , "");
    this.storage.set('Centre' , "");
    this.storage.set('Province_nom' , "");
    this.storage.set('Province' , "");
    this.storage.set('Verificateur_nom' , "");
    this.storage.set('Verificateur' , "");
    this.storage.set('Secretaire_nom' , "");
    this.storage.set('Secretaire' , "");
    this.storage.set('NumPV_nom' , "");
    this.storage.set('NumPV' , "");
    this.storage.set('DateVisite_nom' , "");
    this.storage.set('DateVisite' , "");
    this.storage.set('Expiration_nom' , "");
    this.storage.set('Expiration' , "");
    this.storage.set('Aptitude_nom' , "");
    this.storage.set('Aptitude' , "");
    this.storage.set('Contre_nom' , "");
    this.storage.set('Contre' , "");
    //this.deleteData();
  }

  deleteData(){
    this.storage.remove('Immatriculation_nom');
    this.storage.remove('Immatriculation');
    this.storage.remove('Proprietaire_nom');
    this.storage.remove('Proprietaire');
    this.storage.remove('Profession_nom');
    this.storage.remove('Profession');
    this.storage.remove('Adresse_nom');
    this.storage.remove('Adresse');
    this.storage.remove('MiseService_nom');
    this.storage.remove('MiseService');
    this.storage.remove('CarteViolette_nom');
    this.storage.remove('CarteViolette');
    this.storage.remove('Vignette_nom');
    this.storage.remove('Vignette');
    this.storage.remove('NbPlaceAssise_nom');
    this.storage.remove('NbPlaceAssise');
    this.storage.remove('NbDebout_nom');
    this.storage.remove('NbDebout');
    this.storage.remove('Cooperative_nom');
    this.storage.remove('Cooperative');
    this.storage.remove('Patente_nom');
    this.storage.remove('Patente');
    this.storage.remove('Puissance_nom');
    this.storage.remove('Puissance');
    this.storage.remove('Carosserie_nom');
    this.storage.remove('Carosserie');
    this.storage.remove('Marque_nom');
    this.storage.remove('Marque');
    this.storage.remove('Type_nom');
    this.storage.remove('Type');
    this.storage.remove('Energie_nom');
    this.storage.remove('Energie');
    this.storage.remove('Moteur_nom');
    this.storage.remove('Moteur');
    this.storage.remove('NumeroSerie_nom');
    this.storage.remove('NumeroSerie');
    this.storage.remove('Usage_nom');
    this.storage.remove('Usage');
    this.storage.remove('ChargeUtile_nom');
    this.storage.remove('ChargeUtile');
    this.storage.remove('PoidsTotalCharge_nom');
    this.storage.remove('PoidsTotalCharge');
    this.storage.remove('PoidsVide_nom');
    this.storage.remove('PoidsVide');
    this.storage.remove('Centre_nom');
    this.storage.remove('Centre');
    this.storage.remove('Province_nom');
    this.storage.remove('Province');
    this.storage.remove('Verificateur_nom');
    this.storage.remove('Verificateur');
    this.storage.remove('Secretaire_nom');
    this.storage.remove('Secretaire');
    this.storage.remove('NumPV_nom');
    this.storage.remove('NumPV');
    this.storage.remove('DateVisite_nom');
    this.storage.remove('DateVisite');
    this.storage.remove('Expiration_nom');
    this.storage.remove('Expiration');
    this.storage.remove('Aptitude_nom');
    this.storage.remove('Aptitude');
    this.storage.remove('Contre_nom');
    this.storage.remove('Contre');
  }

}
