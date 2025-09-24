import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadSingle(file: Express.Multer.File) {
    try {
      if (!file) {
        return {
          message: 'Không tìm thấy file đầu vào!',
          data: null,
        };
      }

      const result = await new Promise<
        UploadApiResponse | UploadApiErrorResponse
      >((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'shop-hg-upload' },
          (
            errorUpload: UploadApiErrorResponse,
            responseUpload: UploadApiResponse,
          ) => {
            if (errorUpload) return reject(errorUpload);
            if (!responseUpload)
              return reject(
                new Error(
                  'Upload thất bại! Không có dữ liệu trả về từ Cloudinary',
                ),
              );
            resolve(responseUpload);
          },
        );
        stream.end(file.buffer);
      });

      return {
        message: 'Upload thành công!',
        data: result?.secure_url,
      };
    } catch (error) {
      console.log('Error', error);

      return {
        message: 'Upload thất bại!',
        data: null,
      };
    }
  }

  async uploadMultiple(files: Express.Multer.File[]) {
    try {
      if (files.length == 0) {
        return {
          message: 'Không tìm thấy file đầu vào!',
          data: null,
        };
      }

      const results = await Promise.all(
        files.map(
          (file) =>
            new Promise<UploadApiResponse | UploadApiErrorResponse>(
              (resolve, reject) => {
                cloudinary.uploader
                  .upload_stream(
                    { folder: 'shop-hg-upload' },
                    (
                      errorUpload: UploadApiErrorResponse,
                      responseUpload: UploadApiResponse,
                    ) => {
                      if (errorUpload) {
                        return reject(errorUpload);
                      }
                      if (!responseUpload) {
                        return reject(
                          new Error(
                            'Upload thất bại! Không có dữ liệu trả về từ Cloudinary',
                          ),
                        );
                      }
                      resolve(responseUpload);
                    },
                  )
                  .end(file.buffer);
              },
            ),
        ),
      );

      return {
        message: 'Upload thành công!',
        data: results?.map((v) => v?.secure_url),
      };
    } catch (error) {
      console.log('Error', error);

      return {
        message: 'Upload thất bại!',
        data: null,
      };
    }
  }
}
