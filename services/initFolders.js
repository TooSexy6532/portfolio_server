import { mkdir, readdir } from "fs/promises";
import path from "path";

export default async function () {
  const dir = path.resolve();
  const uploadPath = path.join(dir, "/uploads");
  const imagesPath = path.join(dir, "/uploads", "/images");

  try {
    await readdir(uploadPath);
  } catch (error) {
    await mkdir(uploadPath);
  }

  try {
    await readdir(imagesPath);
  } catch (error) {
    await mkdir(imagesPath);
  }
}
