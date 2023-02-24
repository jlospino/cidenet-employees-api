import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, DocumentDocument } from './schemas/document.schema';


@Injectable()
export class DocumentsService {
 
  constructor(@InjectModel(Document.name) private documentModel: Model<DocumentDocument>) {}

  async findAll(): Promise<Document[]> {
    return this.documentModel.find().exec();
  }

  async findOne(id: number): Promise<Document> {
    return this.documentModel.findOne({_id: id}).exec();
  }

}
