import { JWTPayload } from '@/types/models';
import prisma from '@/utils/prisma-client';
import jwt from 'jsonwebtoken';
class TokenService {
  async generateToken(payload:JWTPayload) {
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
  async removeToken(refreshToken: string) {
    const token = await prisma.token.findFirst({
      where: {
        refreshToken
      }
    });
    if(token ) {
      const deletedToken = await prisma.token.delete({
        where: {
          userId: token.userId
        }
      });
      return deletedToken;
    }
  }
  async validateAccessToken(token: string):Promise<JWTPayload | null> {
    try {
      const payload = await jwt.verify(token, process.env['JWT_SECRET'] as string) as JWTPayload;
      return payload;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async validateRefreshToken(token: string):Promise<JWTPayload | null> {
    try {
      const payload = await jwt.verify(token, process.env['REFRESH_JWT_SECRET'] as string) as JWTPayload;
      return payload;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
export default new TokenService();