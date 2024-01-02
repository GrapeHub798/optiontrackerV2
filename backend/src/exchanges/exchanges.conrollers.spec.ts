import { Test, TestingModule } from '@nestjs/testing';

import { Exchange } from './exchange.model';
import { ExchangesController } from './exchanges.controller';
import { ExchangesService } from './exchanges.service';

jest.mock('./exchanges.service');
jest.mock('../guards/auth.guard');

describe('ExchangesController', () => {
  let controller: ExchangesController;
  let service: ExchangesService;

  const req = {
    user: {
      userId: 'testUserId',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangesController],
      providers: [ExchangesService],
    }).compile();

    controller = module.get<ExchangesController>(ExchangesController);
    service = module.get<ExchangesService>(ExchangesService);
    jest.clearAllMocks();
  });

  it('should return all exchanges', async () => {
    const result: Exchange[] = [];
    jest
      .spyOn(service, 'getAll')
      .mockImplementation(() => Promise.resolve(result));
    expect(await controller.getAll()).toBe(result);
    expect(service.getAll).toHaveBeenCalledTimes(1);
  });

  it('should refresh and return exchanges', async () => {
    jest
      .spyOn(service, 'refreshExchanges')
      .mockResolvedValue(Promise.resolve(true));

    expect(await controller.getExchanges()).toBe(true);
    expect(service.refreshExchanges).toHaveBeenCalledTimes(1);
  });
});
