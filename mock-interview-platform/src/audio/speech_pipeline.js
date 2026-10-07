/**
 * SpeechPipeline - Audio, Speech Recognition & Vocal Telemetry Module
 * Handles Multilingual ASR (English, Hindi, Gujarati), Words Per Minute (WPM) tracking,
 * filler word analysis, and Speech Synthesis (TTS) for the AI Interviewer persona.
 */

export class SpeechPipeline {
  constructor(options = {}) {
    this.language = options.language || 'en';
    this.recognition = null;
    this.isListening = false;
    this.onTranscriptChunk = options.onTranscriptChunk || null;
    this.onMetricsUpdate = options.onMetricsUpdate || null;
    this.onWaveformTick = options.onWaveformTick || null;

    this.speechStartTime = null;
    this.wordCount = 0;
    this.fillerWordsDetected = [];
    this.fillerDictionary = {
      en: ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'sort of', 'i mean'],
      hi: ['मतलब', 'यानी', 'जैसे कि', 'अं', 'उंह', 'मतलब कि'],
      gu: ['જેમ કે', 'એટલે કે', 'હું કઉં', 'મતલબ'],
      hinglish: ['um', 'uh', 'मतलब', 'basically', 'like', 'यानी']
    };

    this.waveformInterval = null;
    this._initSpeechRecognition();
  }

  setLanguage(lang) {
    this.language = lang;
    if (this.recognition) {
      if (lang === 'hi') this.recognition.lang = 'hi-IN';
      else if (lang === 'gu') this.recognition.lang = 'gu-IN';
      else this.recognition.lang = 'en-US';
    }
  }

  _initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('[SpeechPipeline] Web Speech Recognition API not natively supported in this browser.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.setLanguage(this.language);

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const activeText = finalTranscript || interimTranscript;
      this._analyzeSpeechAcoustics(activeText);

      if (this.onTranscriptChunk) {
        this.onTranscriptChunk({
          final: finalTranscript,
          interim: interimTranscript,
          full: activeText
        });
      }
    };

    this.recognition.onerror = (event) => {
      console.warn('[SpeechPipeline] Speech recognition error:', event.error);
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        // Automatically restart if session is still active
        try { this.recognition.start(); } catch (e) { /* ignore already started */ }
      }
    };
  }

  startListening() {
    if (!this.recognition) return { success: false, reason: 'SpeechRecognition unsupported' };

    try {
      this.isListening = true;
      this.speechStartTime = Date.now();
      this.wordCount = 0;
      this.fillerWordsDetected = [];
      this.recognition.start();
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  stopListening() {
    this.isListening = false;
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) { /* ignore */ }
    }
  }

  /**
   * Calculates WPM and detects language-specific filler words.
   */
  _analyzeSpeechAcoustics(text) {
    if (!text) return;
    const words = text.toLowerCase().trim().split(/\s+/).filter(Boolean);
    this.wordCount = words.length;

    const durationMinutes = Math.max(0.05, (Date.now() - (this.speechStartTime || Date.now())) / 60000);
    const wpm = Math.round(this.wordCount / durationMinutes);

    const activeFillers = this.fillerDictionary[this.language] || this.fillerDictionary.en;
    const detected = words.filter(w => activeFillers.includes(w));
    this.fillerWordsDetected = detected;

    if (this.onMetricsUpdate) {
      this.onMetricsUpdate({
        wpm: Math.min(220, Math.max(0, wpm)),
        wordCount: this.wordCount,
        fillerCount: this.fillerWordsDetected.length,
        fillerWords: this.fillerWordsDetected,
        cadenceStatus: (wpm >= 125 && wpm <= 165) ? 'Ideal Cadence' : (wpm < 125 ? 'Slow Pace' : 'Fast Pace')
      });
    }
  }

  /**
   * Speaks the question using local browser SpeechSynthesis.
   */
  speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.language === 'hi') utterance.lang = 'hi-IN';
    else if (this.language === 'gu') utterance.lang = 'gu-IN';
    else utterance.lang = 'en-US';

    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    this._startWaveformAnimation();

    utterance.onend = () => {
      this._stopWaveformAnimation();
    };

    window.speechSynthesis.speak(utterance);
  }

  _startWaveformAnimation() {
    if (this.waveformInterval) clearInterval(this.waveformInterval);
    this.waveformInterval = setInterval(() => {
      if (this.onWaveformTick) {
        const heights = Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 4);
        this.onWaveformTick(heights);
      }
    }, 120);
  }

  _stopWaveformAnimation() {
    if (this.waveformInterval) {
      clearInterval(this.waveformInterval);
      this.waveformInterval = null;
    }
    if (this.onWaveformTick) {
      this.onWaveformTick([6, 6, 6, 6, 6, 6]);
    }
  }

  getSnapshot() {
    return {
      wordCount: this.wordCount,
      fillerCount: this.fillerWordsDetected.length,
      fillerWords: [...this.fillerWordsDetected]
    };
  }
}
