import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { useResponse } from 'src/helpers/hooks';
import { Chat } from 'src/schemas/Chat.schema';
import { User } from 'src/schemas/User.schema';
import { GetUserByUserIdDto, WebsocketChatDataDto } from './dto/chat.dto';

@WebSocketGateway(80, { namespace: 'chat' })
@Controller('api/chat')
export class ChatGateway {
  @WebSocketServer()
  server;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
  ) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: WebsocketChatDataDto) {
    const chat = new this.chatModel({
      ...data,
      timestamp: new Date().toISOString(),
    });
    await chat.save();
    this.server.emit('message', data);
  }

  @Post('getUserByUserId')
  @ApiTags('chat')
  async getUserByUserId(@Body() body: GetUserByUserIdDto) {
    let user: any = await this.userModel.findOne({ _id: body.user_id });
    user = {
      email: user.email,
      username: user.username,
      user_id: user._id,
    };
    return useResponse(true, 'berhasil mengambil data user', user);
  }
}
