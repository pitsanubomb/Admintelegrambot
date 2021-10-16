import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/upload.util';

@Controller('upload')
export class UploadController {
  constructor() {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const res = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return res;
  }

  @Get('img/:imgpath')
  getImage(@Param('imgpath') image: string, @Res() res: any) {
    return res.sendFile(image, { root: './uploads/images' });
  }
}
