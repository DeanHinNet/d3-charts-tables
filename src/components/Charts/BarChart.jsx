import React from 'react'
import * as d3 from 'd3'

class DualBarChart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selected: [],
      barData: props.models
    }
  }
  
  componentDidMount(){
    const { properties } = this.props
    const { width, height, margin } = properties

    this.container = d3.select('#dualBarChart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
  
    this.drawChart()
  }
  componentDidUpdate(){
    const { fields } = this.props
    const { barData } = this.state

    fields.forEach((field)=>{
      this.container
      .selectAll(`.${field.name}`)
      .data(barData)
      .attr('fill', (d)=>this.barFill(d, `${field.name}`))
    })
  }
  barFill(d, fieldName){
    const { colors } = this.props

    if(d.value.active[fieldName]){
      return colors.on[fieldName]
    } else {
      return colors.off[fieldName]
    }
  }
  drawChart(){
    const { properties, fields } = this.props
    const { width, height, margin, barPadding, axisTicks } = properties
    const { barData } = this.state
    
    const xScale0 = d3.scaleBand()
      .range([0, width - margin.left - margin.right])
      .padding(barPadding)
    const xScale1 = d3.scaleBand()
    const yScale = d3.scaleLinear()
      .range([height - margin.top - margin.bottom, 0])

    //years
    const xAxis = d3.axisBottom(xScale0)
      .tickSizeInner(6)
      .tickSizeOuter(10)
    //counts
    const yAxis = d3.axisLeft(yScale)
      .ticks(axisTicks.qty)
      .tickSizeOuter(axisTicks.outerSize)

    xScale0.domain(barData.map(d => d.key))
    const fieldNames = fields.map(field=>{
      return field.name
    })

    xScale1.domain(fieldNames).range([0, xScale0.bandwidth()])
    console.log('bar data:', barData)
   
    yScale.domain([0, d3.max(barData, d => {
      if(d.value.deathCount !== undefined){
        return d.value.deathCount 
      } else {
        return d.value.male > d.value.female ? d.value.male : d.value.female
      }
    })])
    
   
    //var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding)

    // const g = svg.append('g')
    // .attr('transform', `translate(${margin.left},${margin.top})`)
   
    const model_name = this.container.selectAll('.model_name')
      .data(barData)
      .enter()
      .append('a')
      .attr('href', '')
      .attr('class', 'model_name')
      .attr('transform', d => `translate(${xScale0(d.key)},0)`)

    /* Add field1 bars */

    fields.forEach((field)=>{
      model_name.selectAll(`.bar.${field.name}`)
      .data(d => [d])
      .enter()
      .append('rect')
      .attr('class', `bar ${field.name}`)
      .attr('fill', (d)=>this.barFill(d, field.name))
      .attr('x', d => xScale1(`${field.valY}`))
      .attr('y', d => yScale(d.value[field.valY]))
      .attr('width', xScale1.bandwidth())
      .attr('height', d => {
        return height - margin.top - margin.bottom - yScale(d.value[field.valY])
      })
      .on('click', d => {
        d3.event.preventDefault()
        d3.event.stopPropagation()
      
        this.setState(prevState => ({
          barData: prevState.barData.map(el=>{
            return el.key === d.key 
            ? { 
              ...el, 
              value: {
                active: {
                  ...el.value.active, 
                  [field.name]: !el.value.active[field.name]
                }
              }
            }
            : el
          })
        }))
      })
    })
  
    const y = d3.scaleLinear().range([height- margin.top - margin.bottom - barPadding-.5, 0]);

    const make_y_gridlines = () => {		
      return d3.axisLeft(y)
      .ticks(10)
    }
    const valueline = d3.line()
      .y(d => { 
      return y(d.key); }
      )

    // Add the X Axis
  
    if(fields[0].name === 'deathCount'){
      this.container.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(xAxis)
      .selectAll('text')  
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '0')
      .attr('y', '3')
      .attr('transform', 'rotate(-90)')
    } else {
      this.container.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(xAxis)
    }
    // add the Y gridlines
    this.container.append('g')			
      .attr('class', 'grid')
      .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat('')
      )
    // add the valueline path.
    this.container.append('path')
      .data(barData)
      .attr('class', 'line')
      .attr('d', valueline)

    // Add the Y Axis
    this.container.append('g')
      .attr('class', 'y axis')
      .call(yAxis)

  }
  render() {
    return(
        <div className='container-chart'> 
          <div id='dualBarChart'></div>
        </div>
    )
  }
}

export default DualBarChart