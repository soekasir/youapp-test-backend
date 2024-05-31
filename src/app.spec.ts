/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './modules/user/users.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/user/users.module';
import { ChatModule } from './modules/chat/chat.module';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './modules/chat/chat.gateway';

describe('AppModule', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DATABASE_URI),
        UsersModule,
        ChatModule,
        JwtModule.register({}),
      ],
      controllers: [],
      providers: [],
    }).compile();
  });

  describe('users', () => {
    const req : any ={
      user: { _id: '665a026d8450bf0fc644e2d2' },
    }
    
    
    it('should contain "berhasil login"', async () => {
      const usersController = app.get(UsersController);
      expect(
        await usersController.login({
          email: 'abcf@gmail.com',
          password: 'abcf1234',
        }),
      ).toMatchObject({ message: 'berhasil login' });
    }, 1000);


    it('should contain "berhasil mengambil data profile"', async () => {
      const usersController = app.get(UsersController);
      expect(
        await usersController.getProfile(req),
      ).toMatchObject({ message: 'berhasil mengambil data profile' });
    }, 1000);


    it('should contain "berhasil mengupdate profile"', async () => {
      const usersController = app.get(UsersController);
      expect(
        await usersController.updateProfile(req, {
          "displayName":"Abcdf"
        }),
      ).toMatchObject({ message: 'berhasil mengupdate profile' });
    }, 1000);

  });

  describe('chats', ()=>{
    
    it('should contain "berhasil mengambil data user"', async () => {
      const chatGateway = app.get(ChatGateway);
      expect(
        await chatGateway.getUserByUserId({ user_id: '665a026d8450bf0fc644e2d2' }),
      ).toMatchObject({ message: 'berhasil mengambil data user' });
    }, 1000);

  })

});
