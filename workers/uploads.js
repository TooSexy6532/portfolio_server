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

  reply.send(fileArr);
};

module.exports = {
  uploads,
};
