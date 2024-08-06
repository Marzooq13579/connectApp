import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('message')
  handleMessage(
    client: Socket,
    payload: { sender: string; message: string },
  ): void {
    this.logger.log(
      `message recieved from client ${client}, sender ${payload.sender}, message: ${payload.message}`,
    );
    this.server.emit('message', payload);
  }

  afterInit(server: Server) {
    this.logger.log(`Web socket server Initialized ${server}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id} and args ${args}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Diconnected: ${client.id}`);
  }
}
