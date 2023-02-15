import { View, StyleSheet, Pressable, Text } from "react-native"
import { useContext, useState } from "react"
import { ShedulesUserContext } from "../../context/ShedulesUser"
import { Title } from "../../components/Title"
import { Button } from "../../components/Button"
import { globalStyles } from "../globalStyles"

export const Professionals = ({ navigation }) => {
  const [professionalUserSelected, setProfessionalUserSelected] = useState()
  const { shedulesUser, setShedulesUser } = useContext(ShedulesUserContext)

  const handleProfessionalSelection = (professional) => {
    setShedulesUser({...shedulesUser, professional})
    setProfessionalUserSelected(professional)
  }

  const handleButton = () => {
    if (!shedulesUser.professional) {
      console.log("NAO SELECIONOU UM PROFISSIONAL")
      return
    }
    navigation.navigate("Calandar")
  }   

  return(
    <View style={globalStyles.container}>
      <Title title="Selecione um Profissional" />
      <View style={style.contentProfessionals}>
        {["Barbeiro 1", "Barbeiro 2", "Barbeiro 3"].map((professional) => (
          <Pressable
            key={professional}
            style={[
              style.professionals,
              professionalUserSelected === professional && style.professionalsSelected
            ]}
            onPress={() => handleProfessionalSelection(professional)}
          >
            <Text style={style.professionalName}>{professional}</Text>
          </Pressable>
        ))}
      </View>
      <Button text="Comfirmar" action={handleButton} waitingData={!!shedulesUser.professional} />
    </View>
  )
}

const style = StyleSheet.create({
  contentProfessionals: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  professionals: {
    width: 150,
    height: 150,
    margin: 10,
    borderColor: '#E95401',
    borderWidth: 2,
  },

  professionalsSelected: {
    borderWidth: 5,
  },

  professionalName: {
    color: "#FFFFFF",
    fontWeight: '700',
    position: 'absolute',
    bottom: 10,
    left: 5
  }
})
