AdminConfig = {
  name: 'MScope',
  collections: {
    Cases: {
      icon: 'folder-open'
    },
    Slides: {
      tableColumns: [{
        label: 'Title',
        name: 'title'
      }, {
        label: 'Created',
        name: 'createdAt'
      }],
      omitFields: ['createdAt']
    }
    // Markers: {
    //   icon: 'map-marker',
    //   tableColumns: [{
    //     label: 'Slide',
    //     name: 'slide'
    //   }, {
    //     label: 'Type',
    //     name: 'layerType'
    //   }, {
    //     label: 'ID',
    //     name: '_id'
    //   }]
    // }
  }
};
