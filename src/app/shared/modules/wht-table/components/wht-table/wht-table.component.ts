import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CatsTableListData } from "@shared/models";

@Component({
  selector: 'app-wht-table',
  templateUrl: './wht-table.component.html',
  styleUrls: ['./wht-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhtTableComponent {

  @Input() public tableData: CatsTableListData;

  public displayedColumns: string[] = ['breed', 'temperament', 'description', 'images'];
}
