import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './../../schemas/Chat.schema';
import { ChatGateway } from './chat.gateway';
import { User, UserSchema } from './../../schemas/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [ChatGateway],
  controllers: [ChatGateway],
})
export class ChatModule {}
