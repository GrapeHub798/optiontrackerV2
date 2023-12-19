import { UnauthorizedException } from '@nestjs/common';

import { UserHelpers } from './UserHelpers';

describe('UserHelpers', () => {
  describe('getUserIdFromRequest', () => {
    it('should return the user id from the request', () => {
      const mockReq = { user: { userId: 10 } };
      expect(UserHelpers.getUserIdFromRequest(mockReq)).toBe(10);
    });

    it('should throw UnauthorizedException when user id is missing', () => {
      const mockReq1 = { user: null };
      const mockReq2 = { user: { userId: null } };
      expect(() => UserHelpers.getUserIdFromRequest(mockReq1)).toThrow(
        UnauthorizedException,
      );
      expect(() => UserHelpers.getUserIdFromRequest(mockReq2)).toThrow(
        UnauthorizedException,
      );
    });
  });
});
