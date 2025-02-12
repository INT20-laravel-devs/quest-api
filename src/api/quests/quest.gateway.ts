import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class QuestGateway {
  @WebSocketServer()
  private server: Server;

  private chatHistory = new Map<string, MessageDto[]>();

  @SubscribeMessage('join')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { questId: string },
  ) {
    if (client.rooms.has(body.questId)) {
      client.join(body.questId);
    } else {
      client.rooms.add(body.questId);
    }
    const history = this.chatHistory.get(body.questId);
    if (history) {
      client.emit('join', history);
    } else {
      this.chatHistory.set(body.questId, []);
      client.emit('join', []);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: MessageDto) {
    this.server.to(data.questId).emit('message', data);
    const history = this.chatHistory.get(data.questId);
    history.push(data);
  }

  @SubscribeMessage('leave')
  leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { questId: string },
  ) {
    client.rooms.delete(body.questId);
    if (this.server.sockets.adapter.rooms.get(body.questId)?.size === 0) {
      this.chatHistory.delete(body.questId);
    }
  }
}
