import { ResponsiveBoxPlot } from '@nivo/boxplot'
import PropTypes from 'prop-types';

const BoxPlotChart = ({ data, ...props }) => (
  <ResponsiveBoxPlot
    { ...props }
    data={data}
    margin={{ top: 60, right: 40, bottom: 80, left: 60 }}
    minValue={0}
    maxValue={10}
    subGroupBy="subgroup"
    padding={0.12}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '',
      legendPosition: 'middle',
      legendOffset: 32,
      truncateTickAt: 0
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '',
      legendPosition: 'middle',
      legendOffset: -40,
      truncateTickAt: 0
    }}
    borderRadius={2}
    borderWidth={2}
    borderColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          0.3
        ]
      ]
    }}
    medianWidth={2}
    medianColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          0.3
        ]
      ]
    }}
    whiskerEndSize={0.6}
    whiskerColor={{
      from: 'color',
      modifiers: [
        [
          'darker',
          0.3
        ]
      ]
    }}
    motionConfig="stiff"
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 60,
        itemWidth: 100,
        itemHeight: 20,
        itemsSpacing: 3,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        symbolSize: 10,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000'
            }
          }
        ]
      }
    ]}
  />
)

BoxPlotChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          group: PropTypes.string.isRequired,
          subgroup: PropTypes.string.isRequired,
          mu: PropTypes.number.isRequired,
          sd: PropTypes.number.isRequired,
          n: PropTypes.number.isRequired,
          value: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default BoxPlotChart;