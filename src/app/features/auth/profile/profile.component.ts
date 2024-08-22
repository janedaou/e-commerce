import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: [''],
      description: [''],
      profilePicture: [null]
    });
  }

  ngOnInit(): void {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.profileForm.patchValue(userData);
  }

  onProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileForm.patchValue({
          profilePicture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedUserData = this.profileForm.value;
      // Handle profile update (e.g., send updated data to the server)
      console.log('Updated user data:', updatedUserData);
    }
  }
}
