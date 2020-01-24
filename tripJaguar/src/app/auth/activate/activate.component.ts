import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  URL_PUBLIC: string = environment.PUBLIC_FILE;
  showLoading: boolean = true;
  uid: string;
  image: string;
  mensaje: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('id');

    this.authService.activate(this.uid)
    .then(
      success => {

        this.showLoading = false;
        this.image = 'success-email';
        this.mensaje = success.message;
        // this.mensaje = 'Su cuenta fue activada exitosamente, gracias por unirse a nosotros';

      }
    ).catch(
      error => {
        this.showLoading = false;
        this.image = 'error-email';
        this.mensaje = 'Ocurrió un problema, intentelo de nuevo mas tarde';
      }
    );
  }

}
