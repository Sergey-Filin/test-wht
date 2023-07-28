import { Component, Input } from '@angular/core';
import { CatsTableDto } from "@shared/models";

@Component({
  selector: 'app-wht-table',
  templateUrl: './wht-table.component.html',
  styleUrls: ['./wht-table.component.scss']
})
export class WhtTableComponent {

  @Input() public tableData: CatsTableDto;

  public displayedColumns: string[] = ['name', 'temperament', 'description', 'images'];
}
