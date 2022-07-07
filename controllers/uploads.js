import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import util from "util";
const pump = util.promisify(pipeline);
const fsPromises = fs.promises;

const UploadsController = {
  uploadFile: async function (request, reply) {
    try {
      const data = await request.file();

      const currentFiles = fs.readdirSync(
        path.join(path.resolve(), "/uploads/"),
      );

      if (currentFiles.includes(data.filename))
        throw new Error(
          "фаил с таким именем уже существует. Удалите существующий фаил если хотите его перезаписать.",
        );

      let filePath = path.join(path.resolve(), "/uploads/", data.filename);

      await pump(data.file, fs.createWriteStream(filePath));

      reply.send({ message: "Фаилы успешно загружен" });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteFile: async function (request, reply) {
    try {
      const { filename } = request.body;

      if (!filename) throw new Error("Не указанно имя фаила для удаления");

      const currentFiles = fs.readdirSync(
        path.join(path.resolve(), "/uploads/"),
      );

      if (!currentFiles.includes(filename))
        throw new Error("Такого фаила не сществует");

      await fsPromises.unlink(path.join(path.resolve(), "/uploads/", filename));

      reply.code(200).send({ message: "Фаил успешно удален" });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default UploadsController;
