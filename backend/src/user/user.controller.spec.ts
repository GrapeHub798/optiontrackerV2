import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserLogin } from './userLogin.model';
import { UserWithJWTModel } from './userWithJWT.model';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const userServiceMock = {
      login: jest.fn(),
      register: jest.fn(),
    };

    const UserModelMock = {};
    const jwtServiceMock = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: 'UserModel',
          useValue: UserModelMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('#create', () => {
    it('should register a User and return a UserWithJWTModel', async () => {
      const registerResult = new UserWithJWTModel();
      const userLogin = new UserLogin();
      jest.spyOn(userService, 'register').mockResolvedValue(registerResult);

      const result = await userController.create(userLogin);

      expect(result).toBe(registerResult);
      expect(userService.register).toHaveBeenCalledWith(userLogin);
    });
  });

  describe('#login', () => {
    it('should login a User and return a UserWithJWTModel', async () => {
      const loginResult = new UserWithJWTModel();
      const userLogin = new UserLogin();
      jest.spyOn(userService, 'login').mockResolvedValue(loginResult);

      const result = await userController.login(userLogin);

      expect(result).toBe(loginResult);
      expect(userService.login).toHaveBeenCalledWith(userLogin);
    });
  });
});
