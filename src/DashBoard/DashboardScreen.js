import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Alert,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomButton from '../../components/CustomButton';
import {Images} from '../../assets/Images';
import {fetchMedicines} from '../../network/Api';
import Header from '../../components/Header';
const DashboardScreen = ({route,navigation}) => {
  const {user} = route?.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [medicinesForToday, setMedicinesForToday] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowPicker(false);
    setSelectedDate(currentDate);
  };
  const fetchMedicinesForDate = async () => {
    setLoading(true);
    try {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      const response = await fetchMedicines(formattedDate);
      if (response.success) {
        const {medicines_for_today, user} = response.data;
        setMedicinesForToday(medicines_for_today); // Set the medicines data
        setLoading(false);
        if (medicines_for_today.length === 0) {
          setLoading(false);
          Alert.alert('No Medicines', 'No medicines found for selected date.');
        }
      } else {
        setLoading(false);
        Alert.alert(
          'Error',
          response.data.message || 'Failed to fetch medicines',
        );
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  };
  const handleLogin = () => {
    fetchMedicinesForDate();
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Dashboard'} />
      <View style={styles.container}>
        <View style={styles.datePickerContainer}>
          <Text style={styles.label}>Selected Date:</Text>
          <Text style={styles.selectedDate}>
            {moment(selectedDate).format('MMMM D, YYYY')}
          </Text>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Image source={Images.calender} style={styles.image} />
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.userContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={user?.user_image ? {uri: user.user_image} : Images.user}
              style={styles.userImage}
            />
            <View style={{marginHorizontal: 20}}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userDetails}>{user?.email}</Text>
              <Text style={styles.userDetails}>{user?.patient_unique_id}</Text>
              <Text style={styles.userDetails}>{user?.dob}</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Image
              source={Images.logout}
              style={styles.logoutImage}
              
            />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.medicinesContainer}>
          <Text style={styles.sectionTitle}>Medicines for Today</Text>
          {medicinesForToday.length === 0 ? (
            <Text style={{color: '#fff'}}>No medicines found for today.</Text>
          ) : (
            <FlatList
              data={medicinesForToday}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View style={styles.medicineItem}>
                  <Text style={styles.details}>
                    Name : {item.medicine_name}
                  </Text>
                  <Text style={styles.details}>
                    Strength : {item.medicine_strength}
                  </Text>
                  <Text style={styles.details}>
                    Frequency : {item.frequency.name}
                  </Text>
                  <Text style={styles.details}>Type : {item.type.name}</Text>
                  <Text style={styles.details}>Unit : {item.unit.name}</Text>
                  {Array.isArray(item.usermedicineshedule) &&
                  item.usermedicineshedule.length > 0 ? (
                    item.usermedicineshedule.map(schedule => (
                      <View key={schedule.id}>
                        <Text style={{color: '#fff'}}>
                          Time: {schedule.time}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text style={{color: '#fff'}}>
                      No schedule found for this medicine.
                    </Text>
                  )}
                </View>
              )}
            />
          )}
        </View>
      </View>
      <CustomButton
        title={'Fetch Medicines'}
        onPress={handleLogin}
        loader={loading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
  },
  datePickerContainer: {
    marginBottom: 20,
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 12,
    color: '#fff',
  },
  medicinesContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  medicineItem: {},
  image: {
    height: 30,
    width: 30,
  },
  details: {
    color: '#fff',
    marginVertical: 5,
    fontSize: 16,
  },
  userContainer: {
    marginVertical: 10,
  },
  userImage: {
    height: 80,
    width: 80,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  userDetails: {
    color: '#787878',
    fontWeight: '800',
  },
  logoutImage:{
    height:30,
    width:30,
   
  }
});

export default DashboardScreen;
