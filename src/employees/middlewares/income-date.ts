import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IncomeDateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const incomeDate = new Date(req.body.incomeDate);
    const currentDate = new Date();

    if( incomeDate > currentDate ) {
        throw new BadRequestException('La fecha de ingreso no puede ser superior a la fecha actual');
    }

    const days = currentDate.getTime() - incomeDate.getTime();
    const cantDays = Math.round(days/ (1000*60*60*24));
    if( cantDays > 30 ) {
        throw new BadRequestException('La fecha de ingreso no puede ser menor a 30 días');
    }

    next();
  }
}
