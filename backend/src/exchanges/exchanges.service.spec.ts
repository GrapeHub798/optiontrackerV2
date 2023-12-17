import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { from } from 'rxjs';

import { EodhdService } from '../eodhdapi/eodhd.service';
import { ExchangeCode } from '../stocks/exchangeCode.model';
import { Exchange } from './exchange.model';
import { ExchangesService } from './exchanges.service';

jest.mock('../eodhdapi/eodhd.service');

describe('ExchangesService', () => {
  let service: ExchangesService;
  let mockModel: Partial<Record<keyof typeof Exchange, jest.Mock>>;
  let mockEodhdService: jest.Mocked<EodhdService>;
  let model: typeof Exchange;

  beforeEach(async () => {
    mockModel = {
      bulkCreate: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangesService,
        {
          provide: getModelToken(Exchange),
          useValue: mockModel,
        },
        EodhdService,
      ],
    }).compile();

    service = module.get<ExchangesService>(ExchangesService);
    model = module.get<typeof Exchange>(getModelToken(Exchange));
    //mockEodhdService = module.get<EodhdService>(EodhdService);
  });

  afterEach(async () => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should retrieve all exchanges with code US', async () => {
      const expectedData: Array<Partial<Exchange>> = [
        {
          code: 'US',
          country: 'United States',
          currency: 'USD',
          name: 'NYSE',
          operatingMic: 'XNYS',
        },
      ];

      mockModel.findAll.mockResolvedValue(expectedData);

      const actualData = await service.getAll();

      expect(mockModel.findAll).toHaveBeenCalledWith({
        where: {
          code: 'US',
        },
      });
      expect(actualData).toEqual(expectedData);
    });

    it('should throw an error when getAll fail', async () => {
      mockModel.findAll.mockRejectedValue(new Error('Fake Error'));

      await expect(service.getAll()).rejects.toThrowError(
        new InternalServerErrorException('Fake Error'),
      );
    });
  });

  describe('getSingleExchange', () => {
    it('should successfully get one exchange', async () => {
      const exchangeCodeParam: ExchangeCode = { exchangeCode: 'US' };
      const expectedData: Partial<Exchange> = {
        code: 'US',
        country: 'United States',
        currency: 'USD',
        name: 'NYSE',
        operatingMic: 'XNYS',
      };

      mockModel.findOne.mockResolvedValue(expectedData);

      const actualData = await service.getSingleExchange(exchangeCodeParam);

      expect(mockModel.findOne).toHaveBeenCalledWith({
        where: {
          code: exchangeCodeParam.exchangeCode,
        },
      });
      expect(actualData).toEqual(expectedData);
    });

    it('should throw an error when getOne fail', async () => {
      const exchangeCodeParam: ExchangeCode = { exchangeCode: 'US' };
      mockModel.findOne.mockRejectedValue(new Error('Fake Error'));

      await expect(
        service.getSingleExchange(exchangeCodeParam),
      ).rejects.toThrowError(new InternalServerErrorException('Fake Error'));
    });
  });

  describe('refreshExchanges', () => {
    it('should call the EodhdService getAllExchanges method', async (done) => {
      const data = [];
      const eodhdServiceSpy = jest
        .spyOn(mockEodhdService, 'getAllExchanges')
        .mockReturnValue(from(data));
      (await service.refreshExchanges()).subscribe((result) => {
        expect(eodhdServiceSpy).toHaveBeenCalled();
        expect(result).toBe(true);
        done();
      });
    });

    it('should handle errors from the EodhdService getAllExchanges method', async (done) => {
      const eodhdServiceSpy = jest
        .spyOn(mockEodhdService, 'getAllExchanges')
        .mockImplementation(() => {
          throw new Error('Test error');
        });
      (await service.refreshExchanges()).subscribe({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error: (error) => {
          expect(eodhdServiceSpy).toHaveBeenCalled();
          done();
        },
      });
    });
  });
});
