import {
  Body,
  Controller,
  Get,
  Injectable,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Injectable()
@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}
  @Get()
  listAllMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    console.log(id);
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not found!');
    }
    return message;
  }
}
