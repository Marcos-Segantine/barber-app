import {ActivityIndicator, View, Platform} from 'react-native';

export const LoadingAnimation = ({isToShow = true}) => {
  const os = Platform.OS;

  return (
    <View style={isToShow ? {marginTop: '20%'} : {display: 'none'}}>
      <ActivityIndicator
        size={os === 'android' ? 100 : 'large'}
        color="#E95401"
      />
    </View>
  );
};
