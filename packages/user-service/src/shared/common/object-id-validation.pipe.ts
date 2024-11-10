import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // check if value is string and matches the ObjectId pattern
    if (metadata.type === 'param' && typeof value === 'string' && value.match(/^[a-f\d]{24}$/i)) {
      return value;
    }

    throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);
  }
}