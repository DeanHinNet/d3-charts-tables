import React from 'react'
import * as d3 from 'd3'

class Table extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chartData: props.data
    }
    this.drawChart = this.drawChart.bind(this)
  }
  
  componentDidMount(){
    this.table = d3.select('#myTable').append('table')
    this.drawChart()
  }
  componentDidUpdate(){
    const { chartData } = this.state

    this.table
    .selectAll('.row')
    .data(chartData)
    .attr('class', this.selectedClass)
  }
  selectedClass(d){

    if(d.selected){
      return 'row selected'
    } else {
      return 'row'
    }
  }
  drawChart(){
    const { columns } = this.props
    const { chartData } = this.state

    this.table
      .append('thead')
      .append('tr')
      .selectAll('th')
      .data(columns)
      .enter()
      .append('th')
      .attr('class', row => row.classname)
      .text(row => row.head)

    this.table
      .append('tbody')
      .selectAll('tr')
      .data(chartData)
      .enter()
      .append('tr')
      .attr('class', this.selectedClass)
      .on('click', (d)=>{
        d3.event.preventDefault()
        d3.event.stopPropagation()
 
        this.setState( prevState => {
        

          return {chartData: prevState.chartData.map(entry=>{
            return entry.name === d.name
            ? {
              ...entry,
              selected: !entry.selected
            }
            : entry
          })}
        })
      })
      .selectAll('td')
      .data((row, i) => (
        columns.map(c => {
          var cell = {}
          d3.keys(c).forEach(k => cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k])
          return cell
        })
      ))
      .enter()
      .append('td')
      .html(row => row.html)
      .attr('class', row => row.classname)
  }

  render() {
    return(
      <div id='myTable'></div>
    )
  }
}

export default Table