import { scope } from '@scripts/utils';
import 'reflect-metadata';

// ====================================== Decorators ======================================
scope(() => {
  scope(() => {
    const LogEventValue = (target: Object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
      console.log('LogEventValue', { target, key, descriptor });

      const originalFn = descriptor.value;
      return {
        ...descriptor,
        value: (e: Event) => {
          const inputRef = e.target as HTMLInputElement;
          console.log('LogEventValue:', inputRef.value);
          originalFn(e);
        },
      };
    };

    class Search {
      constructor(private readonly inputElement: HTMLInputElement) {
        this.inputElement.addEventListener('input', this.onSearch.bind(this));
      }

      @LogEventValue
      private onSearch(_e: Event): void {
        // const target = _e.target as HTMLInputElement;
        // console.log('onSearch:', target.value);
      }
    }

    const input = document.createElement('input');
    input.classList.add('decorator-input');
    document.querySelector('main')!.append(input);

    new Search(input);
  }, 'LogEventValue');

  /*
  scope(() => {
    const RANGE_KEY: unique symbol = Symbol('RANGE_KEY');

    const Range = (min: number, max: number): ParameterDecorator => {
      return (target, key, index) => {
        const existingRange = Reflect.getMetadata(RANGE_KEY, target, key) || {};
        existingRange[index] = [min, max];
        Reflect.defineMetadata(RANGE_KEY, existingRange, target, key);
      };
    };

    const Validate = (target: any, key: string, desc: PropertyDescriptor): void => {
      const originFn = desc.value;
      desc.value = (...args: unknown[]) => {
        const existingRange = Reflect.getMetadata(RANGE_KEY, target.key) || {};
        for (const [paramIndex, range] of Object.entries(existingRange)) {
          const [min, max] = range as [number, number];
          const paramValue = args[Number(paramIndex)];
          if (Number(paramValue) < min || Number(paramValue) > max) {
            throw new Error(`Error in ${target.constructor.name} instance.
            Parameter of method ${key} on position ${paramIndex} out of range ${[min, max]}.
            Current value ${paramValue}
            `);
          }
        }
        return originFn(...args);
      };
    };

    class Calculator {
      @Validate
      public updatePercentage(@Range(20, 70) _oldValue: number, @Range(20, 50) _newValue: number) {}
    }

    const calc = new Calculator();

    calc.updatePercentage(40, 45);

    setTimeout(() => {
      calc.updatePercentage(45, 80);
    }, 5000);
  }, 'Validation');
   */
}, 'decorators');

export {};
