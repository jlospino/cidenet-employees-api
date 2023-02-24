import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesService } from 'src/countries/countries.service';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { Area, AreaSchema } from 'src/areas/schemas/area.schema';
import { Document, DocumentSchema } from 'src/documents/schemas/document.schema';
import { IncomeDateMiddleware } from './middlewares/income-date';
import { Country, CountrySchema } from 'src/countries/schemas/country.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Country.name, schema: CountrySchema },
      { name: Area.name, schema: AreaSchema },
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, CountriesService]
})
export class EmployeesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IncomeDateMiddleware)
      .forRoutes(
        { path: 'employees', method: RequestMethod.POST },
        { path: 'employees/:id', method: RequestMethod.PATCH }
      );
  }
}
