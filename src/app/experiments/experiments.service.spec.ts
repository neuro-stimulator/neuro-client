import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { takeLast, tap } from 'rxjs/operators';
import { NGXLogger} from 'ngx-logger';
import { NGXLoggerMock} from 'ngx-logger/testing';

import { createEmptyExperiment, Experiment, MessageCodes, ResponseObject } from '@stechy1/diplomka-share';

import { ExperimentsService } from './experiments.service';

function prepareMockExperiments(): Experiment[] {
  const exp1 = createEmptyExperiment();
  exp1.id = 1;
  exp1.name = 'exp1';
  const exp2 = createEmptyExperiment();
  exp2.id = 1;
  exp2.name = 'exp2';
  const exp3 = createEmptyExperiment();
  exp3.id = 1;
  exp3.name = 'exp3';
  const exp4 = createEmptyExperiment();
  exp4.id = 1;
  exp4.name = 'exp4';

  return [exp1, exp2, exp3, exp4];
}

describe('ExperimentsService', () => {

  let httpClient: HttpClient;
  let service: ExperimentsService;
  let httpTestingController: HttpTestingController;
  let mockExperiments: Experiment[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ExperimentsService,
        {provide: NGXLogger, useClass: NGXLoggerMock},
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ExperimentsService);
    mockExperiments = prepareMockExperiments();
  });

  it('should retrieve all experiments', () => {
    // Přihlásím se k odběru experimentů
    service.records
           .pipe(
             // Zajímá mě pouze 3. aktualizace
             takeLast(3),
             tap(records => {
               expect(records).toBe(mockExperiments);
             }));
    // Zavolám získání všech experimentů
    expectAsync(service.all()).toBeResolvedTo(mockExperiments.length);

    // Očekávám jedno HTTP volání
    const req: TestRequest = httpTestingController.expectOne(ExperimentsService.BASE_API_URL);
    // Požadavek bude typu GET
    expect(req.request.method).toEqual('GET');
    // V požadavku nebude žádné tělo
    expect(req.request.body).toBeNull();
    // Přípravím si odpověď s namockovanými experimenty
    const resp: ResponseObject<Experiment[]> = {data: mockExperiments};
    // Ručně odešlu odpověď
    req.flush(resp);
  });

  it('should retrieve all experiments without http call', () => {
    // Vložím do služby již existující data
    service.replaceData(mockExperiments);
    // Zavolám získání všech experimentů
    expectAsync(service.all()).toBeResolvedTo(mockExperiments.length);
    // Neočekávám žádné HTTP volání
    httpTestingController.expectNone(ExperimentsService.BASE_API_URL);
  });

  describe('experiment by id', () => {

    it('should find an experiment by id', () => {
      // Připravím si experiment, který budu vyhledávat
      const experiment: Experiment = mockExperiments[1];
      // Výsledek dotazu má být hledaný experiment
      expectAsync(service.one(experiment.id)).toBeResolvedTo(experiment);

      // Založím nový požadavek
      const req: TestRequest = httpTestingController.expectOne(`${ExperimentsService.BASE_API_URL}/${experiment.id}`);
      // Požadavek bude typu GET
      expect(req.request.method).toEqual('GET');
      // V požadavku nebude žádné tělo
      expect(req.request.body).toBeNull();
      // Přípravím si odpověď s namockovaným experimentem
      const resp: ResponseObject<Experiment> = {data: experiment};
      // Ručně odešlu odpověď
      req.flush(resp);
    });

    it('should return null when not found', () => {
      const id = 9;
      expectAsync(service.one(id)).toBeRejectedWithError();

      // Založím nový požadavek
      const req: TestRequest = httpTestingController.expectOne(`${ExperimentsService.BASE_API_URL}/${id}`);
      // Požadavek bude typu GET
      expect(req.request.method).toEqual('GET');
      // V požadavku nebude žádné tělo
      expect(req.request.body).toBeNull();
      // Přípravím si odpověď s namockovaným experimentem
      const resp: ResponseObject<Experiment> = { message: { code: MessageCodes.CODE_ERROR_EXPERIMENT_NOT_FOUND, params: { id } }};
      // Ručně odešlu odpověď
      req.flush(resp);
    });

    afterEach(() => {
      // Po každém testu se ujistím, že nejsou ve frontě žádné další požadavky
      httpTestingController.verify();
    });
  });

  it('should insert new experiment', () => {
    // Založím novou instanci experimentu, kterou budu vkládat do service
    const experiment: Experiment = createEmptyExperiment();
    // Ujistím se, že ID expeirmentu není definováno
    expect(experiment.id).toBeUndefined();
    // Nadefinuji experimentu název, protože je to jediný povinný atribut
    experiment.name = 'test';
    // Rovnou musím založit instanci vloženého experimentu
    const responseExperiment: Experiment = {...experiment};
    // Tento experiment už ale má definované ID
    responseExperiment.id = 1;
    // Vložím experiment do service, kde porovnám návratovou hodnotu s očekávanou
    expectAsync(service.insert(experiment)).toBeResolvedTo(responseExperiment);

    // Založím nový požadavek
    const req: TestRequest = httpTestingController.expectOne(`${ExperimentsService.BASE_API_URL}`);
    // Požadavek bude typu POST
    expect(req.request.method).toEqual('POST');
    // V těle požadavku bude vkládaný experiment
    expect(req.request.body).toBe(experiment);
    // Přípravím si odpověď s namockovaným experimentem
    const resp: ResponseObject<Experiment> = { data: responseExperiment };
    // Ručně odešlu odpověď
    req.flush(resp);
  });

  it('should not insert new experiment - invalid name', () => {
    // Založím novou instanci experimentu, kterou budu vkládat do service
    const experiment: Experiment = createEmptyExperiment();
    // Ujistím se, že ID expeirmentu není definováno
    expect(experiment.id).toBeUndefined();
    // Rovnou musím založit instanci vloženého experimentu
    const responseExperiment: Experiment = {...experiment};
    // Tento experiment už ale má definované ID
    responseExperiment.id = 1;
    // Vložím experiment do service, kde očekávám chybu
    expectAsync(service.insert(experiment)).toBeRejectedWithError();

    // Založím nový požadavek
    const req: TestRequest = httpTestingController.expectOne(`${ExperimentsService.BASE_API_URL}`);
    // Požadavek bude typu GET
    expect(req.request.method).toEqual('POST');
    // V požadavku nebude žádné tělo
    expect(req.request.body).toBe(experiment);
    // Přípravím si odpověď s namockovaným experimentem
    const resp: ResponseObject<Experiment> = { message: { code: -1 } };
    // Ručně odešlu odpověď
    req.flush(resp);
  });

  it('should update experiment', () => {
    let expectedRecordIndex = 0;

    // Založím originální experiment
    const originalExperiment: Experiment = createEmptyExperiment();
    // Nastavím experimentu základní atributy, aby to vypadalo, že již byl uložen
    originalExperiment.id = 1;
    originalExperiment.name = 'original';
    // Založím hlubokou kopii experimentu, který budu aktualizovat
    const updatedExperiment = {...originalExperiment};
    updatedExperiment.name = 'updated';
    service.records.subscribe((experiments: Experiment[]) => {
      switch (expectedRecordIndex++) {
        case 2: {
          expect(experiments[0]).toBe(originalExperiment);
          break;
        }
        case 3: {
          expect(experiments[0]).toBe(updatedExperiment);
          break;
        }
      }
    });
    // Využiji testovací funkci pro nastavení záznamů ve službě
    service.replaceData([originalExperiment]);
    // Ujistím se, že jsem opravdu udělal změnu
    expect(originalExperiment.name).not.toBe(updatedExperiment.name);
    // Aktualizuji experiment pomocí service
    expectAsync(service.update(updatedExperiment)).toBeResolvedTo(updatedExperiment);

    // Založím nový požadavek
    const req: TestRequest = httpTestingController.expectOne(`${ExperimentsService.BASE_API_URL}`);
    // Požadavek bude typu PATCH
    expect(req.request.method).toEqual('PATCH');
    // V těle požadavku bude aktualizovaný experiment
    expect(req.request.body).toBe(updatedExperiment);
    // Přípravím si odpověď s namockovaným experimentem
    const resp: ResponseObject<Experiment> = { data: updatedExperiment };
    // Ručně odešlu odpověď
    req.flush(resp);
  });

  it('should not update experiment - invalid id', () => {
    let expectedRecordIndex = 0;

    // Založím originální experiment
    const originalExperiment: Experiment = createEmptyExperiment();
    // Nastavím experimentu základní atributy, aby to vypadalo, že již byl uložen
    originalExperiment.id = 1;
    originalExperiment.name = 'original';
    // Založím hlubokou kopii experimentu, který budu aktualizovat
    const updatedExperiment = {...originalExperiment};
    updatedExperiment.id = 2;
    updatedExperiment.name = 'updated';
    service.records.subscribe((experiments: Experiment[]) => {
      switch (expectedRecordIndex++) {
        case 2: {
          expect(experiments[0]).toBe(originalExperiment);
          break;
        }
        case 3: {
          expect(experiments[0]).toBe(originalExperiment);
          break;
        }
      }
    });
    // Využiji testovací funkci pro nastavení záznamů ve službě
    service.replaceData([originalExperiment]);
    // Ujistím se, že jsem opravdu udělal změnu
    expect(originalExperiment.name).not.toBe(updatedExperiment.name);
    // Aktualizuji experiment pomocí service
    expectAsync(service.update(updatedExperiment)).toBeResolvedTo(updatedExperiment);

    // Založím nový požadavek
    const req: TestRequest = httpTestingController.expectOne(`${ExperimentsService.BASE_API_URL}`);
    // Požadavek bude typu PATCH
    expect(req.request.method).toEqual('PATCH');
    // V těle požadavku bude aktualizovaný experiment
    expect(req.request.body).toBe(updatedExperiment);
    // Přípravím si odpověď s namockovaným experimentem
    const resp: ResponseObject<Experiment> = { message: { code: MessageCodes.CODE_ERROR_EXPERIMENT_NOT_FOUND } };
    // Ručně odešlu odpověď
    req.flush(resp);
  });

  it('should delete experiment', () => {
      const expectedRecordLengths = [0, 1, 0];
      let expectedRecordIndex = 0;
      service.records.subscribe((experiments: Experiment[]) => {
        expect(experiments.length).toBe(expectedRecordLengths[expectedRecordIndex++]);
      });
      // Připravím si experiment, který budu mazat
      const experiment: Experiment = createEmptyExperiment();
      experiment.id = 1;
      experiment.name = 'for-delete';
      // Využiji testovací funkci pro nastavení záznamů ve službě
      service.replaceData([experiment]);
      expectAsync(service.delete(experiment.id)).toBeResolvedTo(experiment);

      // Založím nový požadavek
      const req: TestRequest = httpTestingController.expectOne(`${ExperimentsService.BASE_API_URL}/${experiment.id}`);
      // Požadavek bude typu PATCH
      expect(req.request.method).toEqual('DELETE');
      // V požadavku není žádné tělo
      expect(req.request.body).toBeNull();
      // Přípravím si odpověď s namockovaným experimentem
      const resp: ResponseObject<Experiment> = { data: experiment };
      // Ručně odešlu odpověď
      req.flush(resp);
    });

  it('should not delete experiment - invalid id', () => {
    const expectedRecordLengths = [0, 1, 1];
    let expectedRecordIndex = 0;
    service.records.subscribe((experiments: Experiment[]) => {
      expect(experiments.length).toBe(expectedRecordLengths[expectedRecordIndex++]);
    });
    // Připravím si experiment, který budu mazat
    const experiment: Experiment = createEmptyExperiment();
    experiment.id = 1;
    experiment.name = 'for-delete';
    // Využiji testovací funkci pro nastavení záznamů ve službě
    service.replaceData([experiment]);
    // Smažu experiment s neexistujícím ID
    expectAsync(service.delete(2)).toBeRejectedWithError();

    // Založím nový požadavek
    const req: TestRequest = httpTestingController.expectOne(`${ExperimentsService.BASE_API_URL}/${2}`);
    // Požadavek bude typu PATCH
    expect(req.request.method).toEqual('DELETE');
    // V požadavku není žádné tělo
    expect(req.request.body).toBeNull();
    // Přípravím si odpověď s namockovaným experimentem
    const resp: ResponseObject<Experiment> = { message: { code: MessageCodes.CODE_ERROR_EXPERIMENT_NOT_FOUND} };
    // Ručně odešlu odpověď
    req.flush(resp);
  });

  afterEach(() => {
    // Po každém testu se ujistím, že nejsou ve frontě žádné další požadavky
    httpTestingController.verify();
  });

});
