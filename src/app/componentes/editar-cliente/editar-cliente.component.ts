import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };

  id: string;

  constructor(
    private clienteService: ClienteServicio,
    private flashMessages: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteService.getCliente(this.id).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  guardar({ value, valid }: { value: Cliente; valid: boolean }) {
    if (!valid) {
      this.flashMessages.error(
        'Por favor llena el formulario correctamente',
        'Error al Editar'
      );
    } else {
      value.id = this.id;
      this.clienteService.modificarCliente(value);
      this.flashMessages.success('Se realizaron los cambios con exito!');
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if (confirm('Seguro que desea eliminar el cliente?')) {
      this.clienteService.eliminarCliente(this.cliente);
      this.flashMessages.success('Se elimino con exito');
      this.router.navigate(['/']);
    }
  }
}
