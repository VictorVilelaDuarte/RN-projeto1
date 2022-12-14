import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";

import Participant from "../../components/Participant";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");
  // const participants = [
  //   "Victor Vilela Duarte",
  //   "Jessica Aparecia Evangelista",
  //   "Claudineia Vilela de Magalhães Duarte",
  //   "Wagner de Paula Duarte",
  //   "Melissa Vilela Duarte",
  //   "Tommy Vilela Duarte",
  //   "Maria Aparecida de Barros",
  //   "Rosa de Paula Duarte",
  //   "Saul Goodman",
  //   "Cássio Ramos",
  //   "Roger Guedes",
  // ];

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Paricipante repetido",
        "Já existe um participante com esse nome"
      );
    }

    setParticipants((prevState) => [...prevState, participantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: "Excluir",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          ),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Jogo do Brasil</Text>
      <Text style={styles.eventDate}>Quinta, 24 de Novembro de 2022</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Node do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>LISTA VAZIA...</Text>
        )}
      />
    </View>
  );
}
