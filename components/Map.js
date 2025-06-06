import React, { useRef } from 'react';
import {
  ScrollView,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import styles from '../assets/Styles/Maps';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MapSVG from '../utils/MapSVG';
import { useSelection } from '../context/SelectionContext'; 
const window = Dimensions.get('window');
const drawerHeight = window.height * 0.6;

export default function HomeScreen() {
const { selectedItem } = useSelection();
console.log('[Map.js] selectedItem:', selectedItem);
const router = useRouter();
const initialDrawerOffset = window.height - 150;
const panY = useRef(new Animated.Value(initialDrawerOffset)).current;

const resetPositionAnim = Animated.timing(panY, {
  toValue: window.height - drawerHeight,
  duration: 300,
  useNativeDriver: false,
});

const closeAnim = Animated.timing(panY, {
  toValue: initialDrawerOffset,
  duration: 300,
  useNativeDriver: false,
});


  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newY = gestureState.dy + window.height - drawerHeight;
        if (newY > window.height - drawerHeight && newY < window.height) {
          panY.setValue(newY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeAnim.start();
        } else {
          resetPositionAnim.start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {/* Top overlay */}
      <View style={styles.topOverlay}>
        <View style={styles.searchBar}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity onPress={() => router.push('/Search')}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Floating vertical button group */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={styles.buttonNumber}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={styles.buttonNumber}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={styles.buttonNumber}>3</Text>
        </TouchableOpacity>
      </View>

      {/* Zoomable, scrollable image */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
        maximumZoomScale={4}
        minimumZoomScale={1}
        bounces={false}
        pinchGestureEnabled={true}
        horizontal
        showsVerticalScrollIndicator={false}
        >
        <View style={styles.mapContainer}>
          <MapSVG width={window.width * 3} height={window.height * 3} />
        </View>
      </ScrollView>
    </View>
  );
}
