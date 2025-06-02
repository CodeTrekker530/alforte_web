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

      
    <Animated.View style={[styles.headerCardContainer, { top: Animated.subtract(panY, 75) }]}>
    <View style={styles.headerCard}>
        <Image
        source={require('../assets/banana.jpg')}
        style={styles.headerImage}
        />
        <View style={styles.headerInfo}>
        <Text style={styles.headerTitle}>Banana (Lakatan)</Text>
        <Text style={styles.headerSubtitle}>Ground Floor, 3rd Floor</Text>
        </View>
        <Text style={styles.headerPrice}>SRP: ₱95/kg</Text>
    </View>
    </Animated.View>
      {/* Bottom Drawer */}
    <Animated.View style={[styles.drawerContainer, { top: panY }]} {...panResponder.panHandlers}>
    <View style={styles.drawerHandle} />

    <View style={styles.drawerContent}>
      {/* Title */}
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>Quality Guide</Text>
      </View>

      {/* Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carouselContainer}
        contentContainerStyle={styles.carouselContent}
      >
        <Image
          source={require('../assets/banana.jpg')}
          style={styles.carouselImage}
        />
        <Image
          source={require('../assets/banana2.webp')}
          style={styles.carouselImage}
        />
      </ScrollView>

      {/* Quality List */}
      <View style={styles.qualityList}>
        <Text style={styles.qualityItem}>
          <Text style={styles.qualityLabel}>Color: </Text>
          Bright yellow with slight green tips.
        </Text>
        <Text style={styles.qualityItem}>
          <Text style={styles.qualityLabel}>Texture: </Text>
          Firm but not hard; smooth skin.
        </Text>
        <Text style={styles.qualityItem}>
          <Text style={styles.qualityLabel}>Smell: </Text>
          Sweet and mild banana fragrance.
        </Text>
      </View>
    </View>
    </Animated.View>


    </View>
  );
}
