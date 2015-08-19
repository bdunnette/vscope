AdminConfig = {
  name: 'MScope',
  collections: {
    Cases: {
      icon: 'folder-open'
    },
    Slides: {
      tableColumns: [{
        label: 'ID',
        name: '_id'
      }, {
        label: 'Tile URL',
        name: 'slideUrl'
      }, {
        label: 'Created',
        name: 'createdAt'
      }],
      omitFields: ['createdAt']
    },
    Markers: {
      icon: 'map-marker',
      tableColumns: [{
        label: 'User',
        name: 'user'
      }, {
        label: 'Slide',
        name: 'slide'
      }, {
        label: 'Type',
        name: 'layerType'
      }, {
        label: 'ID',
        name: '_id'
      }],
      omitFields: ['options', 'latlng']
    }
  }
};
