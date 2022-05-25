const uploads = async (req, res) => {
  const files = req.raw.files;

  console.log(files);

  let fileArr = [];

  for (let key in files) {
    fileArr.push({
      name: files[key].name,
      mimetype: files[key].mimetype,
    });
  }

  fileArr.forEach(file => {
    const path = __dirname + "/uploads/" + file.name;

    file.mv(path, err => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send({ status: "success", path: path });
    });
  });

  reply.send(fileArr);
};

module.exports = {
  uploads,
};
