import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Country } from 'src/countries/schemas/country.schema';
import { Area } from 'src/areas/schemas/area.schema';
import { Document } from 'src/documents/schemas/document.schema';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
    @Prop({ required: true, maxlength: 20 })
    firstName: string;

    @Prop({ required: true, maxlength: 20 })
    secondName: string;

    @Prop({ required: true, maxlength: 20 })
    lastName: string;

    @Prop({ maxlength: 20 })
    otherName: string;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Country' })
    country: Country;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Document' })
    documentType: Document;

    @Prop({ required: true, unique: true })
    documentNumber: string;

    @Prop({ unique: true, maxlength: 300 })
    email: string;

    @Prop({ required: true })
    incomeDate: Date;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Area' })
    area: Area;

    @Prop({ required: true, default: true })
    state: string;

    @Prop({ required: true, default: Date.now })
    created_at: Date;

    @Prop()
    updated_at: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);