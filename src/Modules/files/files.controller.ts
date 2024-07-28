import { Controller, Param, Put, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../Auth/Guards/Auth.guard';
import { ErrorManager } from '../../Utils/ErrorManager';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Files")
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualiza la imagen de un producto pasado por ID'})
  @Put('uploadImage/:id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiInternalServerErrorResponse({description: "Error al intentar actualizar la imagen del producto"})
  @ApiNotFoundResponse({description:"El producto que intenta actualizar no existe"})

  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: `Debe subir el Archivo de Imagen`, schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },})
  updateImage(@Param('id', ParseUUIDPipe) id: string, @UploadedFile(
        new ParseFilePipe({
          validators: [
              new MaxFileSizeValidator ({
                  maxSize: 2000000,
                  message: "El Archivo debe ser menor a 200Kb",
              }),
              new FileTypeValidator({
                  fileType: /(.jpg|.jpeg|.png|.webp)$/,
              })
            ]
          })
    ) file: Express.Multer.File) {

    return ErrorManager ({
          functionTry:() => this.filesService.update(id, file), 
          message: "Error al intentar actualizar la imagen del producto"})
  }

}
