export const scatterConfig = {
  chart: {
    type: 'scatter',
    height: window.innerHeight - 128,
    zoomType: "xy"
  },
  legend: {
    enabled: false
  },
  title: {
    text: ''
  },
  tooltip: {
    enabled: false
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: 'Date',
      align: 'low'
  }
  },
  yAxis: {
    type: 'datetime',
    title: {
      text: 'Time',
    }
  },
  plotOptions: {
    scatter: {
      marker: {
        symbol: 'circle',
        radius: 4
      }
    }
  }
}
