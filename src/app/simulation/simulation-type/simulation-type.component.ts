import { Observable } from 'rxjs';

export interface SimulationTypeComponent {
  generateSequence(sequenceSize: number): Observable<number>;
}
