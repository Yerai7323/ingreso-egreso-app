import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {}

  crearUsuario() {
    if (this.registroForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Creando usuario...',
      didOpen: () => {
        Swal.showLoading()
      }
    })

    const { nombre, email, password } = this.registroForm.value;
    console.log(nombre, email, password)
    this.authService.crearUsuario(nombre, email, password)
      .then( credenciales => {
        this.router.navigate(['/']);
        Swal.close();
      })
      .catch( err => 
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.message,
      }));
  }
}
