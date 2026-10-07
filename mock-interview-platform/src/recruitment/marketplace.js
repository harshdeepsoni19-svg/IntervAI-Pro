/**
 * Marketplace - Company Discovery & Direct Recruitment Portal Module
 * Provides verified candidate discovery, search filtering by skill/score/language,
 * scorecard inspection, and direct recruiter shortlisting/outreach.
 */

export class Marketplace {
  constructor() {
    this.candidates = [
      {
        id: 'cand-001',
        name: 'Rajan Soni',
        isCurrentUser: true,
        role: 'Full Stack & Systems Lead',
        score: 86,
        readinessTier: 'Interview Ready (Top 8%)',
        languages: ['English', 'Hindi', 'Gujarati'],
        skills: ['React.js', 'Node.js', 'PostgreSQL', 'System Design', 'Docker'],
        badges: ['AI Certified 86%', 'Top 10% System Design', 'STAR Master'],
        metrics: { tech: 90, comm: 84, eyeContact: 88, posture: 88 },
        interviewHighlights: [
          { question: 'Distributed Event Pipeline', duration: '2m 14s', score: 92 },
          { question: 'Production Outage Handling (STAR)', duration: '1m 45s', score: 88 }
        ]
      },
      {
        id: 'cand-002',
        name: 'Priya Patel',
        isCurrentUser: false,
        role: 'AI / Machine Learning Engineer',
        score: 92,
        readinessTier: 'Top 2% Elite Ready',
        languages: ['English', 'Gujarati'],
        skills: ['PyTorch', 'LLMs', 'Vector Databases', 'Python', 'MLOps'],
        badges: ['AI Certified 92%', 'Elite Problem Solver', 'Top 2% ML'],
        metrics: { tech: 95, comm: 90, eyeContact: 91, posture: 90 },
        interviewHighlights: [
          { question: 'LLM Multi-Tenant Serving', duration: '3m 10s', score: 95 }
        ]
      },
      {
        id: 'cand-003',
        name: 'Amit Sharma',
        isCurrentUser: false,
        role: 'DevOps & Cloud Architect',
        score: 88,
        readinessTier: 'Interview Ready',
        languages: ['English', 'Hindi'],
        skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Prometheus'],
        badges: ['AI Certified 88%', 'Cloud Architecture Top 5%'],
        metrics: { tech: 89, comm: 86, eyeContact: 87, posture: 89 },
        interviewHighlights: [
          { question: 'Multi-Region Failover Architecture', duration: '2m 30s', score: 90 }
        ]
      }
    ];

    this.shortlistedIds = new Set();
    this.invitationsSent = [];
  }

  filterCandidates(options = {}) {
    const { role = null, minScore = 80, language = null } = options;

    return this.candidates.filter(c => {
      if (minScore && c.score < minScore) return false;
      if (role && role !== 'All' && !c.role.toLowerCase().includes(role.toLowerCase())) return false;
      if (language && language !== 'All' && !c.languages.some(l => l.toLowerCase().includes(language.toLowerCase()))) return false;
      return true;
    });
  }

  shortlistCandidate(candidateId) {
    this.shortlistedIds.add(candidateId);
    const candidate = this.candidates.find(c => c.id === candidateId);
    return {
      success: true,
      candidate,
      message: `Successfully shortlisted ${candidate ? candidate.name : 'candidate'}`
    };
  }

  sendDirectInterviewInvite(candidateId, message = "We were impressed by your AI mock interview performance and would like to invite you for a fast-track interview.") {
    const candidate = this.candidates.find(c => c.id === candidateId);
    const invite = {
      inviteId: 'inv-' + Date.now(),
      candidateId,
      candidateName: candidate ? candidate.name : 'Unknown',
      timestamp: Date.now(),
      status: 'Sent'
    };
    this.invitationsSent.push(invite);
    return {
      success: true,
      invite,
      message: `Direct interview invitation dispatched to ${invite.candidateName}`
    };
  }
}
