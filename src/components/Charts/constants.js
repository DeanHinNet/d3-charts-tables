
export const CHART_LIST = [
  {name: 'Years/Gender Bar Chart', value: 1},
  {name: 'Years/Gender Table', value: 2}, 
  {name: 'Death Bar Chart', value: 3},
  {name: 'Death Table', value: 4},
]
export const DUALBARCHART_FIELDS = [
  {name: 'male', valY: 'male', fill: 'blue'},
  {name: 'female', valY: 'female', fill: 'red'}
]
export const BAR_COLORS =  {
  on: {
    male:'pink',
    female: 'lightblue',
    deathCount: 'lightgreen',
  },
  off: {
    male: 'red',
    female: 'blue',
    deathCount: 'green'
  }
}
export const BARCHART_FIELDS = [{name: 'deathCount', valY: 'deathCount', fill: 'blue'}]

export const DUALBARCHART_PROPERTIES = {
  width: 1200,
  height: 600,
  margin: {top: 30, right: 20, bottom: 30, left: 80},
  barPadding: .5,
  axisTicks: {qty: 12, outerSize: 2, dateFormat: '%m-%d'}
}
export const BARCHART_PROPERTIES = {
  width: 1400,
  height: 500,
  margin: {top: 30, right: 20, bottom: 200, left: 20},
  barPadding: .5,
  axisTicks: {qty: 5, outerSize: 2, dateFormat: '%m-%d'}
}


export const COLUMNS_DEATHCOUNT = [
    { 
      head: 'Name/Alias', 
      classname: 'name',
      html: row => (`<a href='${row.url}' target='_blank'>${row.name}</a>`) 
    },
    { 
      head: 'Currently Alive', 
      classname: 'alive',
      html: row => {
        if(row.currentlyAlive){
          return 'YES'
        } else {
          return 'NO'
        }
      }
    },
    { 
      head: 'Number of Deaths', 
      classname: 'deaths',
      html: row => row.deathCount
    },
  ]

export const COLUMNS_STATS = [
    { 
      head: 'Name/Alias', 
      classname: 'name',
      html: row => (`<a href='${row.url}' target='_blank'>${row.name}</a>`) 
    },
    { 
      head: 'Gender', 
      classname: 'gender',
      html: row => row.gender
    },
    { 
      head: 'Year', 
      classname: 'year',
      html: row => row.year
    },
    { 
      head: 'Notes', 
      classname: 'notes',
      html: row => row.notes
    },
  ]