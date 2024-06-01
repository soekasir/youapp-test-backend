import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/user/users.module';
import { AuthMiddleware } from './modules/user/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ChatModule } from './modules/chat/chat.module';

export const appModuleConfig = {
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
};

@Module(appModuleConfig)
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('api/login', 'api/register', 'api/docs')
      .forRoutes('*');
  }
}
