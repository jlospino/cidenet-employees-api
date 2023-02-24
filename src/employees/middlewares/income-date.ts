import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as moment from 'moment';

@Injectable()
export class IncomeDateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const incomeDate = moment(req.body.incomeDate);
    const currentDate = moment();

    if( incomeDate.format("MM-DD-YYYY") > currentDate.format("MM-DD-YYYY") ) {
        throw new BadRequestException('La fecha de ingreso no puede ser superior a la fecha actual');
    }

    if( currentDate.diff(incomeDate, 'days') > 30 ) {
        throw new BadRequestException('La fecha de ingreso no puede ser menor a 30 días');
    }

    next();
  }
}
