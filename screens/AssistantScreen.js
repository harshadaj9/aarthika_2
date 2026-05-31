import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import * as Speech from "expo-speech";

import {
  useLanguage,
} from "../context/LanguageContext";

import translations from "../constants/translations";

import {
  askGemini,
} from "../api/gemini";

import BackButton from "../components/BackButton";

export default function AssistantScreen({
  navigation,
}) {

  const { language } =
    useLanguage();

  const t =
    translations[language];

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    listening,
    setListening,
  ] = useState(false);
const [
  isSpeaking,
  setIsSpeaking,
] = useState(false);

const [
  voiceEnabled,
  setVoiceEnabled,
] = useState(true);
  const [
    chat,
    setChat,
  ] = useState([

    {

      id: "1",

      sender: "bot",

      text:

        language === "Hindi"

          ? "नमस्ते 👋 मैं आपकी वित्तीय सहायक हूँ।"

          : language === "Marathi"

          ? "नमस्कार 👋 मी तुमची आर्थिक सहाय्यक आहे."

          : "Hello 👋 I am your AI Financial Assistant.",

    },

  ]);

  // VOICE INPUT

  const startVoiceInput =
    async () => {

      setListening(true);

      setTimeout(() => {

        if (
          language === "Hindi"
        ) {

          setMessage(
            "मुझे बचत के तरीके बताओ"
          );

        } else if (
          language === "Marathi"
        ) {

          setMessage(
            "मला बचतीचे मार्ग सांगा"
          );

        } else {

          setMessage(
            "Give me saving tips"
          );

        }

        setListening(false);

      }, 2000);

    };
const stopSpeaking = () => {

  Speech.stop();

  setIsSpeaking(false);

};

useEffect(() => {

  return () => {

    Speech.stop();

  };

}, []);
  // SEND MESSAGE

  const sendMessage =
    async () => {

      if (
        !message.trim()
      ) return;

      const userMessage = {

        id:
          Date.now().toString(),

        sender: "user",

        text: message,

      };

      setChat((prev) => [

        ...prev,
        userMessage,

      ]);

      const userText =
        message;

      setMessage("");

      setLoading(true);

      try {

        const aiReply =
          await askGemini(
            userText,
            language
          );

        const botMessage = {

          id:
            Date.now().toString() +
            "bot",

          sender: "bot",

          text: aiReply,

        };

        setChat((prev) => [

          ...prev,
          botMessage,

        ]);

       if (voiceEnabled) {

  Speech.speak(
    aiReply,
    {

      language:
        language === "Hindi"
          ? "hi-IN"
          : language === "Marathi"
          ? "mr-IN"
          : "en-US",

      onStart: () =>
        setIsSpeaking(true),

      onDone: () =>
        setIsSpeaking(false),

      onStopped: () =>
        setIsSpeaking(false),

    }
  );

}

      } catch (error) {

        alert(

          language === "Hindi"

            ? "AI त्रुटि"

            : language === "Marathi"

            ? "AI त्रुटी"

            : "AI Error"

        );

      }

      setLoading(false);

    };

  return (

    <SafeAreaView
      style={styles.safeContainer}
    >

      <KeyboardAvoidingView

        style={styles.container}

        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }

      >

        {/* BACK */}

        <BackButton
          navigation={navigation}
        />

        {/* HEADER */}

        <View style={styles.headerContainer}>

          <Text style={styles.title}>
            {t.aiAssistant}
          </Text>

          <Text style={styles.subtitle}>

            {

              language === "Hindi"

                ? "अपने वित्तीय प्रश्न पूछें"

                : language === "Marathi"

                ? "तुमचे आर्थिक प्रश्न विचारा"

                : "Ask your financial questions"

            }

          </Text>

        </View>

        {/* CHAT */}

        <FlatList

          data={chat}

          keyExtractor={(item) =>
            item.id
          }

          showsVerticalScrollIndicator={
            false
          }

          contentContainerStyle={{
            paddingBottom: 30,
          }}

          renderItem={({ item }) => (

            <View

              style={[

                styles.messageBox,

                item.sender === "user"

                  ? styles.userMessage

                  : styles.botMessage,

              ]}

            >

              <Text

                style={[

                  styles.messageText,

                  item.sender === "user"

                    ? {
                        color:
                          "white",
                      }

                    : {
                        color:
                          "#F5F5F5",
                      },

                ]}

              >

                {item.text}

              </Text>

            </View>

          )}

        />

        {/* LISTENING */}

        {

          listening && (

            <Text
              style={
                styles.listeningText
              }
            >

              {

                language === "Hindi"

                  ? "सुन रहा हूँ..."

                  : language === "Marathi"

                  ? "ऐकत आहे..."

                  : "Listening..."

              }

            </Text>

          )

        }

        {/* LOADING */}

        {

          loading && (

            <ActivityIndicator

              size="large"

              color="#4CAF50"

              style={{
                marginBottom: 10,
              }}

            />

          )

        }
