import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  TaskPriorities: string[] = ['Low', 'Medium', 'High'];
  taskForm !: FormGroup;
  actionBtn : string = "Save";

  constructor(
    private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>
  ) { }

  ngOnInit() : void {
    this.taskForm = this.formBuilder.group({
      taskTitle: [null, [Validators.required]],
      taskDescription: [null, [Validators.required]],
      dueDate: [null],
      taskPriority: [null]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.taskForm.controls['taskTitle'].setValue(this.editData.taskTitle);
      this.taskForm.controls['taskDescription'].setValue(this.editData.taskDescription);
      this.taskForm.controls['dueDate'].setValue(this.editData.dueDate);
      this.taskForm.controls['taskPriority'].setValue(this.editData.taskPriority)
      
    }
  }

  AddTask() {
    if(!this.editData) {
      if(this.taskForm.valid) {
        this.api.postTask(this.taskForm.value)
        .subscribe({
          next :(res) =>{
            alert("Task Added Succesfully.");
            this.taskForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Error While Adding Your Task!!!");
          }
        })
      }
    } 
    else {
      this.updateTaskData();
    }
  }

  updateTaskData() {
      this.api.putTaskData(this.taskForm.value, this.editData.id)
      .subscribe({
        next :(res) =>{
          alert("Task Updated Succesfully.");
          this.taskForm.reset();
          this.dialogRef.close('Update');
        },
        error: () => {
          alert("Error while updating a Task!!!");
        }
      })
  }
}
