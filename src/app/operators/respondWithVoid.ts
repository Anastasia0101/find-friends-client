import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export const respondWithVoid = (source: Observable<unknown>): Observable<void> => source.pipe(map(() => void 0));
