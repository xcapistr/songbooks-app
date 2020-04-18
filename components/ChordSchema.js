import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ChordSchema = props => {
  const schema = props.schema.split('')
  const position = props.position

  const headingHeight = props.width / 6
  const pointSize = props.width / 6

  const dynamicStyles = {
    container: {
      width: props.width,
      height: props.height
    },
    position: {
      marginTop: headingHeight,
      right: -props.width / 2.5,
      height: props.height / 5,
      width: props.width / 2.5
    },
    positionText: {
      fontSize: props.height / 8
    },
    headingWrapper: {
      width: props.width + props.width / 8,
      marginLeft: -props.width / 18
    },
    headingIcon: {
      width: pointSize,
      height: pointSize
    },
    linesWrapper: {
      width: props.width,
      height: props.height,
      marginTop: headingHeight
    },
    pointsWrapper: {
      width: props.width + props.width / 6 - 4,
      marginLeft: -props.width / 12 + 3,
      height: props.height - 6,
      marginTop: headingHeight + 3
    },
    point: {
      width: pointSize,
      height: pointSize,
      borderRadius: pointSize / 2
    }
  }

  return (
    <View style={{ ...styles.container, ...dynamicStyles.container }}>
      <View style={{ ...styles.position, ...dynamicStyles.position }}>
        <Text style={{ ...styles.positionText, ...dynamicStyles.positionText }}>
          {position}
        </Text>
      </View>
      <View
        style={{ ...styles.headingWrapper, ...dynamicStyles.headingWrapper }}
      >
        <View style={styles.heading}>
          {schema.map((ch, i) => (
            <View
              key={i}
              style={{ ...styles.headingIcon, ...dynamicStyles.headingIcon }}
            >
              {ch === 'x' ? (
                <MaterialCommunityIcons
                  name="close"
                  size={props.width / 8}
                  color={Colors.primary}
                />
              ) : ch === '0' ? (
                <MaterialCommunityIcons
                  name="circle-outline"
                  size={props.width / 8}
                  color={Colors.primary}
                />
              ) : null}
            </View>
          ))}
        </View>
      </View>
      <View
        style={{
          ...styles.linesWrapper,
          ...dynamicStyles.linesWrapper
        }}
      >
        <View style={styles.horizontalLines}>
          <View
            style={{
              ...styles.horizontalLine,
              backgroundColor: Colors.primary
            }}
          ></View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.horizontalLine}></View>
          <View style={styles.horizontalLine}></View>
        </View>
      </View>
      <View style={{ ...styles.linesWrapper, ...dynamicStyles.linesWrapper }}>
        <View style={styles.verticalLines}>
          <View style={{ ...styles.verticalLine, width: 6 }}></View>
          <View
            style={{ ...styles.verticalLine, width: 5, marginHorizontal: 1 }}
          ></View>
          <View
            style={{ ...styles.verticalLine, width: 4, marginHorizontal: 1 }}
          ></View>
          <View
            style={{ ...styles.verticalLine, width: 3, marginHorizontal: 2 }}
          ></View>
          <View
            style={{ ...styles.verticalLine, width: 2, marginHorizontal: 3 }}
          ></View>
          <View style={{ ...styles.verticalLine, width: 1 }}></View>
        </View>
      </View>
      <View style={{ ...styles.pointsWrapper, ...dynamicStyles.pointsWrapper }}>
        <View style={styles.points}>
          <View style={styles.pointsLine}>
            {schema.map((ch,i) => (
              <View
                key={i}
                style={{
                  ...styles.point,
                  ...dynamicStyles.point,
                  opacity: ch == 1 ? 1 : 0
                }}
              ></View>
            ))}
          </View>
          <View style={styles.pointsLine}>
            {schema.map((ch, i) => (
              <View
                key={i}
                style={{
                  ...styles.point,
                  ...dynamicStyles.point,
                  opacity: ch == 2 ? 1 : 0
                }}
              ></View>
            ))}
          </View>
          <View style={styles.pointsLine}>
            {schema.map((ch,i) => (
              <View
                key={i}
                style={{
                  ...styles.point,
                  ...dynamicStyles.point,
                  opacity: ch == 3 ? 1 : 0
                }}
              ></View>
            ))}
          </View>
          <View style={styles.pointsLine}>
            {schema.map((ch, i) => (
              <View
                key={i}
                style={{
                  ...styles.point,
                  ...dynamicStyles.point,
                  opacity: ch == 4 ? 1 : 0
                }}
              ></View>
            ))}
          </View>
          <View style={styles.pointsLine}>
            {schema.map((ch, i) => (
              <View
                key={i}
                style={{
                  ...styles.point,
                  ...dynamicStyles.point,
                  opacity: ch == 5 ? 1 : 0
                }}
              ></View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  position: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  positionText: {
    color: Colors.primary
  },
  headingWrapper: {
    position: 'absolute'
  },
  heading: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  headingIcon: {
    alignItems: 'center'
  },
  linesWrapper: {
    position: 'absolute'
  },
  verticalLines: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  verticalLine: {
    height: '100%',
    width: 3,
    backgroundColor: Colors.lighter,
    borderColor: Colors.primary,
    borderWidth: 1
  },
  horizontalLines: {
    flex: 1,
    justifyContent: 'space-between'
  },
  horizontalLine: {
    height: 6,
    width: '100%',
    backgroundColor: '#cef'
  },
  pointsWrapper: {
    position: 'absolute',
    marginBottom: 3
  },
  points: {
    flex: 1,
    justifyContent: 'space-around'
  },
  pointsLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  point: {
    opacity: 0,
    backgroundColor: Colors.lighter,
    borderColor: Colors.primary,
    borderWidth: 2
  }
})

export default ChordSchema