<TouchableOpacity
  style={styles.voiceToggle}
  onPress={() =>
    setVoiceEnabled(
      !voiceEnabled
    )
  }
>

  <Text
    style={styles.voiceToggleText}
  >

    {
      voiceEnabled
        ? "🔊 Voice ON"
        : "🔇 Voice OFF"
    }

  </Text>

</TouchableOpacity>

{
  isSpeaking && (

    <TouchableOpacity
      style={styles.stopButton}
      onPress={stopSpeaking}
    >

      <Text
        style={styles.stopText}
      >
        🛑 Stop Voice
      </Text>

    </TouchableOpacity>

  )
}
        {/* INPUT */}

        <View style={styles.inputContainer}>

          <TextInput

            placeholder={

              language === "Hindi"

                ? "वित्तीय प्रश्न पूछें"

                : language === "Marathi"

                ? "आर्थिक प्रश्न विचारा"

                : "Ask financial question"

            }

            placeholderTextColor="#999"

            style={styles.input}

            value={message}

            onChangeText={
              setMessage
            }

          />

          {/* MIC */}

          <TouchableOpacity

            style={styles.iconButton}

            onPress={
              startVoiceInput
            }

          >

            <Ionicons

              name="mic"

              size={24}

              color="white"

            />

          </TouchableOpacity>

          {/* SEND */}

          <TouchableOpacity

            style={styles.sendButton}

            onPress={sendMessage}

          >

            <Ionicons

              name="send"

              size={22}

              color="white"

            />

          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  safeContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },

  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 90,
  },

  headerContainer: {
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CAF50",
  },

  subtitle: {
    color: "#AAAAAA",
    marginTop: 8,
    fontSize: 16,
  },

  messageBox: {
    padding: 16,
    borderRadius: 22,
    marginBottom: 14,
    maxWidth: "82%",
  },

  userMessage: {
    backgroundColor: "#2E7D32",
    alignSelf: "flex-end",
    borderBottomRightRadius: 5,
  },

  botMessage: {
    backgroundColor: "#1E1E1E",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 5,
  },

  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },

  listeningText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
  },
  voiceToggle: {

  backgroundColor: "#1976D2",

  padding: 12,

  borderRadius: 12,

  alignItems: "center",

  marginBottom: 10,

},

voiceToggleText: {

  color: "white",

  fontWeight: "bold",

},

stopButton: {

  backgroundColor: "#D32F2F",

  padding: 12,

  borderRadius: 12,

  alignItems: "center",

  marginBottom: 10,

},

stopText: {

  color: "white",

  fontWeight: "bold",

},

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    borderRadius: 18,
    padding: 16,
    color: "white",
    borderWidth: 1,
    borderColor: "#333",
    marginRight: 10,
  },

  iconButton: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 16,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 16,
  },

});