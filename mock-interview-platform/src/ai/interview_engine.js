/**
 * InterviewEngine - AI Conversational Interview State Machine & Question Generator
 * Manages interview rounds, domain-specific questions in EN, HI, GU, and generates
 * context-aware adaptive follow-up questions based on the candidate's responses.
 */

export class InterviewEngine {
  constructor(options = {}) {
    this.role = options.role || 'Full Stack Engineer';
    this.language = options.language || 'en';
    this.currentRoundIndex = 0;
    this.history = []; // Array of { question, response, followUp, timestamp }

    this.questionBank = {
      'Full Stack Engineer': {
        en: [
          {
            stage: 'Background & Project Architecture',
            question: "Could you walk me through the architecture of a full-stack application you built, focusing on how your frontend state connects with backend API layers and databases?"
          },
          {
            stage: 'Technical Deep-Dive: Distributed Scaling',
            question: "How would you design a distributed event ingestion pipeline to handle 100,000 requests per second while maintaining strict order and zero data loss?"
          },
          {
            stage: 'Behavioral & STAR Method',
            question: "Tell me about a high-pressure production outage you resolved. What was the exact root cause, how did you coordinate the hotfix, and what preventative measures did you introduce?"
          },
          {
            stage: 'Situational & Engineering Trade-Offs',
            question: "When would you deliberately choose an eventual consistency NoSQL model over ACID transactions, and how would you protect against duplicate writes?"
          }
        ],
        hi: [
          {
            stage: 'परिचय और प्रोजेक्ट आर्किटेक्चर',
            question: "कृपया अपने बनाए गए किसी फुल-स्टैक प्रोजेक्ट के आर्किटेक्चर के बारे में बताएं, जिसमें फ्रंटएंड, बैकएंड API और डेटाबेस का तालमेल स्पष्ट हो।"
          },
          {
            stage: 'सिस्टम डिज़ाइन: स्केलेबिलिटी',
            question: "1 लाख रिक्वेस्ट प्रति सेकंड संभालने के लिए आप Apache Kafka, Redis और लोड बैलेंसर का उपयोग कैसे करेंगे?"
          },
          {
            stage: 'समस्या निवारण (STAR Method)',
            question: "अपने अनुभव से कोई ऐसी घटना साझा करें जब अचानक प्रोडक्शन सर्वर डाउन हो गया हो। आपने समस्या का निवारण कैसे किया?"
          }
        ],
        gu: [
          {
            stage: 'પરિચય અને ટેકનિકલ પ્રોજેક્ટ',
            question: "તમારા ફૂલ-સ્ટેક પ્રોજેક્ટના આર્કિટેક્ચર વિશે જણાવો, ખાસ કરીને ડેટાબેઝ ઓપ્ટિમાઇઝેશન અને API ઇન્ટિગ્રેશન પર ધ્યાન કેન્દ્રિત કરીને."
          },
          {
            stage: 'સિસ્ટમ ડિઝાઇન',
            question: "હાઇ ટ્રાફિક અને લો લેટન્સી હેન્ડલ કરવા માટે તમે કેશિંગ અને માઇક્રોસર્વિસિસનું આયોજન કેવી રીતે કરશો?"
          }
        ]
      },
      'AI / ML Engineer': {
        en: [
          {
            stage: 'ML Architecture & Training',
            question: "Can you explain how you design and evaluate a multi-tenant LLM inference pipeline while minimizing GPU memory fragmentation and latency?"
          },
          {
            stage: 'Vector Search & RAG',
            question: "How do you mitigate hallucination and maintain fresh vector embeddings in a production Retrieval-Augmented Generation (RAG) system?"
          },
          {
            stage: 'Behavioral & Production Reliability',
            question: "Describe a situation where a deployed model exhibited subtle data drift in production. How did you diagnose and retrain it?"
          }
        ],
        hi: [
          {
            stage: 'मशीन लर्निंग आर्किटेक्चर',
            question: "प्रोडक्शन में LLM और न्यूरल नेटवर्क्स को डिप्लॉय करते समय आप लेटेंसी और GPU मेमोरी को कैसे ऑप्टिमाइज़ करते हैं?"
          }
        ],
        gu: [
          {
            stage: 'મશીન લર્નિંગ મોડેલિંગ',
            question: "મોડેલ ઓપ્ટિમાઇઝેશન અને પ્રોડક્શન મોનિટરિંગ માટે તમે કયા ટૂલ્સ અને સ્ટ્રેટેજી ઉપયોગ કરો છો?"
          }
        ]
      }
    };
  }

  setRole(role) {
    this.role = role;
    this.currentRoundIndex = 0;
  }

  setLanguage(language) {
    this.language = language;
  }

  getCurrentQuestion() {
    const roleQuestions = this.questionBank[this.role] || this.questionBank['Full Stack Engineer'];
    const langKey = (this.language === 'hi' || this.language === 'gu') ? this.language : 'en';
    const questions = roleQuestions[langKey] || roleQuestions.en;

    const current = questions[this.currentRoundIndex % questions.length];
    return {
      roundIndex: this.currentRoundIndex + 1,
      totalRounds: questions.length,
      stage: current.stage,
      question: current.question
    };
  }

  nextQuestion() {
    const roleQuestions = this.questionBank[this.role] || this.questionBank['Full Stack Engineer'];
    const langKey = (this.language === 'hi' || this.language === 'gu') ? this.language : 'en';
    const questions = roleQuestions[langKey] || roleQuestions.en;

    this.currentRoundIndex = (this.currentRoundIndex + 1) % questions.length;
    return this.getCurrentQuestion();
  }

  /**
   * Generates a context-aware follow-up question dynamically analyzing the candidate's answer.
   */
  generateAdaptiveFollowUp(candidateAnswer) {
    const lower = candidateAnswer.toLowerCase();
    let followUpText = "";
    let reasoning = "";

    if (lower.includes("kafka") || lower.includes("queue") || lower.includes("rabbitmq")) {
      followUpText = (this.language === 'hi') 
        ? "यदि किसी विशेष की (Key) पर बहुत अधिक डेटा आने से पार्टीशन में लोड असंतुलन (Partition Skew) हो जाए, तो आप इसे कैसे संभालेंगे?"
        : "You mentioned message queues. How do you mitigate 'hot partition' issues when traffic is heavily skewed toward a small set of IDs?";
      reasoning = "Probing distributed partition skew & queue resilience.";
    } else if (lower.includes("redis") || lower.includes("cache")) {
      followUpText = (this.language === 'hi')
        ? "कैश इनवैलिडेशन (Cache Invalidation) और कैश स्टैम्पीड (Cache Stampede) से बचने के लिए आपकी क्या रणनीति होगी?"
        : "How do you protect the underlying database against a 'cache stampede' when high-traffic cache keys expire simultaneously?";
      reasoning = "Probing caching edge cases and database thundering-herd resilience.";
    } else if (lower.includes("um") || lower.includes("basically") || candidateAnswer.length < 50) {
      followUpText = "Could you walk through the concrete failure modes of that approach? What happens if the primary node crashes during write?";
      reasoning = "Answer lacked depth; probing failure recovery mechanisms.";
    } else {
      followUpText = "That's a solid high-level architecture. What is the single biggest performance bottleneck or trade-off you accepted in that design?";
      reasoning = "Testing trade-off analysis and architectural self-critique.";
    }

    this.history.push({
      roundIndex: this.currentRoundIndex,
      candidateAnswer,
      followUp: followUpText,
      timestamp: Date.now()
    });

    return {
      followUpText,
      reasoning
    };
  }
}
