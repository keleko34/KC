module.exports = {
  commands: {
    Port: {
      cmd: {
        short: "-p",
        long: "--port"
      },
      prompt: {
        type: "input",
        message: "Please enter a port for the server to use"
      }
    },
    Reload: {
      cmd: {
        short: "-r",
        long: "--reload"
      },
      prompt: {
        type: "confirm",
        message: "Would You like to turn on livereload?"
      }
    },
    Root: {
      cmd: {
        short: "-r",
        long: "--root"
      },
      prompt: {
        type: "input",
        message: "Please specify a root filepath"
      }
    }
  }
}
