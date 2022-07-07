import { readdir, unlink, writeFile } from "fs/promises";
import path from "path";

const UploadsController = {
  _imagePath: "/uploads/images",

  uploadImage: async function (request, reply) {
    try {
      const data = await request.file();
      
      const currentFiles = await readdir(path.join(path.resolve(), UploadsController._imagePath));

      if (currentFiles.includes(data.filename))
        throw new Error(
          "Фаил с таким именем уже существует. Удалите существующий фаил если хотите его перезаписать.",
        );

      const filePath = path.join(path.resolve(), UploadsController._imagePath, data.filename);
      
      await writeFile(filePath, data.file);

      return reply.send({ message: "Фаилы успешно загружен" });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteImage: async function (request, reply) {
    try {
      const { filename } = request.body;

      if (!filename) throw new Error("Не указанно имя фаила для удаления");

      const currentFiles = await readdir(path.join(path.resolve(), UploadsController._imagePath));

      if (!currentFiles.includes(filename))
        throw new Error("Такого фаила не сществует");

      await unlink(path.join(path.resolve(), UploadsController._imagePath, filename));

      return reply.code(200).send({ message: "Фаил успешно удален" });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getImages: async function (request, reply) {
    try {
      const fileNames = await readdir(path.join(path.resolve(), UploadsController._imagePath));

      const list = [];

      for (const file of fileNames) {
        list.push(path.join(UploadsController._imagePath, file));
      }

      return reply.code(200).send(list);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default UploadsController;
