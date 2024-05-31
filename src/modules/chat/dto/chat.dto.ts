import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetUserByUserIdDto {
  @ApiProperty()
  @IsNotEmpty()
  user_id: string;
}

export class WebsocketChatDataDto {
  @ApiProperty()
  @IsNotEmpty()
  from: string;

  @ApiProperty()
  @IsNotEmpty()
  to: string;

  @ApiProperty()
  @IsNotEmpty()
  message: string;
}
