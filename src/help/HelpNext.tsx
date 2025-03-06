import React, {FC} from 'react';
import {View, Text, StatusBar} from 'react-native';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {showMessage} from 'react-native-flash-message';

//helpers
import {CustomButton, CustomInput, Title} from '../components';
import {colors} from '../theme';
import {useAppDispatch, useAppSelector} from '../hooks';
import {allqueriesAction, helpsAction} from '../redux/actions/helpAction';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthScreenParamList } from '../routes/RouteType';
type NavigationProp = StackNavigationProp<AuthScreenParamList>;
const HelpNext: FC = () => {
const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.help);
  const ITEMS_PER_PAGE = 25;

  const validationSchema = Yup.object({
    query_title: Yup.string()
      .min(1, 'Description must be at least 1 character')
      .max(300, 'Description must be at most 300 characters')
      .matches(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>\-_'"/:;₹+ ]+$/, {
        message:
          'Only letters, numbers, spaces, and special characters (_, -, ") are allowed',
        excludeEmptyString: true,
      })
      .required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      query_title: '',
    },
    validationSchema,
    onSubmit: async () => {
      try {
        const response = await dispatch(
          helpsAction({query_title: formik.values.query_title}),
        ).unwrap();

        if (response?.message) {
          showMessage({
            message: response.message,
            type: 'success',
          });
          navigation.goBack();
          dispatch(allqueriesAction({startIndex: 1, endIndex: ITEMS_PER_PAGE}));
        }
      } catch (error) {
        //@ts-ignore
        const errorMessage = error?.message;
        showMessage({
          message: errorMessage,
          type: 'danger',
        });
      }
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        hidden={false}
        barStyle="light-content"
      />
      <Title title="Raise Query" hasBackAction={true} 
      actions={[
    
        {
          icon: 'home-outline',
          onPress: () => navigation.navigate('BottomNavigator'),
        },
      ]}
      />

      <View
        style={{
          padding: 10,
          backgroundColor: colors.primary,
          borderRadius: 8,
          elevation: 3,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 0.5,
          margin: 10,
        }}>
        <View style={{}}>
          <CustomInput
            label="Description"
            value={formik.values.query_title}
            onChangeText={formik.handleChange('query_title')}
            onBlur={formik.handleBlur('query_title')}
            maxLength={200}
            containerStyle={{marginTop: 20}}
            placeholder="Description here"
          />
          {formik.touched.query_title && formik.errors.query_title && (
            <Text style={{color: 'red', fontSize: 12, marginTop: 5}}>
              {formik?.errors?.query_title}
            </Text>
          )}
        </View>

        <View style={{marginTop: 20}}>
          <CustomButton
            disabled
            style={{width: '100%'}}
            title="Submit Query"
            loading={loading}
            onPress={formik.handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default HelpNext;
