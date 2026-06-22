import { useState } from 'react';

const REEL_STEPS = ['Reflect', 'Envision', 'Execute', 'Learn', 'Align'];

const QUESTIONS = [
  'I regularly examine my health habits',
  'I understand my current wellness baseline',
  'I track my key health metrics',
  'I honestly assess what\'s working and what isn\'t',
  'I have clear health goals for the next 12 months',
  'I can visualize my ideal state of wellness',
  'I know what success looks like for my health journey',
  'I have written down my wellness vision',
  'I follow through on my treatment plans',
  'I take my medications consistently',
  'I attend all scheduled appointments',
  'I complete recommended lab work on time',
  'I review my lab results with my provider',
  'I research my conditions and treatments',
  'I adjust my approach based on results',
  'I stay informed about new treatment options',
  'My daily habits support my health goals',
  'My lifestyle choices reflect my values',
  'I maintain consistency between visits',
  'I feel aligned with my wellness journey',
];

const STEP_COLORS = {
  Reflect: 'var(--color-blue)',
  Envision: 'var(--color-purple)',
  Execute: 'var(--color-green)',
  Learn: 'var(--color-orange)',
  Align: 'var(--color-teal)',
};

const HABITS = [
  'Sleep 7+ hrs',
  'Exercise 30 min',
  'Follow nutrition plan',
  'Take medications',
  'Mindfulness/journaling',
];

const PROMPTS_BY_STEP = {
  Reflect: 'What health patterns have you noticed this week?',
  Envision: 'Describe your ideal health state 6 months from now.',
  Execute: 'How well did you follow your treatment plan this week?',
  Learn: 'What new information have you learned about your health?',
  Align: 'How aligned are your daily habits with your health goals?',
};

const INITIAL_ENTRIES = [
  {
    date: '2025-06-20',
    reelStep: 'Reflect',
    prompt: 'What health patterns have you noticed this week?',
    content: 'I noticed my energy levels are much better on days I exercise and get 7+ hours of sleep. My afternoon fatigue is directly linked to lunch choices.',
  },
  {
    date: '2025-06-18',
    reelStep: 'Execute',
    prompt: 'How well did you follow your treatment plan this week?',
    content: 'Took all medications on schedule. Missed one gym session but made it up the next day. Blood draw completed on time.',
  },
  {
    date: '2025-06-15',
    reelStep: 'Envision',
    prompt: 'Describe your ideal health state 6 months from now.',
    content: 'I want to be at 200lbs with optimized testosterone levels. Running 3 miles without stopping. Sleeping 7-8 hours consistently.',
  },
];

const COACHING_SESSIONS = [
  { date: 'Jun 15', type: 'Initial Assessment', provider: 'Dr. Tack', status: 'Completed', notes: 'Goals: Lose 20lbs, optimize testosterone' },
  { date: 'Jun 29', type: 'Progress Review', provider: 'ReelVerse Coach', status: 'Completed', notes: 'Semaglutide working, adjust training' },
  { date: 'Jul 13', type: 'Habit Check-in', provider: 'ReelVerse Coach', status: 'Upcoming', notes: 'Review habit tracker compliance' },
  { date: 'Jul 27', type: 'Quarterly Review', provider: 'Dr. Tack', status: 'Scheduled', notes: 'Full labs review, treatment plan update' },
];

