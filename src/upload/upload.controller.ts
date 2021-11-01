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
import {
  editFileName,
  imageFileFilter,
  videoFileFilter,
} from 'src/utils/upload.util';

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

  @Post('video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: editFileName,
      }),
      fileFilter: videoFileFilter,
    }),
  )
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return {
      originalname: file.originalname,
      filename: file.filename,
      size: file.size,
    };
  }

  @Post('media')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/media',
        filename: editFileName,
      }),
      fileFilter: videoFileFilter,
    }),
  )
  uploadMedia(@UploadedFile() file: Express.Multer.File) {
    return {
      originalname: file.originalname,
      filename: file.filename,
      size: file.size,
    };
  }

  @Get('img/:imgpath')
  getImage(@Param('imgpath') image: string, @Res() res: any) {
    return res.sendFile(image, { root: './uploads/images' });
  }

  @Get('video/:filepath')
  getFile(@Param('filepath') file: string, @Res() res: any) {
    return res.sendFile(file, { root: './uploads/videos' });
  }

  @Get('meida/:filepath')
  getMedia(@Param('filepath') file: string, @Res() res: any) {
    return res.sendFile(file, { root: './uploads/media' });
  }
}
