import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator  } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TaskManagement';
  displayedColumns: string[] = [ 'taskTitle', 'taskDescription', 'dueDate', 'taskPriority', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.getAllTaskData();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val =>{
      if(val === 'Save'){
        this.getAllTaskData();
      }
    })
  }

  getAllTaskData() {
    this.api.getTaskData()
    .subscribe({
      next :(res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching the Records !!")
      }
    })
  }

  editTask(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'Update'){
        this.getAllTaskData();
      }
    })
  }

  deleteTask(id: any) {
    this.api.deleteTaskData(id)
    .subscribe({
      next :(res) =>{
        alert("Task deleted succesfully.");
        this.getAllTaskData();
      },
      error: (err)=>{
        alert("Erro while delete the Records !!");
      }
    })
  }

  appliedFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
