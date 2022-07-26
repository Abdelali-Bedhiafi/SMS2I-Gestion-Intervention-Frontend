import { ListKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupTags } from 'src/app/model/group-tags';
import { SousCategorie } from 'src/app/model/sous-categorie';
import { Tags } from 'src/app/model/tags';
import { BonInterventionService } from 'src/app/service/bon-intervention.service';
import { SousCategorieService } from 'src/app/service/sous-categorie.service';
import { TagsService } from 'src/app/service/tags.service';
import { BonInterventionDetail } from '../model/bon-intervention-detail';

@Component({
  selector: 'app-detail-bon-intervention',
  templateUrl: './detail-bon-intervention.component.html',
  styleUrls: ['./detail-bon-intervention.component.css']
})
export class DetailBonInterventionComponent implements OnInit {



  bonIntervention!: BonInterventionDetail;
  actions!:SousCategorie[];
  resaux!:SousCategorie[];
  technologies!:SousCategorie[];
  tags!:GroupTags[];
  choix!:SousCategorie[];
  choixreseau!:SousCategorie[];
  choixtech!:SousCategorie[];
  choixtags:GroupTags[]=[];
  tagMap = new Map<string,Tags[]>();
  constructor(private bonintervention : BonInterventionService, private tag : TagsService ,
    private sousCategori$: SousCategorieService , private grouptag:TagsService) { }

  ngOnInit(): void {
    this.sousCategori$.getAllByCategorie("action").subscribe(list=>{
      this.actions=list;
    })

    this.sousCategori$.getAllByCategorie("technologie").subscribe(list=>{
      this.technologies=list;

    })

    this.sousCategori$.getAllByCategorie("reseau").subscribe(list=>{this.resaux=list;
    })



    this.grouptag.getAllGroupe().subscribe(list=>this.tags=list);


    this.bonintervention.getById(1).subscribe((data)=>{
      this.bonIntervention = data;
      this.choix= this.bonIntervention.categories.filter(c => c.categorie=='action');
      this.choixreseau=this.bonIntervention.categories.filter(r => r.categorie=='reseau');
      this.choixtech=this.bonIntervention.categories.filter(t => t.categorie=='technologie');
      this.bonIntervention.tags.forEach( tag =>{
        let list = this.tagMap.get(tag.groupe);
        if(list) list.push(tag);
        else list = [tag];
        this.tagMap.set(tag.groupe,list);
      });

      this.tagMap.forEach((tags,groupName) =>{
        this.choixtags.push({
          id : 0 , nomGroup:groupName , tags:tags
        });
      });
      console.log(this.choixtags);
    });
  }

  submitchange(){
    console.log(this.choix);
    console.log(this.choixtags)
    this.bonintervention.update(this.bonIntervention).subscribe((bon)=>{
      window.alert("mise a jour affecte")
    });



  }












}
