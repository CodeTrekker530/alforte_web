import React, { useRef } from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MapSvg from '../assets/map.svg'; // adjust path if needed

const window = Dimensions.get('window');
const drawerHeight = window.height * 0.6;

export default function HomeScreen() {
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
        contentContainerStyle={{
          width: window.width * 2,
          height: window.height,
        }}
        maximumZoomScale={4}
        minimumZoomScale={1}
        bounces={false}
        bouncesZoom={false}
        pinchGestureEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
      >
        <ScrollView
          contentContainerStyle={{
            width: window.width * 4,
            height: window.height,
          }}
          bounces={false}
          bouncesZoom={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <MapSvg width={window.width * 2} height={window.height} />
        </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  image: {
    width: window.width * 4,
    height: window.height * 1,
  },
  topOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
  },
  filterButton: {
    paddingHorizontal: 11,
    paddingVertical: 11,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginRight: 5,
  },
  searchBar: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginLeft: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  floatingButtons: {
    position: 'absolute',
    top: 90,
    right: 10,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonNumber: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: drawerHeight,
    backgroundColor: '#0766AD',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    paddingTop: 10,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  drawerHandle: {
    width: 115,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#EAEAEA',
    marginBottom: 10,
  },
    drawerContent: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
    },

    titleBox: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    },

    titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    },

  headerCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#0766AD',
  marginHorizontal: 0,
  marginBottom: 10,
  padding: 10,
  borderRadius: 10,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
},
headerImage: {
  width: 50,
  height: 50,
  borderRadius: 10,
  marginRight: 10,
},
headerInfo: {
  flex: 1,
},
headerTitle: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
headerSubtitle: {
  color: '#d3e7ff',
  fontSize: 13,
},
headerPrice: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
},
headerCardContainer: {
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 5,
},
carouselContainer: {
  marginTop: 15,
  height: 190,
},
carouselContent: {
  paddingHorizontal: 10,
},
carouselImage: {
  width: 280,
  height: 190,
  borderRadius: 10,
  marginRight: 10,
  borderWidth: 1,
  borderColor: '#fff',
},

qualityList: {
  marginTop: 20,
  width: '100%',
},
qualityItem: {
  fontSize: 15,
  color: '#000',
  marginBottom: 10,
  backgroundColor: '#fff',
  padding: 5,
  borderRadius:5,

},
qualityLabel: {
  fontWeight: 'bold',
  color: '#000',
},

});
