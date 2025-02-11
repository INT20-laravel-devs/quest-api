import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskIsPublishedException extends HttpException {
  constructor() {
    super('Task is published', HttpStatus.FORBIDDEN);
  }
}
