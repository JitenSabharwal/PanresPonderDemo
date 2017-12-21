import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  PanResponder,
  Animated
} from 'react-native'

class App extends Component {
  state= {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(1)
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        console.log(this.state.pan.x)
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value})
        this.state.pan.setValue({x: 0, y: 0})
        Animated.spring(
          this.state.scale,
          {
            toValue: 1.5,
            friction: 1
          }
        ).start()
      },
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset()
        Animated.spring(
          this.state.scale,
          {
            toValue: 1,
            friction: 1
          }
        ).start()
      }
    })
  }
  render() {
    const {pan} = this.state
    const [translateX, translateY] = [pan.x, pan.y]
    const {scale} = this.state
    const rotate = '0deg'
    const imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]}
    return (
      <View style={styles.container}>
        <Animated.View {...this._panResponder.panHandlers}
          style={imageStyle}          
        >
          <Image
            style={styles.imageStyle}
            source={{uri: 'https://mindthecode.com/images/panresponder-target.png'}}
          />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    height: 100,
    width: 100
  }
})
export default App