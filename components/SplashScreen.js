import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }) {
  const translateX = useRef(new Animated.Value(-100)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const bgColor = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.parallel([
    Animated.timing(translateX, {
      toValue: width / 2 - 40 - 20, // corrected value for perfect center
      duration: 1600,
      useNativeDriver: true,
    }),
    Animated.timing(rotate, {
      toValue: 4, // 4 quarter turns = 360°
      duration: 1600,
      useNativeDriver: true,
    }),
  ]).start(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 2, // or try 2.5
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(bgColor, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => {
        onFinish?.();
      }, 800);
    });
  });
}, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 4],
    outputRange: ['0deg', '360deg'],
  });

  const bgColorInterpolate = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#0077cc'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColorInterpolate }]}>
      <Animated.Image
        source={require('../assets/logo.png')}
        style={[
          styles.logo,
          {
            transform: [
              { translateX },
              { rotate: rotateInterpolate },
              { scale },
            ],
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // start from left
    paddingLeft: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
});