function ReelVerseTab() {
  // Assessment state
  const [answers, setAnswers] = useState(Array(20).fill(0));
  const [showResults, setShowResults] = useState(false);

  // Habit tracker state (7 days x 5 habits)
  const [habitGrid, setHabitGrid] = useState(
    Array.from({ length: 7 }, () => Array(5).fill(false))
  );

  // Journal state
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [journalStep, setJournalStep] = useState('Reflect');
  const [journalContent, setJournalContent] = useState('');

  // --- Assessment handlers ---
  const handleAnswer = (questionIndex, value) => {
    setAnswers(prev => {
      const next = [...prev];
      next[questionIndex] = value;
      return next;
    });
  };

  const getStepScore = (stepIndex) => {
    const start = stepIndex * 4;
    return answers[start] + answers[start + 1] + answers[start + 2] + answers[start + 3];
  };

  const getOverallScore = () => answers.reduce((sum, v) => sum + v, 0);

  const handleSubmitAssessment = () => {
    setShowResults(true);
  };

  const handleRetakeAssessment = () => {
    setAnswers(Array(20).fill(0));
    setShowResults(false);
  };

  // --- Habit tracker handlers ---
  const toggleHabit = (dayIndex, habitIndex) => {
    setHabitGrid(prev => {
      const next = prev.map(row => [...row]);
      next[dayIndex][habitIndex] = !next[dayIndex][habitIndex];
      return next;
    });
  };

  const getHabitStreak = (habitIndex) => {
    let streak = 0;
    for (let d = 6; d >= 0; d--) {
      if (habitGrid[d][habitIndex]) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getOverallCompletion = () => {
    let checked = 0;
    const total = 7 * 5;
    for (let d = 0; d < 7; d++) {
      for (let h = 0; h < 5; h++) {
        if (habitGrid[d][h]) checked++;
      }
    }
    return total > 0 ? Math.round((checked / total) * 100) : 0;
  };

  // --- Journal handlers ---
  const handleAddEntry = () => {
    if (!journalContent.trim()) return;
    const newEntry = {
      date: new Date().toISOString().slice(0, 10),
      reelStep: journalStep,
      prompt: PROMPTS_BY_STEP[journalStep],
      content: journalContent.trim(),
    };
    setEntries(prev => [newEntry, ...prev]);
    setJournalContent('');
  };

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="dashboard-grid">
      {/* ===== REEL Assessment ===== */}
      <section className="panel">
        <h2>REEL Assessment</h2>
        {!showResults ? (
          <div className="assessment-questions">
            {REEL_STEPS.map((step, stepIdx) => (
              <div key={step} style={{ marginBottom: 24 }}>
                <h3 style={{ color: STEP_COLORS[step], marginBottom: 12 }}>
                  {step}
                </h3>
                {QUESTIONS.slice(stepIdx * 4, stepIdx * 4 + 4).map((q, qi) => {
                  const qIndex = stepIdx * 4 + qi;
                  return (
                    <div key={qIndex} style={{ marginBottom: 12 }}>
                      <p style={{ marginBottom: 6 }}>{q}</p>
                      <div style={{ display: 'flex', gap: 12 }}>
                        {[1, 2, 3, 4, 5].map(val => (
                          <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={val}
                              checked={answers[qIndex] === val}
                              onChange={() => handleAnswer(qIndex, val)}
                            />
                            {val}
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <button className="form-btn" onClick={handleSubmitAssessment}>
              Submit Assessment
            </button>
          </div>
        ) : (
          <div>
            <div className="reel-scores">
              <div className="metrics-grid">
                {REEL_STEPS.map((step, idx) => {
                  const score = getStepScore(idx);
                  const pct = (score / 20) * 100;
                  return (
                    <div className="metric-card" key={step} style={{ borderLeftColor: STEP_COLORS[step] }}>
                      <span className="metric-label">{step}</span>
                      <span className="metric-value" style={{ color: STEP_COLORS[step] }}>
                        {score} / 20
                      </span>
                      <div style={{
                        marginTop: 8,
                        height: 8,
                        borderRadius: 4,
                        background: 'var(--color-border)',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${pct}%`,
                          height: '100%',
                          borderRadius: 4,
                          background: STEP_COLORS[step],
                          transition: 'width 0.3s ease',
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <span className="metric-label">Overall Score</span>
              <span className="metric-value" style={{ display: 'block', fontSize: 32, color: 'var(--color-blue)' }}>
                {getOverallScore()} / 100
              </span>
            </div>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <button className="form-btn" onClick={handleRetakeAssessment}>
                Retake Assessment
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ===== Habit Tracker ===== */}
      <section className="panel">
        <h2>Habit Tracker</h2>
        <div className="habit-grid">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Habit</th>
                  {dayLabels.map(d => <th key={d}>{d}</th>)}
                  <th>Streak</th>
                </tr>
              </thead>
              <tbody>
                {HABITS.map((habit, hIdx) => (
                  <tr key={habit}>
                    <td>{habit}</td>
                    {dayLabels.map((d, dIdx) => (
                      <td key={d} style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={habitGrid[dIdx][hIdx]}
                          onChange={() => toggleHabit(dIdx, hIdx)}
                        />
                      </td>
                    ))}
                    <td className={getHabitStreak(hIdx) >= 5 ? 'cell-good' : getHabitStreak(hIdx) >= 3 ? 'cell-warn' : ''}>
                      {getHabitStreak(hIdx)} days
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <span className="metric-label">Overall Completion: </span>
            <span className={getOverallCompletion() >= 80 ? 'cell-good' : getOverallCompletion() >= 50 ? 'cell-warn' : ''}>
              {getOverallCompletion()}%
            </span>
          </div>
        </div>
      </section>

      {/* ===== Journal ===== */}
      <section className="panel">
        <h2>REEL Journal</h2>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <label>
              REEL Step
              <select
                value={journalStep}
                onChange={e => setJournalStep(e.target.value)}
                style={{ marginLeft: 8 }}
              >
                {REEL_STEPS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <p style={{ color: 'var(--color-text-dim)', marginBottom: 8 }}>
            Prompt: {PROMPTS_BY_STEP[journalStep]}
          </p>
          <textarea
            rows={4}
            value={journalContent}
            onChange={e => setJournalContent(e.target.value)}
            placeholder="Write your journal entry..."
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: 'var(--color-bg)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              padding: 10,
              resize: 'vertical',
            }}
          />
          <button className="form-btn" onClick={handleAddEntry} style={{ marginTop: 8 }}>
            Add Entry
          </button>
        </div>
        <div className="journal-entries">
          {entries.map((entry, idx) => (
            <div key={idx} style={{
              padding: 14,
              marginBottom: 12,
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderLeft: `3px solid ${STEP_COLORS[entry.reelStep]}`,
              borderRadius: 6,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: STEP_COLORS[entry.reelStep], fontWeight: 600 }}>
                  {entry.reelStep}
                </span>
                <span style={{ color: 'var(--color-text-dim)', fontSize: 13 }}>
                  {entry.date}
                </span>
              </div>
              <p style={{ color: 'var(--color-text-dim)', fontSize: 13, marginBottom: 6 }}>
                {entry.prompt}
              </p>
              <p style={{ margin: 0 }}>{entry.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Coaching Sessions ===== */}
      <section className="panel">
        <h2>Coaching Sessions</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Session Type</th>
                <th>Provider</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {COACHING_SESSIONS.map((s, idx) => (
                <tr key={idx}>
                  <td>{s.date}</td>
                  <td>{s.type}</td>
                  <td>{s.provider}</td>
                  <td className={
                    s.status === 'Completed' ? 'cell-good'
                      : s.status === 'Upcoming' ? 'cell-warn'
                        : ''
                  }>
                    {s.status}
                  </td>
                  <td>{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== Progress Dashboard ===== */}
      <section className="panel">
        <h2>Progress Dashboard</h2>
        <div className="metrics-grid">
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-blue)' }}>
            <span className="metric-label">Wellness Score</span>
            <span className="metric-value" style={{ color: 'var(--color-blue)' }}>78 / 100</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-green)' }}>
            <span className="metric-label">Weight Trend</span>
            <span className="metric-value" style={{ color: 'var(--color-green)' }}>
              225 &rarr; 215 (Goal: 200)
            </span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-orange)' }}>
            <span className="metric-label">Current Streak</span>
            <span className="metric-value" style={{ color: 'var(--color-orange)' }}>12 days</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-purple)' }}>
            <span className="metric-label">Assessments Completed</span>
            <span className="metric-value" style={{ color: 'var(--color-purple)' }}>2</span>
          </div>
          <div className="metric-card" style={{ borderLeftColor: 'var(--color-teal)' }}>
            <span className="metric-label">Next Coaching</span>
            <span className="metric-value" style={{ color: 'var(--color-teal)' }}>Jul 13</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReelVerseTab;
