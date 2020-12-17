import patch from 'path';
import crypto from 'crypto';
import multer from 'multer';

// Salvar uploads no app
export default {
  storage: multer.diskStorage({
    destination: patch.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      // Criptografia do name do up, para evitar repetidas
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
