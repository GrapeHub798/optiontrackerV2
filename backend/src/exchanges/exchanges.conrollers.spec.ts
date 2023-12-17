import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from '../guards/auth.guard';
import { Exchange } from './exchange.model';
import { ExchangesController } from './exchanges.controller';
import { ExchangesService } from './exchanges.service';

class MockExchangesService {
  getAll() {
    return new Promise(() => {});
  }
}

describe('ExchangesController', () => {
  let controller: ExchangesController;
  let service: ExchangesService;

  beforeEach(async () => {
    const mock_AuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangesController],
      providers: [
        { provide: ExchangesService, useClass: MockExchangesService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_AuthGuard)
      .compile();

    controller = module.get<ExchangesController>(ExchangesController);
    service = module.get<ExchangesService>(ExchangesService);
  });

  // Test for 'getAll' method of 'ExchangesController'
  it('should return all exchanges', async () => {
    const result: Exchange[] = [];
    jest
      .spyOn(service, 'getAll')
      .mockImplementation(() => Promise.resolve(result));
    expect(await controller.getAll()).toBe(result);
  });
});
