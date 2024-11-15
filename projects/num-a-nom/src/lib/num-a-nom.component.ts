import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, fromEvent, map, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-num-a-nom',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      <input type="number" #numeroInput />
    </p>
  `,
  styles: ``,
})
export class NumANomComponent implements AfterViewInit, OnDestroy {
  @ViewChild('numeroInput', { static: false }) numeroInput!: ElementRef;
  @Output() resultado = new EventEmitter<string>();

  digitos$!: Observable<string>;
  private destroyed$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.inicializarStreamDeEntrada();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Inicializa el stream de entrada del número y configura la suscripción
   */
  private inicializarStreamDeEntrada(): void {
    this.digitos$ = fromEvent<Event>(
      this.numeroInput.nativeElement,
      'input'
    ).pipe(
      takeUntil(this.destroyed$),
      map((event) => this.obtenerValorNumerico(event)),
      map((valor) => this.transformarNumeroATexto(valor))
    );

    this.digitos$.subscribe({
      next: (resultado) => this.resultado.emit(resultado),
    });
  }

  /**
   * Extrae el valor numérico de un evento de entrada
   */
  private obtenerValorNumerico(event: Event): string {
    const inputElement = event.target as HTMLInputElement;
    return inputElement.value;
  }

  /**
   * Transforma un número en texto en función de su valor
   */
  transformarNumeroATexto(valorRecibido: string): string {
    if (valorRecibido.length > 12) return 'Número demasiado grande';

    const triosDeNumeros = this.dividirEnTres(valorRecibido);
    const triosConvertidos = this.convertirTriosATexto(triosDeNumeros);

    return this.correcciones(triosConvertidos.join(''));
  }

  /**
   * Divide un número en grupos de tres dígitos
   */
  private dividirEnTres(numero: string): string[] {
    if (!numero) return [];

    return numero
      .split('')
      .reverse()
      .join('')
      .match(/.{1,3}/g)!
      .map((chunk) => chunk.split('').reverse().join(''))
      .reverse();
  }

  /**
   * Ordena los grupos de tres en tres y agrega unidades
   */
  private convertirTriosATexto(trios: string[]): string[] {
    const triosLetras = trios.map((trio) => this.tresNumeros(trio));
    const cantidadTrios = triosLetras.length;

    if (cantidadTrios > 1) triosLetras.splice(-1, 0, ' MIL ');
    if (cantidadTrios > 2) triosLetras.splice(-3, 0, ' MILLONES ');
    if (cantidadTrios > 3) triosLetras.splice(-5, 0, ' MIL ');

    return triosLetras;
  }

  /**
   * Convierte un grupo de tres dígitos a texto
   */
  private tresNumeros(numero: string): string {
    if (numero === '100') return 'CIEN';

    const unidades = this.obtenerUnidades(numero);
    const decenas = this.obtenerDecenas(numero);
    const centenas = this.obtenerCentenas(numero);

    return `${centenas} ${decenas}`.trim();
  }

  /**
   * Obtiene la representación textual de las unidades
   */
  private obtenerUnidades(numero: string): string {
    const unidades = parseInt(numero.slice(-1), 10);
    return this.ceroAlVeinte(unidades);
  }

  /**
   * Obtiene la representación textual de las decenas
   */
  private obtenerDecenas(numero: string): string {
    const decenasNumero = parseInt(numero.slice(-2), 10);
    if (decenasNumero < 20) return this.ceroAlVeinte(decenasNumero);

    const unidadesTexto = this.obtenerUnidades(numero);
    const decenasTexto = this.decenas(numero.charAt(numero.length - 2));

    return unidadesTexto ? `${decenasTexto} Y ${unidadesTexto}` : decenasTexto;
  }

  /**
   * Obtiene la representación textual de las centenas
   */
  private obtenerCentenas(numero: string): string {
    const centenas = numero.charAt(numero.length - 3);
    return this.centenas(centenas);
  }

  ceroAlVeinte(numero: number): string {
    let numeroLetras: string = 'ERROR';
    switch (numero) {
      case 0:
        numeroLetras = '';
        break;
      case 1:
        numeroLetras = 'UNO';
        break;
      case 2:
        numeroLetras = 'DOS';
        break;
      case 3:
        numeroLetras = 'TRES';
        break;
      case 4:
        numeroLetras = 'CUATRO';
        break;
      case 5:
        numeroLetras = 'CINCO';
        break;
      case 6:
        numeroLetras = 'SEIS';
        break;
      case 7:
        numeroLetras = 'SIETE';
        break;
      case 8:
        numeroLetras = 'OCHO';
        break;
      case 9:
        numeroLetras = 'NUEVE';
        break;
      case 10:
        numeroLetras = 'DIEZ';
        break;
      case 11:
        numeroLetras = 'ONCE';
        break;
      case 12:
        numeroLetras = 'DOCE';
        break;
      case 13:
        numeroLetras = 'TRECE';
        break;
      case 14:
        numeroLetras = 'CATORCE';
        break;
      case 15:
        numeroLetras = 'QUINCE';
        break;
      case 16:
        numeroLetras = 'DIECISEIS';
        break;
      case 17:
        numeroLetras = 'DIECISIETE';
        break;
      case 18:
        numeroLetras = 'DIECIOCHO';
        break;
      case 19:
        numeroLetras = 'DIECINUEVE';
        break;
      default:
        numeroLetras = '';
    }
    return numeroLetras;
  }

  decenas(numero: string): string {
    let decena: string = '';
    switch (numero) {
      case '2':
        decena = 'VEINTE';
        break;
      case '3':
        decena = 'TREINTA';
        break;
      case '4':
        decena = 'CUARENTA';
        break;
      case '5':
        decena = 'CINCUENTA';
        break;
      case '6':
        decena = 'SESENTA';
        break;
      case '7':
        decena = 'SETENTA';
        break;
      case '8':
        decena = 'OCHENTA';
        break;
      case '9':
        decena = 'NOVENTA';
        break;
      default:
        decena = '';
    }
    return decena;
  }

  centenas(numero: string): string {
    let centena: string = '';
    switch (numero) {
      case '1':
        centena = 'CIENTO';
        break;
      case '2':
        centena = 'DOSCIENTOS';
        break;
      case '3':
        centena = 'TRESCIENTOS';
        break;
      case '4':
        centena = 'CUATROCIENTOS';
        break;
      case '5':
        centena = 'QUINIENTOS';
        break;
      case '6':
        centena = 'SEISCIENTOS';
        break;
      case '7':
        centena = 'SETECIENTOS';
        break;
      case '8':
        centena = 'OCHOCIENTOS';
        break;
      case '9':
        centena = 'NOVECIENTOS';
        break;
      default:
        centena = '';
    }
    return centena;
  }

  correcciones(numeroCompleto: string): string {
    let numeroCorregido = numeroCompleto
      .replace(/\s+/g, ' ')
      .replaceAll('VEINTE Y ', 'VEINTI')
      .replaceAll('UNO MIL', 'UN MIL')
      .replaceAll('MILLONES MIL', 'MILLONES')
      .replaceAll('UN MILLONES', 'UN MILLON')
      .trim();

    return numeroCorregido;
  }
}
