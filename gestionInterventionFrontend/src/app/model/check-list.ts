import {Materiel} from "./materiel";
import {Software} from "./software";
import {CheckListModel} from "./check-list-model";

export interface CheckList {
  id: number;
  materiels: Materiel[];
  softwares: Software[];
  model: CheckListModel;
  ordreMission: number;
}
