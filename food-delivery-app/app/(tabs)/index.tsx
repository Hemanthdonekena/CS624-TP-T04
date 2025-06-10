import { View, Text, Button, StyleSheet, ScrollView, Alert, TouchableOpacity, Linking, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  
  // Modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  
  // Order tracking
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  
  // Filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Delivery partners
  const deliveryPartners = [
    { id: 1, name: 'Rajesh Kumar', rating: 4.8, vehicle: 'Bike', eta: '15-20 mins', phone: '+1-555-0101' },
    { id: 2, name: 'Priya Sharma', rating: 4.9, vehicle: 'Scooter', eta: '12-18 mins', phone: '+1-555-0102' },
    { id: 3, name: 'Arjun Singh', rating: 4.7, vehicle: 'Bike', eta: '18-25 mins', phone: '+1-555-0103' },
    { id: 4, name: 'Meera Patel', rating: 4.6, vehicle: 'Car', eta: '10-15 mins', phone: '+1-555-0104' }
  ];

  // Expanded Indian Food menu data
  const foodMenu = [
    { id: 1, name: 'Butter Chicken', price: 16.99, description: 'Creamy tomato curry with tender chicken pieces', category: 'Main Course', image: '🍛', spiceLevel: 'Medium' },
    { id: 2, name: 'Chicken Biryani', price: 18.50, description: 'Fragrant basmati rice with spiced chicken and saffron', category: 'Rice', image: '🍚', spiceLevel: 'Medium' },
    { id: 3, name: 'Palak Paneer', price: 14.75, description: 'Fresh spinach curry with cottage cheese cubes', category: 'Vegetarian', image: '🥬', spiceLevel: 'Mild' },
    { id: 4, name: 'Tandoori Chicken', price: 19.99, description: 'Clay oven roasted chicken with yogurt marinade', category: 'Tandoor', image: '🍗', spiceLevel: 'Hot' },
    { id: 5, name: 'Dal Makhani', price: 12.25, description: 'Rich black lentils in creamy tomato gravy', category: 'Vegetarian', image: '🫘', spiceLevel: 'Mild' },
    { id: 6, name: 'Lamb Rogan Josh', price: 22.99, description: 'Kashmiri lamb curry with aromatic spices', category: 'Main Course', image: '🍖', spiceLevel: 'Hot' },
    { id: 7, name: 'Chole Bhature', price: 13.50, description: 'Spiced chickpea curry with fluffy fried bread', category: 'Vegetarian', image: '🫓', spiceLevel: 'Medium' },
    { id: 8, name: 'Masala Dosa', price: 11.99, description: 'Crispy rice crepe with spiced potato filling', category: 'South Indian', image: '🥞', spiceLevel: 'Mild' },
    { id: 9, name: 'Chicken Tikka Masala', price: 17.75, description: 'Grilled chicken in rich tomato-cream sauce', category: 'Main Course', image: '🍛', spiceLevel: 'Medium' },
    { id: 10, name: 'Aloo Gobi', price: 13.25, description: 'Dry curry with potatoes and cauliflower', category: 'Vegetarian', image: '🥔', spiceLevel: 'Mild' },
    { id: 11, name: 'Naan Bread', price: 3.99, description: 'Soft clay oven baked flatbread', category: 'Bread', image: '🫓', spiceLevel: 'None' },
    { id: 12, name: 'Gulab Jamun', price: 6.50, description: 'Sweet milk dumplings in rose-cardamom syrup', category: 'Dessert', image: '🍡', spiceLevel: 'None' },
    { id: 13, name: 'Fish Curry', price: 20.25, description: 'Fresh fish in coconut and tamarind gravy', category: 'Seafood', image: '🐟', spiceLevel: 'Medium' },
    { id: 14, name: 'Mutton Biryani', price: 24.99, description: 'Aromatic rice with tender mutton and whole spices', category: 'Rice', image: '🍚', spiceLevel: 'Hot' },
    { id: 15, name: 'Paneer Tikka', price: 15.50, description: 'Grilled cottage cheese with bell peppers', category: 'Tandoor', image: '🧀', spiceLevel: 'Medium' },
    { id: 16, name: 'Samosa (2 pcs)', price: 5.99, description: 'Crispy pastry filled with spiced potatoes', category: 'Appetizer', image: '🥟', spiceLevel: 'Mild' },
    { id: 17, name: 'Chicken Korma', price: 18.25, description: 'Mild chicken curry with nuts and cream', category: 'Main Course', image: '🍛', spiceLevel: 'Mild' },
    { id: 18, name: 'Raita', price: 4.50, description: 'Yogurt with cucumber and mint', category: 'Sides', image: '🥒', spiceLevel: 'None' },
    { id: 19, name: 'Mango Lassi', price: 4.99, description: 'Sweet yogurt drink with mango pulp', category: 'Beverages', image: '🥭', spiceLevel: 'None' },
    { id: 20, name: 'Ras Malai', price: 7.25, description: 'Soft cheese dumplings in sweet milk', category: 'Dessert', image: '🍮', spiceLevel: 'None' }
  ];

  const categories = ['All', 'Main Course', 'Rice', 'Vegetarian', 'Tandoor', 'South Indian', 'Bread', 'Dessert', 'Seafood', 'Appetizer', 'Sides', 'Beverages'];

  // Filter menu items
  const filteredMenu = foodMenu.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // LOGIN FUNCTIONALITY
  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    // Simulate login authentication
    setIsLoggedIn(true);
    setUserProfile({
      name: 'John Doe',
      email: loginForm.email,
      phone: '+1-555-0123',
      address: '123 Main St, City, State'
    });
    setShowLoginModal(false);
    setLoginForm({ email: '', password: '' });
    Alert.alert('Success', 'Welcome back! You are now logged in.');
  };

  // REGISTER FUNCTIONALITY
  const handleRegister = () => {
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    setIsLoggedIn(true);
    setUserProfile({
      name: registerForm.name,
      email: registerForm.email,
      phone: registerForm.phone,
      address: registerForm.address
    });
    setShowRegisterModal(false);
    setRegisterForm({ name: '', email: '', password: '', phone: '', address: '' });
    Alert.alert('Success', 'Registration successful! Welcome to Spice Palace.');
  };

  // LOGOUT FUNCTIONALITY
  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => {
          setIsLoggedIn(false);
          setUserProfile({ name: '', email: '', phone: '', address: '' });
          setCartItems([]);
          setCurrentOrder(null);
          Alert.alert('Logged Out', 'You have been successfully logged out.');
        }}
      ]
    );
  };

  // CART FUNCTIONALITY
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    
    Alert.alert('Added to Cart', `${item.name} has been added to your cart!`);
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => setCartItems([]) }
      ]
    );
  };

  // VIEW CART FUNCTIONALITY
  const viewCart = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Your cart is currently empty. Add some delicious items!');
      return;
    }
    setShowCheckoutModal(true);
  };

  // CHECKOUT FUNCTIONALITY
  const proceedToCheckout = () => {
    if (!isLoggedIn) {
      Alert.alert('Login Required', 'Please login to proceed with checkout.');
      setShowCheckoutModal(false);
      setShowLoginModal(true);
      return;
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;

    const newOrder = {
      id: Date.now(),
      items: [...cartItems],
      total: total,
      status: 'Preparing',
      timestamp: new Date().toLocaleString(),
      deliveryPartner: deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)]
    };

    setCurrentOrder(newOrder);
    setOrderHistory([newOrder, ...orderHistory]);
    setCartItems([]);
    setShowCheckoutModal(false);
    
    Alert.alert('Order Placed!', `Your order #${newOrder.id} has been placed successfully. You will receive a confirmation shortly.`);
  };

  // DELIVERY PARTNERS FUNCTIONALITY
  const showDeliveryPartners = () => {
    Alert.alert(
      'Available Delivery Partners 🏍️',
      deliveryPartners.map(partner => 
        `${partner.name} (${partner.rating}⭐)\n${partner.vehicle} - ETA: ${partner.eta}\nPhone: ${partner.phone}`
      ).join('\n\n'),
      [
        { text: 'OK', style: 'default' },
        { text: 'Call Partner', onPress: () => callDeliveryPartner() }
      ]
    );
  };

  const callDeliveryPartner = () => {
    if (currentOrder && currentOrder.deliveryPartner) {
      const phoneNumber = currentOrder.deliveryPartner.phone;
      Linking.openURL(`tel:${phoneNumber}`).catch(() => {
        Alert.alert('Error', 'Unable to make phone call');
      });
    } else {
      Alert.alert('No Active Order', 'You need an active order to call a delivery partner.');
    }
  };

  // TRACK ORDER FUNCTIONALITY
  const trackOrder = () => {
    if (!currentOrder) {
      Alert.alert('No Active Order', 'You don\'t have any active orders to track.');
      return;
    }

    const statuses = ['Order Received', 'Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(currentOrder.status);
    
    Alert.alert(
      `Order #${currentOrder.id} Status`,
      `Current Status: ${currentOrder.status}\nDelivery Partner: ${currentOrder.deliveryPartner.name}\nETA: ${currentOrder.deliveryPartner.eta}\n\nOrder Details:\n${currentOrder.items.map(item => `${item.name} x${item.quantity}`).join('\n')}`,
      [
        { text: 'OK', style: 'default' },
        { text: 'Call Partner', onPress: () => callDeliveryPartner() },
        { text: 'Simulate Progress', onPress: () => simulateOrderProgress() }
      ]
    );
  };

  const simulateOrderProgress = () => {
    const statuses = ['Order Received', 'Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(currentOrder.status);
    
    if (currentStatusIndex < statuses.length - 1) {
      const newStatus = statuses[currentStatusIndex + 1];
      setCurrentOrder({ ...currentOrder, status: newStatus });
      Alert.alert('Order Update', `Your order status has been updated to: ${newStatus}`);
      
      if (newStatus === 'Delivered') {
        setTimeout(() => {
          setCurrentOrder(null);
          Alert.alert('Order Completed', 'Thank you for choosing Spice Palace! Please rate your experience.');
        }, 2000);
      }
    }
  };

  // VIEW ORDER HISTORY FUNCTIONALITY
  const viewOrderHistory = () => {
    if (orderHistory.length === 0) {
      Alert.alert('No Order History', 'You haven\'t placed any orders yet.');
      return;
    }

    const historyText = orderHistory.map(order => 
      `Order #${order.id}\n${order.timestamp}\nTotal: $${order.total.toFixed(2)}\nStatus: ${order.status}`
    ).join('\n\n');

    Alert.alert('Order History', historyText);
  };

  // PROFILE FUNCTIONALITY
  const viewProfile = () => {
    if (!isLoggedIn) {
      Alert.alert('Login Required', 'Please login to view your profile.');
      return;
    }
    setShowProfileModal(true);
  };

  const updateProfile = () => {
    Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
    setShowProfileModal(false);
  };

  // SEARCH FUNCTIONALITY
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // CATEGORY FILTER FUNCTIONALITY
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  // FAVORITES FUNCTIONALITY
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
      Alert.alert('Removed from Favorites', 'Item removed from your favorites.');
    } else {
      setFavorites([...favorites, itemId]);
      Alert.alert('Added to Favorites', 'Item added to your favorites!');
    }
  };

  const viewFavorites = () => {
    if (favorites.length === 0) {
      Alert.alert('No Favorites', 'You haven\'t added any items to your favorites yet.');
      return;
    }

    const favoriteItems = foodMenu.filter(item => favorites.includes(item.id));
    const favoritesText = favoriteItems.map(item => `${item.name} - $${item.price}`).join('\n');
    
    Alert.alert('Your Favorites ❤️', favoritesText);
  };

  // CONTACT SUPPORT FUNCTIONALITY
  const contactSupport = () => {
    Alert.alert(
      'Contact Support',
      'How would you like to contact us?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Support', onPress: () => Linking.openURL('tel:+1-555-SPICE') },
        { text: 'Email Support', onPress: () => Linking.openURL('mailto:support@spicepalace.com') },
        { text: 'Live Chat', onPress: () => Alert.alert('Live Chat', 'Live chat feature coming soon!') }
      ]
    );
  };

  // RATE APP FUNCTIONALITY
  const rateApp = () => {
    Alert.alert(
      'Rate Spice Palace',
      'How would you rate your experience with our app?',
      [
        { text: '⭐', onPress: () => submitRating(1) },
        { text: '⭐⭐', onPress: () => submitRating(2) },
        { text: '⭐⭐⭐', onPress: () => submitRating(3) },
        { text: '⭐⭐⭐⭐', onPress: () => submitRating(4) },
        { text: '⭐⭐⭐⭐⭐', onPress: () => submitRating(5) }
      ]
    );
  };

  const submitRating = (rating) => {
    Alert.alert('Thank You!', `Thank you for your ${rating}-star rating! Your feedback helps us improve.`);
  };

  // EXPLORE FUNCTIONALITY
  const exploreRecommendations = () => {
    const recommendations = foodMenu.slice(0, 5);
    const recText = recommendations.map(item => `${item.name} - ${item.description}`).join('\n\n');
    Alert.alert('Chef\'s Recommendations 👨‍🍳', recText);
  };

  // LOGIN MODAL
  const LoginModal = () => (
    <Modal visible={showLoginModal} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={loginForm.email}
            onChangeText={(text) => setLoginForm({...loginForm, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={loginForm.password}
            onChangeText={(text) => setLoginForm({...loginForm, password: text})}
            secureTextEntry
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogin}>
              <Text style={styles.modalButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setShowLoginModal(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // REGISTER MODAL
  const RegisterModal = () => (
    <Modal visible={showRegisterModal} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <ScrollView contentContainerStyle={styles.modalScrollContent}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Register</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={registerForm.name}
              onChangeText={(text) => setRegisterForm({...registerForm, name: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={registerForm.email}
              onChangeText={(text) => setRegisterForm({...registerForm, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={registerForm.password}
              onChangeText={(text) => setRegisterForm({...registerForm, password: text})}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={registerForm.phone}
              onChangeText={(text) => setRegisterForm({...registerForm, phone: text})}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Address (Optional)"
              value={registerForm.address}
              onChangeText={(text) => setRegisterForm({...registerForm, address: text})}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleRegister}>
                <Text style={styles.modalButtonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setShowRegisterModal(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  // CHECKOUT MODAL
  const CheckoutModal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;

    return (
      <Modal visible={showCheckoutModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScrollContent}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Your Cart 🛒</Text>
              
              {cartItems.map(item => (
                <View key={item.id} style={styles.cartItem}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <View style={styles.cartItemControls}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                      <Text style={styles.removeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              
              <View style={styles.orderSummary}>
                <Text style={styles.summaryLine}>Subtotal: ${subtotal.toFixed(2)}</Text>
                <Text style={styles.summaryLine}>Delivery Fee: ${deliveryFee.toFixed(2)}</Text>
                <Text style={styles.summaryLine}>Tax: ${tax.toFixed(2)}</Text>
                <Text style={styles.totalLine}>Total: ${total.toFixed(2)}</Text>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={proceedToCheckout}>
                  <Text style={styles.modalButtonText}>Place Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setShowCheckoutModal(false)}>
                  <Text style={styles.modalButtonText}>Continue Shopping</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.clearButton]} onPress={clearCart}>
                  <Text style={styles.modalButtonText}>Clear Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  // PROFILE MODAL
  const ProfileModal = () => (
    <Modal visible={showProfileModal} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>My Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={userProfile.name}
            onChangeText={(text) => setUserProfile({...userProfile, name: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={userProfile.email}
            onChangeText={(text) => setUserProfile({...userProfile, email: text})}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={userProfile.phone}
            onChangeText={(text) => setUserProfile({...userProfile, phone: text})}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={userProfile.address}
            onChangeText={(text) => setUserProfile({...userProfile, address: text})}
            multiline
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={updateProfile}>
              <Text style={styles.modalButtonText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setShowProfileModal(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Food Menu Component
  const FoodMenu = () => (
    <View style={styles.menuContainer}>
      <Text style={styles.title}>Our Indian Menu 🍛</Text>
      
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for dishes..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.activeCategoryButton]}
            onPress={() => handleCategoryFilter(category)}
          >
            <Text style={[styles.categoryButtonText, selectedCategory === category && styles.activeCategoryButtonText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {filteredMenu.map(item => (
        <View key={item.id} style={styles.menuItem}>
          <View style={styles.menuItemInfo}>
            <View style={styles.menuItemHeader}>
              <Text style={styles.menuItemEmoji}>{item.image}</Text>
              <View style={styles.menuItemDetails}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemCategory}>{item.category}</Text>
                <Text style={styles.spiceLevel}>Spice: {item.spiceLevel}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Text style={styles.favoriteButton}>
                  {favorites.includes(item.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
            <Text style={styles.menuItemPrice}>${item.price}</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to Spice Palace - Indian Food Delivery!</Text>
        
        {/* Top Navigation */}
        <View style={styles.topNavigation}>
          <TouchableOpacity style={styles.cartButton} onPress={viewCart}>
            <Text style={styles.cartButtonText}>
              🛒 Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deliveryButton} onPress={showDeliveryPartners}>
            <Text style={styles.deliveryButtonText}>🏍️ Delivery Partners</Text>
          </TouchableOpacity>
          
          {isLoggedIn && (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Enhanced Navigation Menu */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => Alert.alert('Food Menu', 'Scroll down to see our delicious Indian menu!')}>
          <Text style={styles.navButtonText}>🍛 View Menu</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/(tabs)/explore')}>
          <Text style={styles.navButtonText}>🔍 Explore</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={trackOrder}>
          <Text style={styles.navButtonText}>📦 Track Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={viewFavorites}>
          <Text style={styles.navButtonText}>❤️ Favorites</Text>
        </TouchableOpacity>
      </View>

      {/* User Status and Quick Actions */}
      {isLoggedIn ? (
        <View style={styles.userInfo}>
          <Text style={styles.welcomeUser}>✅ Welcome back, {userProfile.name}!</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton} onPress={viewProfile}>
              <Text style={styles.quickActionText}>👤 Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={viewOrderHistory}>
              <Text style={styles.quickActionText}>📋 Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={contactSupport}>
              <Text style={styles.quickActionText}>📞 Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.guestInfo}>
          <Text style={styles.guestText}>👋 Welcome Guest! Please login for a better experience</Text>
          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.authButton} onPress={() => setShowLoginModal(true)}>
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton} onPress={() => setShowRegisterModal(true)}>
              <Text style={styles.authButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Current Order Status */}
      {currentOrder && (
        <View style={styles.orderStatus}>
          <Text style={styles.orderStatusTitle}>🚚 Current Order Status</Text>
          <Text style={styles.orderStatusText}>Order #{currentOrder.id}</Text>
          <Text style={styles.orderStatusText}>Status: {currentOrder.status}</Text>
          <Text style={styles.orderStatusText}>Partner: {currentOrder.deliveryPartner.name}</Text>
          <TouchableOpacity style={styles.trackButton} onPress={trackOrder}>
            <Text style={styles.trackButtonText}>Track Order</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Recommendations Section */}
      <View style={styles.recommendationsContainer}>
        <Text style={styles.sectionTitle}>👨‍🍳 Chef's Recommendations</Text>
        <TouchableOpacity style={styles.recommendationButton} onPress={exploreRecommendations}>
          <Text style={styles.recommendationButtonText}>View Recommendations</Text>
        </TouchableOpacity>
      </View>

      {/* Food Menu - Always visible */}
      <FoodMenu />

      {/* App Features Section */}
      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>🌟 App Features</Text>
        <View style={styles.featureButtons}>
          <TouchableOpacity style={styles.featureButton} onPress={rateApp}>
            <Text style={styles.featureButtonText}>⭐ Rate App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton} onPress={contactSupport}>
            <Text style={styles.featureButtonText}>💬 Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>🌟 Spice Palace - Authentic Indian Cuisine 🌟</Text>
        <Text style={styles.footerSubText}>Delivering happiness since 2020</Text>
        <Text style={styles.footerSubText}>📞 Call: +1-555-SPICE | 📧 Email: support@spicepalace.com</Text>
        
        <View style={styles.socialLinks}>
          <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/spicepalace')}>
            <Text style={styles.socialLink}>📘 Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/spicepalace')}>
            <Text style={styles.socialLink}>📷 Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/spicepalace')}>
            <Text style={styles.socialLink}>🐦 Twitter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modals */}
      <LoginModal />
      <RegisterModal />
      <CheckoutModal />
      <ProfileModal />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  cartButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    flex: 1,
    minWidth: 120,
    marginRight: 5,
  },
  cartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  deliveryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    flex: 1,
    minWidth: 120,
    marginRight: 5,
  },
  deliveryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 80,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexWrap: 'wrap',
  },
  navButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: '22%',
    marginVertical: 5,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  userInfo: {
    padding: 15,
    backgroundColor: '#E8F5E8',
    margin: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  welcomeUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  quickActionButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  quickActionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  guestInfo: {
    padding: 15,
    backgroundColor: '#FFF3E0',
    margin: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  guestText: {
    fontSize: 16,
    color: '#F57C00',
    textAlign: 'center',
    marginBottom: 10,
  },
  authButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  authButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 0.4,
  },
  authButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orderStatus: {
    padding: 15,
    backgroundColor: '#E3F2FD',
    margin: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  orderStatusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
    marginBottom: 10,
  },
  orderStatusText: {
    fontSize: 14,
    color: '#1976D2',
    textAlign: 'center',
    marginBottom: 5,
  },
  trackButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
  },
  trackButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  recommendationsContainer: {
    padding: 15,
    backgroundColor: '#FFF8E1',
    margin: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  recommendationButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
  },
  recommendationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  menuContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 15,
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#FF6B35',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  activeCategoryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 15,
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  menuItemEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  menuItemDetails: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItemCategory: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  spiceLevel: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: 'bold',
    marginTop: 2,
  },
  favoriteButton: {
    fontSize: 20,
    marginLeft: 10,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 80,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  featuresContainer: {
    padding: 15,
    backgroundColor: '#F3E5F5',
    margin: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  featureButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  featureButton: {
    backgroundColor: '#9C27B0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 0.45,
  },
  featureButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  footer: {
    padding: 20,
    backgroundColor: '#2E7D32',
    margin: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerSubText: {
    color: '#C8E6C9',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 5,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  socialLink: {
    color: '#C8E6C9',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 0.45,
  },
  cancelButton: {
    backgroundColor: '#757575',
  },
  clearButton: {
    backgroundColor: '#f44336',
    flex: 0.3,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  
  // Cart Modal Styles
  cartItem: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cartItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityButton: {
    backgroundColor: '#FF6B35',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  removeButton: {
    backgroundColor: '#f44336',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderSummary: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  summaryLine: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'right',
  },
  totalLine: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
    color: '#4CAF50',
  },
});