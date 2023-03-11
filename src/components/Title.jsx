import {Text, StyleSheet} from 'react-native';

export const Title = ({title}) => {
  return <Text style={style.title}>{title}</Text>;
};

const style = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: 'Satoshi-Bold',
    color: '#FFFFFF',
    paddingHorizontal: 10,
    width: '100%',
    textAlign: 'center',
  },
});
