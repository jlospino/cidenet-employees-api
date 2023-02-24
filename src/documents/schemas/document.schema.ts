import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DocumentDocument = HydratedDocument<Document>;

@Schema()
export class Document {
    @Prop({ required: true })
    name: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
