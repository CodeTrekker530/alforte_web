import {
  ScrollView,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import styles from '../assets/Styles/Maps';
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
