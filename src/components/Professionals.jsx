/**
 * Renders a list of professionals and allows the user to select a professional.
 * It also handles the logic for retrieving available professionals based on the schedule and preference.
 * 
 * @param {boolean} preferProfessional - Indicates if the user has a preferred by professionals or schedules.
 * @returns {JSX.Element} - The rendered component.
*/

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
import { getNameLastName } from "../utils/getNameLastName";

export const Professionals = ({ preferProfessional }) => {
  const [availableProfessional, setAvailableProfessional] = useState(null);

  const { schedule, setSchedule } = useContext(ScheduleContext);
  const { setSomethingWrong } = useContext(SomethingWrongContext);

  const professionalSelectedStyle = [styles.professional, { borderColor: globalStyles.orangeColor }];

  /**
  * Handles the selection of a professional.
  * @param {Object} professionalInfo - The information of the selected professional.
  */
  const handleProfessionalSelected = async (professionalInfo) => {
    setSchedule({
      ...schedule,
      professional: professionalInfo.name,
      professionalUid: professionalInfo.professionalUid
    });

  };

  useEffect(() => {
    (async () => {

      // If a day, schedule, and no preference for professional are set, fetch available professionals
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
      // Fetch all professionals if no conditions are met
      getAllProfessionals(handleProfessionalSelected, setAvailableProfessional, setSomethingWrong)

    })();

  }, [schedule.day, schedule.schedule]);

  // Render loading component if professionals are still being fetched
  if (availableProfessional === null) return <Loading />;

  // Render selected professional if only one is available
  if (availableProfessional?.length === 1) {
    const name = getNameLastName(availableProfessional[0].name).length > 20 ?
      getNameLastName(availableProfessional[0].name).slice(0, 10) + "..." :
      getNameLastName(availableProfessional[0].name)

    return (
      <TouchableOpacity
        style={[professionalSelectedStyle, { marginTop: 50 }]}
        activeOpacity={0.8}
      >
        <Text style={styles.professionalName}>{name}</Text>

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

  // Render message if there's not professionals in the database
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

  // Render message if no professionals are available for the selected schedule
  if (availableProfessional?.length === 0 && preferProfessional === false) {
    return (
      <Text style={styles.text}>Infelizmente o horario das {schedule.schedule} do dia {getDay(schedule)} de {getMonthName(schedule.day)} não está disponível</Text>
    )
  }

  // Render list of professionals
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
        availableProfessional.map((professional, index) => {
          const name = getNameLastName(availableProfessional[0].name).length > 20 ?
            getNameLastName(availableProfessional[0].name).slice(0, 10) + "..." :
            getNameLastName(availableProfessional[0].name)

          return (
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
              <Text style={styles.professionalName}>{name}</Text>

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
          )
        })
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
    padding: 5,
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
