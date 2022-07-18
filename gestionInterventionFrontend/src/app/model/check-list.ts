import {Material} from "./material";
import {Software} from "./software";
import {CheckListModel} from "./check-list-model";

export interface CheckList {
  id: number;
  materiels: Material[];
  softwares: Software[];
  model: CheckListModel;
}
