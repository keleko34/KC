module.exports = {
  Base:{
    Component:'Components',
    Section: 'Sections',
    Page: 'Pages'
  },
  Tasks: {
    Server: require('./Tasks/Server'),
    Bower: require('./Tasks/Bower'),
    Task: require('./Tasks/Task'),
    Create: require('./Tasks/Create'),
    Build: require('./Tasks/Build')
  }
}
