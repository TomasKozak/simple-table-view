import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  userData: any;

  userForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: [''],
    address: this.fb.group({
      street: [''],
      suite: [''],
      city: [''],
      zipcode: [''],
      geo: this.fb.group({
        lat: [''],
        lng: [''],
      }),
    }),
    phone: [''],
    website: [''],
    company: this.fb.group({
      name: [''],
      catchPhrase: [''],
      bs: [''],
    }),
  });

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    @Optional() public dialogRef: MatDialogRef<any>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService
      .getUserDetail(this.route.snapshot.queryParams['id'])
      .subscribe((data) => {
        this.userData = data;
        this.userForm
          .get('name')
          ?.setValue(
            this.userData.name && this.userData.name !== 'not_found'
              ? this.userData.name
              : ''
          );
        this.userForm
          .get('username')
          ?.setValue(this.userData.username ? this.userData.username : '');
        this.userForm
          .get('email')
          ?.setValue(this.userData.email ? this.userData.email : '');
        this.userForm
          .get('address')
          ?.get('street')
          ?.setValue(
            this.userData.address?.street ? this.userData.address?.street : ''
          );
        this.userForm
          .get('address')
          ?.get('suite')
          ?.setValue(
            this.userData.address?.suite ? this.userData.address?.suite : ''
          );
        this.userForm
          .get('address')
          ?.get('city')
          ?.setValue(
            this.userData.address?.city ? this.userData.address?.city : ''
          );
        this.userForm
          .get('address')
          ?.get('zipcode')
          ?.setValue(
            this.userData.address?.zipcode ? this.userData.address?.zipcode : ''
          );
        this.userForm
          .get('address')
          ?.get('geo')
          ?.get('lat')
          ?.setValue(
            this.userData.address?.geo?.lat
              ? this.userData.address?.geo?.lat
              : ''
          );
        this.userForm
          .get('address')
          ?.get('geo')
          ?.get('lng')
          ?.setValue(
            this.userData.address?.geo?.lng
              ? this.userData.address?.geo?.lng
              : ''
          );
        this.userForm
          .get('phone')
          ?.setValue(this.userData.phone ? this.userData.phone : '');
        this.userForm
          .get('website')
          ?.setValue(this.userData.website ? this.userData.website : '');
        this.userForm
          .get('company')
          ?.get('name')
          ?.setValue(
            this.userData.company?.name ? this.userData.company?.name : ''
          );
        this.userForm
          .get('company')
          ?.get('catchPhrase')
          ?.setValue(
            this.userData.company?.catchPhrase
              ? this.userData.company?.catchPhrase
              : ''
          );
        this.userForm
          .get('company')
          ?.get('bs')
          ?.setValue(
            this.userData.company?.bs ? this.userData.company?.bs : ''
          );
      });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.usersService.addNewUser(this.userForm.value);
      if (this.dialogRef) {
        this.dialogRef.close({ event: 'Refresh' });
      }
    }
  }

  deleteUser() {
    this.usersService
      .deleteUser(this.route.snapshot.queryParams['id'])
      .subscribe((data) => {
        this.router.navigate(['/index']);
      });
  }
}
