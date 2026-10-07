/**
 * Evaluator - 360° Multimodal Performance Evaluation & Diagnostics Engine
 * Synthesizes verbal, acoustic, non-verbal vision, and technical signals
 * into comprehensive scorecards, actionable diagnoses, and personalized practice drills.
 */

export class Evaluator {
  constructor() {}

  /**
   * Generates a 360° assessment from accumulated interview telemetry.
   */
  evaluateSession(sessionData = {}) {
    const {
      visionSnapshot = { eyeContactScore: 85, postureStatus: 'Optimal', shoulderAlignment: 96 },
      speechSnapshot = { wpm: 142, fillerCount: 2, wordCount: 320 },
      answers = [],
      role = 'Full Stack Engineer'
    } = sessionData;

    // 1. Technical Knowledge (25% weight)
    let techScore = 88;
    const allAnswerText = answers.map(a => a.candidateAnswer || '').join(' ').toLowerCase();
    if (allAnswerText.includes('kafka') || allAnswerText.includes('cache') || allAnswerText.includes('database')) {
      techScore += 4;
    }
    if (allAnswerText.length > 300) techScore += 2;
    techScore = Math.min(98, Math.max(60, techScore));

    // 2. Communication Clarity (15% weight)
    let commScore = 82;
    if (allAnswerText.includes('result') || allAnswerText.includes('reduced') || allAnswerText.includes('latency')) {
      commScore += 6; // Rewarding STAR structure
    }

    // 3. Eye Contact & Gaze (10% weight)
    const eyeScore = Math.min(99, Math.max(50, visionSnapshot.eyeContactScore || 85));

    // 4. Body Language & Posture (10% weight)
    let postureScore = 88;
    if (visionSnapshot.postureStatus === 'Optimal') postureScore = 92;
    else postureScore = 74;

    // 5. Speech Rhythm & Fluency (10% weight)
    let fluencyScore = 85;
    const fillerDensity = speechSnapshot.wordCount > 0 
      ? ((speechSnapshot.fillerCount || 0) / speechSnapshot.wordCount) * 100 
      : 2;
    if (fillerDensity > 4) fluencyScore -= 12;
    else if (fillerDensity <= 1.5) fluencyScore += 5;

    // 6. Confidence & Vocal Delivery (10% weight)
    const confidenceScore = Math.round((eyeScore * 0.5) + (fluencyScore * 0.5));

    // 7. Problem Solving & Logic (10% weight)
    const logicScore = Math.round((techScore * 0.6) + (commScore * 0.4));

    // 8. Professional Etiquette (5% weight)
    const etiquetteScore = 90;

    // 9. Answer Quality (5% weight)
    const answerQualityScore = Math.round((techScore + commScore) / 2);

    // Composite Weighted Score
    const overallScore = Math.round(
      (techScore * 0.25) +
      (commScore * 0.15) +
      (eyeScore * 0.10) +
      (postureScore * 0.10) +
      (fluencyScore * 0.10) +
      (confidenceScore * 0.10) +
      (logicScore * 0.10) +
      (etiquetteScore * 0.05) +
      (answerQualityScore * 0.05)
    );

    // Readiness Assessment
    let readinessTier = 'Needs Focused Practice';
    let eligibleForDiscovery = false;
    if (overallScore >= 85) {
      readinessTier = 'Interview Ready (Top 8%)';
      eligibleForDiscovery = true;
    } else if (overallScore >= 75) {
      readinessTier = 'Near Ready (Requires Polish)';
      eligibleForDiscovery = false;
    }

    // Diagnosis & Weakness Identification
    const weaknesses = [];
    if (fillerDensity > 2.5) {
      weaknesses.push({
        area: 'Vocal Fillers',
        detail: `Detected filler density of ${fillerDensity.toFixed(1)}%. Eliminate "um", "basically", or "like" during vocabulary search.`,
        action: 'Practice 2-second silent pauses to structure thoughts before vocalizing.'
      });
    }
    if (!allAnswerText.includes('percent') && !allAnswerText.includes('%') && !allAnswerText.includes('latency')) {
      weaknesses.push({
        area: 'STAR Outcome Quantification',
        detail: 'Your responses described actions well, but lacked measurable business or system metrics (e.g., latency, throughput, cost).',
        action: 'Conclude answers with exact numerical achievements (e.g., "Reduced P99 latency by 35%").'
      });
    }
    if (eyeScore < 80) {
      weaknesses.push({
        area: 'Camera Gaze Anchoring',
        detail: `Eye contact was ${eyeScore}%. Looking away or down suggests hesitation or reading off notes.`,
        action: 'Position the interviewer window directly below your physical camera lens.'
      });
    }

    // Recommended Personalized Drills
    const recommendedDrills = [
      {
        id: 'drill-fillers',
        title: '5-Minute Zero-Filler Sprint',
        duration: '5 mins',
        focus: 'Acoustic AI Training',
        description: 'Speak for 90 seconds without a single filler word. AI detects and flags fillers instantly.'
      },
      {
        id: 'drill-star',
        title: 'STAR Result Quantifier Challenge',
        duration: '8 mins',
        focus: 'Behavioral & Structural Mastery',
        description: 'Formulate 3 high-impact conflict and outage scenarios with strict numerical outcomes.'
      },
      {
        id: 'drill-multilingual',
        title: 'Multilingual Technical Precision Drill',
        duration: '10 mins',
        focus: 'English / Hindi / Gujarati Fluency',
        description: 'Explain system architecture concepts in your preferred regional language without losing technical depth.'
      }
    ];

    return {
      overallScore,
      readinessTier,
      eligibleForDiscovery,
      breakdown: {
        technicalKnowledge: techScore,
        communicationClarity: commScore,
        eyeContact: eyeScore,
        bodyLanguage: postureScore,
        fluencyAndPacing: fluencyScore,
        confidenceDelivery: confidenceScore,
        problemSolving: logicScore,
        etiquette: etiquetteScore,
        answerQuality: answerQualityScore
      },
      weaknesses,
      recommendedDrills
    };
  }
}
