import React from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the search icon
import { useRouter } from 'expo-router';
import MapSVG from '../utils/MapSVG'; // or wherever you placed MapSVG.js


const window = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Top overlay */}
      <View style={styles.topOverlay}>
        <View style={styles.searchBar}>
        <Image
            source={require('../assets/logo.png')} // Update path if needed
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
        // Add vertical scrolling:
        showsVerticalScrollIndicator={false}
        >
        <View style={styles.mapContainer}>
          <MapSVG width={window.width * 3} height={window.height * 3} />
        </View>
      </ScrollView>


    <TouchableOpacity style={styles.bookButton} onPress={() => { /* your action here */ }}>
    <Ionicons name="book-outline" size={28} color="white" />
    </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 49,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  mapContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
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
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#000',  // black border
  },
    searchBar: {
    flexShrink: 1, // prevent overflowing by allowing shrink
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    paddingVertical: 4,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    },
  logo: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
    searchInput: {
    flex: 1, // allow to expand inside searchBar
    fontSize: 16,
    color: '#000',
    },
  searchIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  floatingButtons: {
  position: 'absolute',
  top: 80, // just below topOverlay
  right: 10,
  zIndex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
floatingButton: {
  backgroundColor: '#fff',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#000',  // black border
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
bookButton: {
  position: 'absolute',
  bottom: 90,
  right: 15,
  width: 60,
  height: 60,
  borderRadius: 30,  // circle
  backgroundColor: 'darkgreen',
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 6,  // shadow for Android
  shadowColor: '#000',  // shadow for iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
},

});
