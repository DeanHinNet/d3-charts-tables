import React from 'react'
import csv from './../database/avengers-txt.csv'
import Table from './Charts/Table.jsx'
import BarChart from './Charts/BarChart.jsx'
import * as d3 from 'd3'
import {
  DUALBARCHART_PROPERTIES,
  BARCHART_PROPERTIES,
  CHART_LIST,
  COLUMNS_STATS,
  COLUMNS_DEATHCOUNT,
  DUALBARCHART_FIELDS,
  BARCHART_FIELDS,
  BAR_COLORS
} from './Charts/constants'
import {TextField, MenuItem} from '@material-ui/core'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selection: '',
    }
    this.handleSelect = this.handleSelect.bind(this)
  }
  componentDidMount(){
    d3.csv(csv, (rows) => {
      return rows
    })
    .then(datacsv=>{
      this.setState({
        datacsv
      })
    })
  }
  getDataStats(datacsv){
    return datacsv.map(hero => ({
      name: hero['Name/Alias'],
      gender: hero['Gender'],
      year: hero['Year'],
      notes: hero['Notes'],
      url: hero['URL'],
      selected: false
    }))
  }
  getDataDeathCount(datacsv){
    return datacsv.map(hero => {
      const maxReturns = 5
      let currentlyAlive = true
      let deathCount = 0
    
      for(let i=1; i<=maxReturns; i++){
        if(hero[`Death${i}`] !== null && hero[`Death${i}`] === 'YES'){
          deathCount++
        } 
        if(hero[`Return${i}`] !== null ){
          currentlyAlive = currentlyAlive && hero[`Return${i}`] === 'YES'
        }
      }
  
      return {
        name: hero['Name/Alias'],
        url: hero['URL'],
        deathCount,
        currentlyAlive,
        selected: false
      }
    }) 
  }
  getDataYearGender(datacsv){
    return d3.nest()
      .key( d => d.Year)
      .rollup( v => {
        let male = 0
        let female = 0
        v.forEach((entry)=>{
          if(entry.Gender === 'FEMALE'){
            female++
          }
          if(entry.Gender === 'MALE'){
            male++
          }
        })
        return {
          male,
          female,
          active: {
            male: false,
            female: false
          }
        }
      })
      .entries(datacsv)
  } 

  getDeathCounts(datacsv){
    return d3.nest()
      .key(d => d['Name/Alias'])
      .rollup( v => {
        let deathCount = 0
        for(let i=1; i<6; i++){
          const entry = v[0][`Death${i}`] ? v[0][`Death${i}`].split(' ')[0] : false
          if(entry){
            if(entry === 'YES'){
              deathCount++
            } else if (entry === 'NO') {
              i=5
            }
          } else {
            i=5
          }
        }
        return {
          deathCount,
          active: false
        }
      })
      .entries(datacsv)
  }
  handleSelect(e){
    this.setState({
      selection: e.target.value
    })
  }
  render() {
    const { selection, datacsv } = this.state

    
    
    return(
        <div className='home'>
          <TextField
            select
            fullWidth={true}
            onChange={e => this.handleSelect(e)}
            label='Please Choose Your Chart'
            className={'chartSelection'}
            value={selection ? selection : 'N/A'}
          >
            {CHART_LIST.map(option=>(
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          {selection === 'Years/Gender Bar Chart' && 
          <BarChart
            properties={DUALBARCHART_PROPERTIES}
            fields={DUALBARCHART_FIELDS}
            colors={BAR_COLORS}
            models={this.getDataYearGender(datacsv)}
          />}

          {selection === 'Years/Gender Table' && 
          <Table 
            columns={COLUMNS_STATS}
            data={this.getDataStats(datacsv)}
          />}

          {selection === 'Death Bar Chart' && 
          <BarChart
            properties={BARCHART_PROPERTIES}
            fields={BARCHART_FIELDS}
            colors={BAR_COLORS}
            models={this.getDeathCounts(datacsv)}
          />}

          {selection === 'Death Table' && 
          <Table 
            columns={COLUMNS_DEATHCOUNT}
            data={this.getDataDeathCount(datacsv)}
          />}
        </div>
    )
  }
}
export default Home