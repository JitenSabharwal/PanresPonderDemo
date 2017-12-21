import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  PanResponder,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native'

const { width, height } = Dimensions.get('window')
class App extends Component {
  state= {
    zone: 'still touchable'
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const drag = getDirectionAndColor(gestureState)
        this.setState({
          zone: drag,
        })
      }
      
    })
  }
  
  onPress = () => {
    this.setState({
      zone: 'I got touched with a parent pan responder'
    })
  }
  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <View style={styles.zone1} />
        <View style={styles.center}>
          <TouchableOpacity onPress={this.onPress} style={{backgroundColor: 'yellow'}}>
            <Text>{this.state.zone}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.zone2} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center' 
  },
  zone1: {
    top: 40,
    left: 0,
    right: 0,
    height: 50,
    position: 'absolute',
    backgroundColor: 'red'
  },
  zone2: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: 'absolute',
    backgroundColor: 'blue'
  }
})

const getDirectionAndColor = ({ moveX, moveY, dx, dy}) => {
  const draggedDown = dy > 30
  const draggedUp = dy < -30
  const draggedLeft = dx < -30
  const draggedRight = dx > 30
  const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width
  const isBlue = moveY > (height - 50) && moveX > 0 && moveX < width
  let dragDirection = ''
  if (draggedDown || draggedUp) {
    if (draggedDown) dragDirection += 'dragged down '
    if (draggedUp) dragDirection +=  'dragged up '
  }
  if (draggedLeft || draggedRight) {
    if (draggedLeft) dragDirection += 'dragged left '
    if (draggedRight) dragDirection +=  'dragged right '
  }
  if (isRed) return `red ${dragDirection}`
  if (isBlue) return `blue ${dragDirection}`
  if (dragDirection) return dragDirection
}
export default App