import { ScrollView, StyleSheet, Text } from "react-native"

import { globalStyles } from "../assets/globalStyles"

import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"

export const PrivacyPolicies = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <ComeBack />

            <Text style={styles.title}>Política de Privacidade</Text>
            <Text style={styles.text}>
                Ao utilizar nossos serviços, podemos coletar informações pessoais como nome, endereço de e-mail, número de telefone e outras informações relevantes para o uso do nosso aplicativo/site.
            </Text>
            <Text style={styles.text}>
                Além disso, podemos coletar informações não pessoais, como dados de uso anônimos, estatísticas sobre a forma de uso da nossa plataforma e informações de localização.
            </Text>

            <Text style={styles.subTitle}>
                Uso das informações
            </Text>
            <Text style={styles.text}>
                As informações coletadas serão utilizadas para melhorar a experiência do usuário em nosso aplicativo/site e fornecer um serviço mais personalizado.
            </Text>
            <Text style={styles.text}>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais para fins comerciais.
            </Text>

            <Text style={styles.subTitle}>
                Alterações à Política de Privacidade
            </Text>
            <Text style={styles.text}>
                Podemos atualizar periodicamente esta Política de Privacidade para refletir mudanças em nossos serviços ou em nossas práticas de privacidade. Se fizermos alterações materiais nesta política, notificaremos você aqui, por e-mail ou por meio de um aviso em nosso site antes que as alterações entrem em vigor.
            </Text>

            <Button
                text={"Voltar"}
                action={() => navigation.goBack()}
                addStyles={{ marginTop: 50 }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: globalStyles.fontSizeLarger,
        color: "#000000",
        width: "100%",
        marginVertical: 20,
        fontFamily: globalStyles.fontFamilyBold
    },

    subTitle: {
        fontSize: globalStyles.fontSizeMedium,
        color: "#000000",
        width: "100%",
        marginTop: 30,
        fontFamily: globalStyles.fontFamilyBold
    },

    text: {
        fontSize: globalStyles.fontSizeSmall,
        color: "#000000",
        textAlign: "left",
        width: "100%",
        marginVertical: 8,  
        fontFamily: globalStyles.fontFamilyMedium
    }
})