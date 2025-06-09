

const startController = (req, res) => {
  res.status(200).send('<h1>Welcome To the Server</h1>')
}

module.exports = { startController };

