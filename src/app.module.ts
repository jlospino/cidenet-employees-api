import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesModule } from './employees/employees.module';
import { CountriesModule } from './countries/countries.module';
import { DocumentsModule } from './documents/documents.module';
import { AreasModule } from './areas/areas.module';

@Module({
  imports: [
    EmployeesModule,
    MongooseModule.forRoot('mongodb+srv://user_cidenet_employees:aDkYyozzVgzxm4BY@cluster0.nl2osho.mongodb.net/cidenet-employees-db'),
    CountriesModule,
    DocumentsModule,
    AreasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
