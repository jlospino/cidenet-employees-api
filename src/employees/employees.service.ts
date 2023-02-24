import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {

  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { documentNumber, documentType } = createEmployeeDto;
    const employee = await this.findByDocument(documentNumber, documentType);
    if( employee ) throw new BadRequestException(`Ya existe un empleado con el documento: ${ documentNumber }`);

    return await this.employeeModel.create(createEmployeeDto);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find()
    .populate("country")
    .populate("area")
    .populate("documentType")
    .exec();
  }

  async findOne(id: string): Promise<Employee> {
    return this.employeeModel.findOne({_id: id})
    .populate("country")
    .populate("area")
    .populate("documentType")
    .exec();
  }

  async findByDocument(document: string, type: string): Promise<Employee> {
    const employee = this.employeeModel.findOne({ documentNumber: document, documentType: type }).exec();
    if( !employee ) throw new NotFoundException(`Empleado con documento: ${ document } no encontrado`)
    
    return employee;
  }

  async findByEmail(email: string): Promise<Employee[]> {
    const employees = this.employeeModel.find({ email: { $regex: email } }).exec();
    return employees;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    return this.employeeModel.findOneAndUpdate({ _id: id }, updateEmployeeDto);
  }

  async remove(id: string) {
    return this.employeeModel.findByIdAndRemove({ _id: id }).exec();
  }
}
