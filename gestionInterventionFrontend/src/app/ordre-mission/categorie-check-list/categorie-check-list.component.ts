import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SousCategorieService} from "../../service/sous-categorie.service";
import {SousCategorie} from "../../model/sous-categorie";
import {ThemePalette} from "@angular/material/core";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Categorie} from "../../model/categorie";
import {AddSousCategorieDialogComponent} from "../../dialog/add-sous-categorie-dialog/add-sous-categorie-dialog.component";
import {MatDialog} from "@angular/material/dialog";

export interface CategorieData{
  sousCategorie: SousCategorie;
  selected: boolean;
  color: ThemePalette;
}

@Component({
  selector: 'app-categorie-check-list',
  templateUrl: './categorie-check-list.component.html',
  styleUrls: ['./categorie-check-list.component.css']
})
export class CategorieCheckListComponent implements OnInit {

  @Input() categorie!: Categorie;
  @Input() selected!: Observable<SousCategorie[]>;
  @Input() view!: (categorie: SousCategorie)=>string;
  @Input() palaceHolder!: string;

  @Output() changeEmitter = new EventEmitter<{changes:boolean,sousCategorie: SousCategorie, event: "ADD"|"REMOVE"}>();

  categories!: CategorieData[];

  selectControl = new FormControl();

  filtered!: Observable<CategorieData[]>;

  changes!: boolean;

  constructor(private categorie$: SousCategorieService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.categorie$.getAllByCategorie(this.categorie).subscribe(data =>{
      this.categories = data.map(c => {
        return {sousCategorie: c, color: "warn", selected: false};
      });
      this.selected.subscribe(list =>{
        this.categories.forEach( c => {
          if(list.find(i => i.id==c.sousCategorie.id)){
            c.color="primary";
            c.selected=true;
          } else {
            c.color="warn";
            c.selected=false;
          }
        });
       this.selectControl.reset();
      });
      this.changes=false;
    });
    this.filtered = this.selectControl.valueChanges.pipe(
      startWith<string>(''),
      map( value => typeof  value === 'string' ? value: ''),
      map(filter => this.filter(filter))
    );
  }
  displayFn = (): string => '';

  private filter(filter: string) {
    if(filter.length > 0){
      return this.categories.filter(option => {
        return option.sousCategorie.titre.toLowerCase().indexOf(filter.toLowerCase()) >=0;
      });
    }else{
      return this.categories;
    }
  }

  optionClicked($event: MouseEvent, option: CategorieData) {
    $event.stopPropagation();
    this.toggleSelection(option);

  }

  toggleSelection(option: CategorieData) {
    option.selected = !option.selected;
    this.checkChanges();
    const event = {
      changes: this.changes,
      sousCategorie:option.sousCategorie,
      event: <"ADD"|"REMOVE"> ((option.selected)? "ADD" : "REMOVE")
    };
    this.changeEmitter.emit(event);
  }

  checkChanges(){
    if(this.changes){
      for (const c of this.categories){
        if ((c.color == "primary" && !c.selected)||(c.color== "warn" && c.selected)) return;
      }
      this.changes = false;
    }
    else for (const c of this.categories){
      if ((c.color == "primary" && !c.selected)||(c.color== "warn" && c.selected)){
        this.changes = true;
        return;
      }
    }
  }

  add() {
    const dialogRef = this.dialog.open(AddSousCategorieDialogComponent,{data:this.categorie.split('_')[0].toLowerCase()});
    dialogRef.afterClosed().subscribe(data=> {
      if (data) {
        const body: SousCategorie={
          id:0,
          titre: data.titre,
          description: data.description,
          categorie: this.categorie
        };
        this.categorie$.add(body)
          .subscribe(s =>
            this.categories.push({sousCategorie: s, selected: false, color: "warn"})
          );
      }
    });

  }
}
