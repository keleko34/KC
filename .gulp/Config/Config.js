module.exports = {
  Component: {
    base: 'Components'
  },
  Section: {
    base: 'Sections'
  },
  Page: {
    base: 'Pages'
  },
  Tasks: {
    Server: require('./Tasks/Server'),
    Bower: require('./Tasks/Bower'),
    Task: require('./Tasks/Task'),
    Create: require('./Tasks/Create'),
    Build: require('./Tasks/Build')
  }
}
