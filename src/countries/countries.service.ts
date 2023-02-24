import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './schemas/country.schema';
@Injectable()
export class CountriesService {
  constructor(@InjectModel(Country.name) private countryModel: Model<CountryDocument>) {}

  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }

  async findOne(id: string): Promise<Country> {
    return this.countryModel.findOne({_id: id}).exec();
  }
  
}
