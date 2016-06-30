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
    Task: require('./Tasks/Task'),
    Create: require('./Tasks/Create'),
    Build: require('./Tasks/Build')
  }
}
