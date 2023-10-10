import { ColorType, createChart, CrosshairMode, LineStyle } from 'lightweight-charts'
import { useEffect, useRef } from 'react'

const initialData = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
]

export const ChartComponent = (props: any) => {
  const {
    data,
    vertData,
    colors: {
      // backgroundColor = 'white',
      backgroundColor = '#333',
      lineColor = '#2962FF',
      textColor = 'black',
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    } = {},
  } = props
  const chartContainerRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    })

    // Customizing the Crosshair
    chart.applyOptions({
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      crosshair: {
        // Change mode from default 'magnet' to 'normal'.
        // Allows the crosshair to move freely without snapping to datapoints
        mode: CrosshairMode.Normal,

        // Vertical crosshair line (showing Date in Label)
        vertLine: {
          width: 8 as any,
          color: '#C3BCDB44',
          style: LineStyle.Solid,
          labelBackgroundColor: '#9B7DFF',
        },

        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
          color: '#9B7DFF',
          labelBackgroundColor: '#9B7DFF',
        },
      },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
        horzTouchDrag: false,
        vertTouchDrag: false,
      },
      handleScale: {
        mouseWheel: false,
        pinch: false,
        axisPressedMouseMove: false,
        axisDoubleClickReset: false,
      },
    })

    chart.timeScale().fitContent()

    if (props.data) {
      const candleSeries = chart.addCandlestickSeries()

      // Convert the candlestick data for use with a line series
      const lineData = data.map((datapoint) => ({
        time: datapoint.time,
        value: (datapoint.close + datapoint.open) / 2,
      }))

      // Add an area series to the chart,
      // Adding this before we add the candlestick chart
      // so that it will appear beneath the candlesticks
      const areaSeries = chart.addAreaSeries({
        lastValueVisible: false, // hide the last value marker for this series
        crosshairMarkerVisible: false, // hide the crosshair marker for this series
        lineColor: 'transparent', // hide the line
        topColor: 'rgba(56, 33, 110,0.6)',
        bottomColor: 'rgba(56, 33, 110, 0.1)',
      })
      // Set the data for the Area Series
      areaSeries.setData(lineData)

      candleSeries.setData(data)

      candleSeries.applyOptions({
        // wickUpColor: 'rgb(54, 116, 217)',
        // upColor: 'rgb(54, 116, 217)',
        // wickDownColor: 'rgb(225, 50, 85)',
        // downColor: 'rgb(225, 50, 85)',
        borderVisible: false,
      })

      candleSeries.priceScale().applyOptions({
        autoScale: false, // disables auto scaling based on visible content
        scaleMargins: {
          top: 0.1,
          bottom: 0.2,
        },
      })

      // if (vertData) {
      //   const vertSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor })
      //   vertSeries.setData(
      //     vertData.map((item) => ({
      //       time: item[0],
      //       value: item[1],
      //     }))
      //   )
      // }
    } else {
      // const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor })
      // newSeries.setData(initialData)
    }

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      chart.remove()
    }
  }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor, props.data, vertData])

  return <div ref={chartContainerRef} />
}

export function LightweightChart(props: any) {
  return <ChartComponent {...props}></ChartComponent>
}
