import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if( !isMongoId(value) ) {
      throw new BadRequestException(`${value} no es un id valido`);
    }
    return value;
  }
}
