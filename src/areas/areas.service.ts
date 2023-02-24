import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area, AreaDocument } from './schemas/area.schema';

@Injectable()
export class AreasService {

  constructor(@InjectModel(Area.name) private areaModel: Model<AreaDocument>) {}

  async findAll(): Promise<Area[]> {
    return this.areaModel.find().exec();
  }

}
