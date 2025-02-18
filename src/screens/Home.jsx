import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";

import { UserContext } from "../context/UserContext";
import { SomethingWrongContext } from "../context/SomethingWrongContext";
import { ScheduleContext } from "../context/ScheduleContext";
import { AppSettingsContext } from "../context/AppSettings";

import { useIsFocused } from "@react-navigation/native";

import { globalStyles } from "../assets/globalStyles";

import { HeaderScreens } from "../components/HeaderScreens";
import { Menu } from "../components/Menu";
import { Schedule } from "../components/Schedule";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { ShowProfessionalsDaySchedules } from "../components/ShowProfessionalsDaySchedules";
import { NoSchedule } from "../components/NoSchedule";
import { SchedulesLimitAnimation } from "../components/SchedulesLimitAnimation";
import { AlertValidatePhoneNumber } from "../components/modals/AlertValidatePhoneNumber";

import { listenerGetLastedScheduleOfClient } from "../services/user/listenerGetLastedScheduleOfClient";

import { getPreviousScreensName } from "../utils/getPreviousScreensName";

import { userSchedulesCount } from "../validation/userSchedulesCount";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const Home = ({ navigation }) => {
  const [scheduleClientInfo, setScheduleClientInfo] = useState(undefined);
  const [preferProfessional, setPreferProfessional] = useState(false);
  const [canScrollToEnd, setCanScrollToEnd] = useState(false)
  const [schedulesUserCount, setSchedulesUserCount] = useState(null)
  const [showModalPhoneNotValidated, setShowModalPhoneNotValidated] = useState(false)

  const { userData } = useContext(UserContext);
  const { setSomethingWrong } = useContext(SomethingWrongContext)
  const { schedule } = useContext(ScheduleContext)
  const { settings } = useContext(AppSettingsContext)

  const allFieldsAreFilled = (schedule.professional && schedule.day && schedule.schedule) ? true : false

  const scrollViewRef = useRef();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }

  }, [isFocused]);


  useEffect(() => {
    listenerGetLastedScheduleOfClient(userData, setScheduleClientInfo, setSomethingWrong)
    userData && userSchedulesCount(userData.uid, setSchedulesUserCount, setSomethingWrong)

  }, [userData]);

  useEffect(() => {
    (async () => {

      const [previousScreen, lastScreen] = getPreviousScreensName(navigation, setSomethingWrong)

      const time = await AsyncStorage.getItem("@barber_app__phone_verification_time")
      if (time) {
        if (
          !userData?.phoneNumberValidated &&
          (previousScreen === "Welcome" || previousScreen === "Login") && lastScreen === "Home"
        ) {
          setShowModalPhoneNotValidated(true)
        }
      } else {
        if (
          !userData?.phoneNumberValidated &&
          (previousScreen === "Welcome" || previousScreen === "Login") && lastScreen === "Home"
        ) {
          setShowModalPhoneNotValidated(true)
        }
      }

    })();

  }, [userData])


  const preferProfessionalStyle__Yes = preferProfessional
    ? [
      styles.btn,
      {
        backgroundColor: globalStyles.orangeColor,
        borderColor: "transparent",
      },
    ]
    : styles.btn;
  const preferProfessionalStyle__No = !preferProfessional
    ? [
      styles.btn,
      {
        backgroundColor: globalStyles.orangeColor,
        borderColor: "transparent",
      },
    ]
    : styles.btn;

  const screenWidth = Dimensions.get('window').width;

  if (scheduleClientInfo === undefined) return <Loading flexSize={1} />

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={globalStyles.container}
        onContentSizeChange={() => canScrollToEnd && scrollViewRef.current.scrollToEnd({ animated: true })}
        overScrollMode="never"
        bounces={false}
      >
        <HeaderScreens screenName={settings?.companyName} />
        <AlertValidatePhoneNumber
          visible={showModalPhoneNotValidated}
          setVisible={setShowModalPhoneNotValidated}
        />

        {scheduleClientInfo ? (
          <>
            <Text style={styles.title}>Seu agendamento mais próximo</Text>
            <Schedule schedule={scheduleClientInfo} />
          </>
        ) :
          (
            <NoSchedule width={screenWidth} />
          )
        }

        <View style={styles.line}></View>

        {
          (schedulesUserCount < 2) &&
          <Text style={styles.title}>
            Agende {schedulesUserCount === 0 ? "um" : "mais um"} horário
          </Text>
        }

        {
          schedulesUserCount < 2 &&
          <>
            <Text style={styles.text}>Tem preferencia por profissional?</Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={preferProfessionalStyle__Yes}
                activeOpacity={0.8}
                onPress={() => setPreferProfessional(true)}
              >
                <Text
                  style={
                    preferProfessional
                      ? {
                        fontFamily: globalStyles.fontFamilyBold,
                        color: "#FFFFFF",
                      }
                      : {
                        fontFamily: globalStyles.fontFamilyBold,
                        color: "#000000",
                      }
                  }
                >
                  Sim
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={preferProfessionalStyle__No}
                activeOpacity={0.8}
                onPress={() => setPreferProfessional(false)}
              >
                <Text
                  style={
                    !preferProfessional
                      ? {
                        fontFamily: globalStyles.fontFamilyBold,
                        color: "#FFFFFF",
                      }
                      : {
                        fontFamily: globalStyles.fontFamilyBold,
                        color: "#000000",
                      }
                  }
                >
                  Não
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }

        {
          schedulesUserCount < 2 ?
            <ShowProfessionalsDaySchedules
              preferProfessional={preferProfessional}
              setCanScrollToEnd={setCanScrollToEnd}
            /> :
            <>
              <SchedulesLimitAnimation width={screenWidth} height={400} />
              <Text style={styles.text}>Você atingiu o limite de agendamentos  </Text>
            </>
        }

        {
          allFieldsAreFilled && (
            <Button
              text={"Continuar"}
              action={() =>
                navigation.navigate("OurServices", {
                  scheduleToUpdate: null,
                  isToUpdateSchedule: false,
                })
              }
              addStyles={{ marginTop: 40 }}
            />
          )
        }

      </ScrollView>
      <Menu />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: globalStyles.fontSizeMedium,
    fontFamily: globalStyles.fontFamilyBold,
    color: "#000000",
    width: "100%",
  },

  text: {
    color: "#000000",
    fontFamily: globalStyles.fontFamilyMedium,
    width: "100%",
    fontSize: globalStyles.fontSizeSmall,
    textAlign: "center",
    marginTop: 30,
  },

  line: {
    marginVertical: 50,
    borderTopWidth: 0.3,
    height: 0,
    width: "100%",
  },

  btn: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#00000020",
    width: "35%",
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 20,
    fontFamily: globalStyles.fontFamilyMedium
  },
});
