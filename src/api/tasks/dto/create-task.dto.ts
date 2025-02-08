import { $Enums } from '@prisma/client';

export class CreateTextTaskDto {
  questId: string;

  order: number;

  points: number;

  type: $Enums.TaskType;

  title: string;

  description: string;
}

export class CreateImageTaskDto extends CreateTextTaskDto {
  coordinate: CreateCoordinateDto;
}

export class CreateCoordinateDto {
  x: number;
  y: number;
  imageLink?: string;
}
