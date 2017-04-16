import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  photos = [];
  isLoading = true;

  photo = {};
  isEditing = false;

  addPhotoForm: FormGroup;
  name = new FormControl('', Validators.required);
  image = new FormControl('', Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPhotos();

    this.addPhotoForm =
      this.formBuilder.group({
        name: this.name,
        image: this.image
      });
  }
  getPhotos() {
    this.dataService.getPhotos().subscribe(
      data => this.photos = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addPhoto() {
    this.dataService.addPhoto(this.addPhotoForm.value).subscribe(
      res => {
        const newPhoto = res.json();
        this.photos.push(newPhoto);
        this.addPhotoForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(photo) {
    this.isEditing = true;
    this.photo = photo;
  }

  cancelEditing() {
    this.isEditing = false;
    this.photo = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the photos to reset the editing
    this.getPhotos();
  }

  editPhoto(photo) {
    this.dataService.editPhoto(photo).subscribe(
      res => {
        this.isEditing = false;
        this.photo = photo;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deletePhoto(photo) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deletePhoto(photo).subscribe(
        res => {
          const pos = this.photos.map(elem => { return elem._id; }).indexOf(photo._id);
          this.photos.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
