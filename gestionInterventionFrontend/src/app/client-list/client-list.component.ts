import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ClientService} from "../service/client.service";
import {Client} from "../model/client";
import {MatDialog} from "@angular/material/dialog";
import {AddClientDialogComponent} from "../dialog/add-client-dialog/add-client-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AgentAdministratif} from "../model/agent-administratif";
import {EditAgentDialogComponent} from "../dialog/edit-agent-dialog/edit-agent-dialog.component";
import {EditClientDialogComponent} from "../dialog/edit-client-dialog/edit-client-dialog.component";


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements AfterViewInit {

  clients!: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private client$: ClientService,
              private dialog: MatDialog) { }

  ngAfterViewInit(): void {

    this.client$.getAll().subscribe(list =>{
      this.clients = new MatTableDataSource(list);
      this.clients.paginator=this.paginator;
    });
  }


  add() {
    const dialogRef = this.dialog.open(AddClientDialogComponent);
    dialogRef.afterClosed().subscribe(client=>{
      if(client){
        this.client$.add({id:0, nom: client.nom, address: client.address}).subscribe(client=>{
          let data =this.clients.data;
          data.push(client);
          this.clients.data=data;
        });
      }
    });
  }

  edit(client: Client) {
    const dialogRef = this.dialog.open(EditClientDialogComponent,{data: client});
    dialogRef.afterClosed().subscribe( _client => {
      this.client$.update(_client).subscribe(c =>{
        let data =this.clients.data;
        const i = data.findIndex(i => i.id==c.id);
        data.splice(i,1,c);
        this.clients.data=data;
      });
    });
  }


}
