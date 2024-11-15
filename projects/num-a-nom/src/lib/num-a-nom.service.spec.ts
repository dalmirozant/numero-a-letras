import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumANomComponent } from './num-a-nom.component';
import { By } from '@angular/platform-browser';

describe('NumANomComponent', () => {
  let component: NumANomComponent;
  let fixture: ComponentFixture<NumANomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumANomComponent], // Importar el componente standalone
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumANomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Transformación de números', () => {
    it('debería retornar "UNO" para el número 1', () => {
      const evento = new Event('input');
      Object.defineProperty(evento, 'target', { value: { value: '1' } });
      const resultado = component.obtenerValorNumerico(evento);
      expect(resultado).toBe('UNO');
    });

    it('debería retornar "CERO" o vacío para el número 0', () => {
      const evento = new Event('input');
      Object.defineProperty(evento, 'target', { value: { value: '0' } });
      const resultado = component.obtenerValorNumerico(evento);
      expect(resultado).toBe('');
    });

    it('debería retornar "TRECE" para el número 13', () => {
      const evento = new Event('input');
      Object.defineProperty(evento, 'target', { value: { value: '13' } });
      const resultado = component.obtenerValorNumerico(evento);
      expect(resultado).toBe('TRECE');
    });

    it('debería retornar "VEINTIDOS" para el número 22', () => {
      const evento = new Event('input');
      Object.defineProperty(evento, 'target', { value: { value: '22' } });
      const resultado = component.obtenerValorNumerico(evento);
      expect(resultado).toBe('VEINTIDOS');
    });

    it('debería retornar "CIENTO UNO" para el número 101', () => {
      const evento = new Event('input');
      Object.defineProperty(evento, 'target', { value: { value: '101' } });
      const resultado = component.obtenerValorNumerico(evento);
      expect(resultado).toBe('CIENTO UNO');
    });

    it('debería retornar "DOS MIL" para el número 2000', () => {
      const evento = new Event('input');
      Object.defineProperty(evento, 'target', { value: { value: '2000' } });
      const resultado = component.obtenerValorNumerico(evento);
      expect(resultado).toBe('DOS MIL');
    });

    it('debería retornar "UN MILLON" para el número 1000000', () => {
      const evento = new Event('input');
      Object.defineProperty(evento, 'target', { value: { value: '1000000' } });
      const resultado = component.obtenerValorNumerico(evento);
      expect(resultado).toBe('UN MILLON');
    });

    it('debería retornar "Número demasiado grande" para números mayores de 12 dígitos', () => {
      const evento = new Event('input');
      Object.defineProperty(evento, 'target', {
        value: { value: '1234567890123' },
      });
      const resultado = component.obtenerValorNumerico(evento);
      expect(resultado).toBe('Número demasiado grande');
    });
  });

  describe('Eventos y Output', () => {
    it('debería emitir el resultado correcto para una entrada válida', () => {
      spyOn(component.resultado, 'emit');
      const inputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputElement.value = '1234';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.resultado.emit).toHaveBeenCalledWith(
        'UN MIL DOSCIENTOS TREINTA Y CUATRO'
      );
    });

    it('debería emitir "Número demasiado grande" si la entrada es demasiado larga', () => {
      spyOn(component.resultado, 'emit');
      const inputElement = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputElement.value = '1234567890123'; // Número de más de 12 dígitos
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.resultado.emit).toHaveBeenCalledWith(
        'Número demasiado grande'
      );
    });
  });

  describe('Casos Especiales', () => {
    it('debería retornar "UN MIL" para el número 1000', () => {
      const evento = new Event('input');
      Object.defineProperty(evento, 'target', { value: { value: '1000' } });
      const resultado = component.obtenerValorNumerico(evento);
      expect(resultado).toBe('UN MIL');
    });

    it('debería retornar "DOS MILLONES" para el número 2000000', () => {
      const evento = new Event('input');
      Object.defineProperty(evento, 'target', { value: { value: '2000000' } });
      const resultado = component.obtenerValorNumerico(evento);
      expect(resultado).toBe('DOS MILLONES');
    });
  });
});
