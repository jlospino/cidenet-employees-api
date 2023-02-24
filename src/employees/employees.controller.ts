import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CountriesService } from 'src/countries/countries.service';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@Controller('employees')
@ApiTags('Employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly countriesService: CountriesService
  ) { }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const email = await this.constructEmail(createEmployeeDto)
    const empleado = { ...createEmployeeDto, email };
    return await this.employeesService.create(empleado);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', MongoIdPipe) id: string) {
    return this.employeesService.findOne(id);
  }

  async constructEmail(employee: CreateEmployeeDto | UpdateEmployeeDto) {
    let { firstName, lastName, country } = employee;

    //Build the domain by country
    const countryEmploye = await this.countriesService.findOne(country);
    const domain = `cidenet.com.${countryEmploye.name === 'Colombia' ? 'co' : 'us'}`;

    //Build the email and validate if it exists
    let constructedEmail = `${firstName.replace(/ /g, "")}.${lastName.replace(/ /g, "")}`.toLowerCase();
    const employeesEmail = await this.employeesService.findByEmail(constructedEmail);

    if (employeesEmail.length) {
      constructedEmail = `${constructedEmail}.${employeesEmail.length + 1}`;
    }

    return `${constructedEmail}@${domain}`;
  }

  @Patch(':id')
  async update(@Param('id', MongoIdPipe) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    let empleadoBody = {};
    let currentDate = new Date();
    //Find One
    const employee = await this.findOne(id);

    //Check if employee information changed
    if (employee.firstName !== updateEmployeeDto.firstName
      || employee.lastName !== updateEmployeeDto.lastName
    ) {
      const email = await this.constructEmail(updateEmployeeDto)
      empleadoBody = {...updateEmployeeDto, email, updated_at: currentDate};
    }else{
      empleadoBody = {...updateEmployeeDto, updated_at: currentDate};
    }
    
    return this.employeesService.update(id, empleadoBody);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.employeesService.remove(id);
  }
}
