import prisma from '@/utils/prisma-client';
import jwt from 'jsonwebtoken';
class TokenService {
  async generateToken<T>(payload:T) {
    const accessToken = await jwt.sign({userId: payload}, process.env['JWT_SECRET'] as string, { expiresIn: '1m'});
    const refreshToken = await jwt.sign({userId: payload}, process.env['REFRESH_JWT_SECRET'] as string, { expiresIn: '7d'});
    return {
      accessToken,
      refreshToken
    };
  }
  async saveToken(userId:string, refreshToken:string) {
    const tokenData = await prisma.token.findFirst({
      where: {
        userId
      }
    });
    if(tokenData) {
      const newRefreshToken = await prisma.token.update({
        where: {userId},
        data: {
          refreshToken
        }
      });
      return newRefreshToken;
    }
    const newRefreshToken = await prisma.token.create({
      data: {
        userId,
        refreshToken
      }
    });
    return newRefreshToken;
  }
}
export default new TokenService();