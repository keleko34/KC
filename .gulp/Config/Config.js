module.exports = {
  Component: {
    base: 'Components'
  },
  Section:{
    base: 'Sections'
  },
  Page: {
    base: 'Pages'
  },
  Tasks: {
    Create: require('./Create'),
    Build: require('./Build')
  }
}
