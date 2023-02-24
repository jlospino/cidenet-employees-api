import { IsNotEmpty, IsOptional, IsString, Matches, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateEmployeeDto {

    @IsString({ message: "El campo Primer Nombre debe de ser un String" })
    @IsNotEmpty({ message: "El campo Primer Nombre no puede estar vacío" })
    @MaxLength(20, {message: "El campo Primer Nombre tiene un máximo de 20 carácteres"})
    @Matches( /^[a-z\s]+$/i, { message: 'Formato de texto no valido' })
    @ApiProperty({ example: 'Juanito'})
    readonly firstName: string;

    @IsString({ message: "El campo Segundo Nombre debe de ser un String" })
    @IsNotEmpty({ message: "El campo Segundo Nombre no puede estar vacío" })
    @MaxLength(20, {message: "El campo Segundo Nombre tiene un máximo de 20 carácteres"})
    @Matches( /^[a-z\s]+$/i, { message: 'Formato de texto no valido' })
    @ApiProperty({ example: 'Pepito' })
    readonly secondName: string;

    @IsString({ message: "El campo Apellido debe de ser un String" })
    @IsNotEmpty({ message: "El campo Apellido no puede estar vacío" })
    @MaxLength(20, {message: "El campo Apellido tiene un máximo de 20 carácteres"})
    @Matches( /^[a-z\s]+$/i, { message: 'Formato de texto no valido' })
    @ApiProperty({ example: 'Martinez' })
    readonly lastName: string;

    @IsString({ message: "El campo Pais debe de ser un String" })
    @MaxLength(20, {message: "El campo Otro Nombre tiene un máximo de 20 carácteres"})
    @IsOptional()
    @ApiProperty({ example: 'Scherman' })
    readonly otherName: string;

    @IsString({ message: "El campo Pais debe de ser un String" })
    @IsNotEmpty({ message: "El campo Pais no puede estar vacío" })
    @ApiProperty({ example: '63f58cd03ab3bd023e47b213' })
    readonly country: string;

    @IsString({ message: "El campo Tipo de Documento debe de ser un String" })
    @IsNotEmpty({ message: "El campo Tipo de Documento no puede estar vacío" })
    @ApiProperty({ example: '63f591943ab3bd023e47b218' })
    readonly documentType: string;

    @IsString()
    @IsNotEmpty({ message: "El campo Documento no puede estar vacío" })
    @MaxLength(20, {message: "El campo Documento tiene un máximo de 20 carácteres"})
    @Matches('[a-z/A-Z/0-9/-]')
    @ApiProperty({ example: '1023567897' })
    readonly documentNumber: string;

    @IsDateString()
    @IsNotEmpty({ message: "El campo Fecha de Ingreso no puede estar vacío" })
    @ApiProperty({ example: '2023-01-18 10:11:00' })
    readonly incomeDate: Date;

    @IsString({ message: "El campo Area debe de ser un String" })
    @IsNotEmpty({ message: "El campo Area no puede estar vacío" })
    @ApiProperty({ example: '63f592233ab3bd023e47b21a' })
    readonly area: string;

}
