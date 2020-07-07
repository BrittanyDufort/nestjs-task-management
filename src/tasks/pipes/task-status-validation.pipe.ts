import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

  transform(value: string): string {
    console.log('value', value);
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status.`);
    }

    return value;
  }

  private isStatusValid(status: string): boolean {
    return status in TaskStatus;
  }
}
