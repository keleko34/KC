module.exports = {
  commands: {
    Library: {
      cmd: {
        short: "-l",
        long: "--library"
      },
      prompt: {
        type: "input",
        message: "Please enter the library you would like to install"
      },
      action:'end'
    }
  }
}
