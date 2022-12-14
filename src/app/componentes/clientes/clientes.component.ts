import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;

  @ViewChild('clienteForm') clienteForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };
  constructor(
    private clienteService: ClienteServicio,
    private flashMessages: ToastrService
  ) {}

  ngOnInit(): void {
    this.flashMessages.overlayContainer = this.toastContainer;
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        saldoTotal += cliente.saldo;
      });
    }
    return saldoTotal;
  }

  agregarCliente({ value, valid }: { value: Cliente; valid: boolean }) {
    if (!valid) {
      this.flashMessages.error(
        'Por favor llena el formulario correctamente',
        'Error al agregar'
      );
    } else {
      this.clienteService.agregarCliente(value);
      this.flashMessages.success(
        'Se agrego correctamente al Cliente',
        'Exito al agregar'
      );
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
}
