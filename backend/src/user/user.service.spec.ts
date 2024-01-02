import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/sequelize';
import { Test } from '@nestjs/testing';

import { User } from './user.model';
import { UserService } from './user.service';
import { UserWithJWTModel } from './userWithJWT.model';

describe('UserService', () => {
  let userService: UserService;
  let userModelMock: Partial<Record<keyof typeof User, jest.Mock>>;
  let jwtServiceMock: JwtService;
  let model: typeof User;

  beforeEach(async () => {
    userModelMock = {
      create: jest.fn(),
      findOne: jest.fn(),
    };
    jwtServiceMock = {
      signAsync: jest.fn().mockResolvedValue('mockToken'),
    } as unknown as JwtService;

    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: userModelMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    model = module.get<typeof User>(getModelToken(User));
  });

  describe('login', () => {
    it('should throw NotFoundException if user is not found', async () => {
      userModelMock.findOne.mockResolvedValue(null);

      await expect(
        userService.login({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if password is incorrect', async () => {
      const mockUser = { validatePassword: jest.fn().mockReturnValue(false) };
      userModelMock.findOne.mockResolvedValue(mockUser);

      await expect(
        userService.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('register', () => {
    it('should successfully register a new user and return UserWithJWTModel', async () => {
      const mockUserData = {
        email: 'newuser@example.com',
        password: 'password',
      };
      const mockUser = {
        ...mockUserData,
        save: jest.fn().mockResolvedValue(mockUserData),
        userId: 1,
      };

      userModelMock.create = jest.fn().mockResolvedValue(mockUser);

      const result = await userService.register(mockUserData);

      expect(result).toBeInstanceOf(UserWithJWTModel);
      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({
        userId: mockUser.userId,
      });
    });

    it('should throw InternalServerErrorException if user registration fails', async () => {
      const mockUserData = {
        email: 'newuser@example.com',
        password: 'password',
      };
      userModelMock.create = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));

      await expect(userService.register(mockUserData)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('generateUserWithJWT ', () => {
    it('should generate a JWT for a valid user', async () => {
      const mockUser = { userId: 1 };
      const token = 'generatedToken';
      jwtServiceMock.signAsync = jest.fn().mockResolvedValue(token);

      const result = await userService.generateUserWithJWT(
        mockUser as unknown as User,
      );

      expect(result).toBeInstanceOf(UserWithJWTModel);
      expect(result.jwt).toEqual(token);
    });
  });

  // Additional tests for generateUserWithJWT and register
});
