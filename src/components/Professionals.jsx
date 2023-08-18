import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { globalStyles } from "../assets/globalStyles";
import DefaultPicture from "../assets/icons/DefaultPicture.png"

import { ScheduleContext } from "../context/ScheduleContext";
import { SomethingWrongContext } from "../context/SomethingWrongContext";

import { Loading } from "./Loading";
import { NoProfessionals } from "./NoProfessionals";

import { getAvailableProfessional } from "../services/schedules/getAvailableProfessional";
import { getAllProfessionals } from "../services/schedules/getAllProfessionals";

import { getDay } from "../utils/dateHelper";
import { getMonthName } from "../utils/getMonthName";

export const Professionals = ({ preferProfessional }) => {
  const [availableProfessional, setAvailableProfessional] = useState(null);

  const { schedule, setSchedule } = useContext(ScheduleContext);
  const { setSomethingWrong } = useContext(SomethingWrongContext);

  const professionalSelectedStyle = [styles.professional, { borderColor: globalStyles.orangeColor }];

  const handleProfessionalSelected = async (professionalInfo) => {
    setSchedule({
      ...schedule,
      professional: professionalInfo.name,
      professionalUid: professionalInfo.professionalUid
    });

  };

  useEffect(() => {
    (async () => {

      if (schedule.day && schedule.schedule && preferProfessional === false) {
        setAvailableProfessional(null)

        await getAvailableProfessional(
          schedule,
          setAvailableProfessional,
          handleProfessionalSelected,
          setSomethingWrong
        );

        return
      }

      getAllProfessionals(handleProfessionalSelected, setAvailableProfessional, setSomethingWrong)
    })();

  }, [schedule.day, schedule.schedule]);

  if (availableProfessional === null) return <Loading />;

  if (availableProfessional?.length === 1) {
    return (
      <TouchableOpacity
        style={[professionalSelectedStyle, { marginTop: 50 }]}
        activeOpacity={0.8}
      >
        <Text style={styles.professionalName}>{availableProfessional[0].name}</Text>

        {availableProfessional[0].profilePicture ? (
          <Image
            source={{ uri: availableProfessional[0].profilePicture }}
            style={styles.img}
          />
        ) : (
          <Image
            source={DefaultPicture}
            style={styles.img}
          />
        )}
      </TouchableOpacity>
    )
  }

  if (availableProfessional === undefined) {
    return (
      <>
        <Text style={[styles.text, { fontSize: globalStyles.fontSizeSmall, textAlign: "center" }]}>
          Até o presente momento nenhum profissional foi cadastrado no sistema, entre em
          <Text
            style={{ color: globalStyles.orangeColor, fontSize: globalStyles.fontSizeSmall, textDecorationLine: "underline", fontFamily: globalStyles.fontFamilyMedium }}
            onPress={() => { }}
          >
            {" "}contato{" "}
          </Text>
          com sua barbearia para mais informações.
        </Text>

        <NoProfessionals />
      </>
    );
  }

  if (availableProfessional?.length === 0 && preferProfessional === false) {
    return (
      <Text style={styles.text}>Infelizmente o horario das {schedule.schedule} do dia {getDay(schedule)} de {getMonthName(schedule.day)} não está disponível</Text>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
        {
          preferProfessional ?
            <Text style={styles.text}>
              Escolha o profissional de preferência
            </Text> :
            <Text style={styles.text}>Profissionais disponíveis</Text>
        }

        <Text style={[styles.text, { color: globalStyles.orangeColor, fontFamily: globalStyles.fontFamilyBold }]}>{preferProfessional ? "1 / 3" : "3 / 3"}</Text>

      </View>
      {
        availableProfessional.map((professional, index) => (
          <TouchableOpacity
            style={
              schedule.professional === professional.name
                ? professionalSelectedStyle
                : styles.professional
            }
            activeOpacity={0.8}
            onPress={() => handleProfessionalSelected(professional)}
            key={index}
          >
            <Text style={styles.professionalName}>{professional.name}</Text>

            {professional.profilePicture ? (
              <Image
                source={{ uri: professional.profilePicture }}
                style={styles.img}
              />
            ) : (
              <Image
                source={DefaultPicture}
                style={styles.img}
              />
            )}
          </TouchableOpacity>
        ))
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  professional: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#00000010",
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "100%"
  },

  img: {
    width: 125,
    height: 125,
    borderRadius: 150,
  },

  professionalName: {
    fontSize: globalStyles.fontSizeMedium,
    fontFamily: globalStyles.fontFamilyBold,
    color: "#000000",
  },

  text: {
    color: "#000000",
    fontFamily: globalStyles.fontFamilyBold,
    fontSize: globalStyles.fontSizeSmall,
    marginTop: 50,
    marginBottom: 10,
  },
});
