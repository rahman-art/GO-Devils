import {decode} from 'base64-arraybuffer';
import axios from 'axios';
import notifee, {AndroidImportance} from '@notifee/react-native';



const getLocationPincode = async (value: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${value.latitude},${value.longitude}&key=AIzaSyD0U4g__-mome5wJn6mHKOKRb39q4LMzT4&timestamp=${Date.now()}`,
    );
    const data = await response.json();
   
    if (data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      for (const component of addressComponents) {
        if (component.types.includes('postal_code')) {
          
          return component.short_name;
        }
      }
    }
  } catch (error: any) {
   
    return 'Something went wrong';
  }
};

const getLatLong = async (address: string) => {
  try {
    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyD0U4g__-mome5wJn6mHKOKRb39q4LMzT4`,
    );
    return data;
  } catch (error) {
    return 'Somethin went wrong';
  }
};

export async function createChannel() {
  await notifee.createChannel({
    id: 'orders',
    name: 'Firing alarms & timers',
    lights: true,
    vibration: true,
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });
}

export { getLocationPincode, getLatLong};
