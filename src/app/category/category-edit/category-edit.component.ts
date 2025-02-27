import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../model/Category';
import { CategoryService } from '../category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit{
  category: Category;

  constructor(
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {category: Category},
    private categoryService: CategoryService,
    private snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    
    this.category = this.data.category != null ? Object.assign({}, this.data.category) : new Category();
  }

  onSave(){

    if (this.category.name.trim()===''){this.snackbar.open('El nombre no puede estar vacio','Cerrar',{duration: 3000}); return }

    this.categoryService.saveCategory(this.category).subscribe(() =>{
      this.dialogRef.close();
    });
  }

  onClose(){

    this.dialogRef.close();
  }
}
