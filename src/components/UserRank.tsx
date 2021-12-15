import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Icon from 'react-native-vector-icons/Feather';

interface userRank{
    index: number
    name: string;
    points: number;
 }

export default function UserRank(userData: userRank){
    return (
        <View style={styles.centeredView}>
            <View style={styles.cardView}>
                <View  style={styles.position}>
                    <Icon name="trash" size={25} color={colors.green_text}/>
                    <Text style={{...styles.text, position: 'absolute'}}>{userData.index}</Text>
                </View>
                        
                <Text style={styles.text}>{userData.name}</Text>
                <Text style={styles.text}>{userData.points}xp</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 5,
        justifyContent: "space-between",
      },
      cardView: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: colors.background_gray_light,
        borderRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
  
        elevation: 12,
        width: "70%",
        maxHeight: 50,
      },
      text: {
          fontFamily: fonts.text,
          fontSize: 18,
          color: colors.green_text
          
      },
      position: {
          alignItems: 'center',
          justifyContent: 'center',
      }
});