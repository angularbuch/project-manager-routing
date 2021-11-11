import {Injectable} from '@angular/core';

@Injectable()
export class SuperSecretCalculationService {

  constructor() {
    console.log('Instantiate super secret service!');
  }

  executeCalculation() {
    return 42;
  }
}
