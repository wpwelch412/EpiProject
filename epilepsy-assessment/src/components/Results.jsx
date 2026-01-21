import './Results.css'

function Results({ assessment, responses, onRestart }) {
  const getCandidacyColor = (level) => {
    const colors = {
      excellent: '#10b981',
      good: '#3b82f6',
      moderate: '#f59e0b',
      fair: '#f59e0b',
      limited: '#ef4444',
      poor: '#ef4444'
    }
    return colors[level] || '#6b7280'
  }

  const getCandidacyLabel = (level) => {
    const labels = {
      excellent: 'Excellent Candidate',
      good: 'Good Candidate',
      moderate: 'Moderate Candidate',
      fair: 'Fair Candidate',
      limited: 'Limited Candidacy',
      poor: 'Poor Candidate'
    }
    return labels[level] || 'Assessment Complete'
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Epilepsy Surgery Assessment Results</h1>
        <p className="results-date">
          Assessment completed: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="candidacy-summary">
        <div
          className="candidacy-badge"
          style={{ backgroundColor: getCandidacyColor(assessment.candidacyLevel) }}
        >
          {getCandidacyLabel(assessment.candidacyLevel)}
        </div>
        <p className="candidacy-description">{assessment.candidacyDescription}</p>
      </div>

      {assessment.factors && (
        <div className="factors-section">
          <h2>Key Clinical Factors</h2>
          <div className="factors-grid">
            <div className={`factor-item ${assessment.factors.drugResistant ? 'positive' : 'negative'}`}>
              <span className="factor-icon">{assessment.factors.drugResistant ? '✓' : '✗'}</span>
              <span className="factor-label">Drug-Resistant Epilepsy</span>
            </div>
            <div className={`factor-item ${assessment.factors.focal ? 'positive' : 'negative'}`}>
              <span className="factor-icon">{assessment.factors.focal ? '✓' : '✗'}</span>
              <span className="factor-label">Focal Seizure Onset</span>
            </div>
            <div className={`factor-item ${assessment.factors.lesional ? 'positive' : 'negative'}`}>
              <span className="factor-icon">{assessment.factors.lesional ? '✓' : '✗'}</span>
              <span className="factor-label">Structural Lesion Identified</span>
            </div>
            <div className={`factor-item ${assessment.factors.localizingData ? 'positive' : 'negative'}`}>
              <span className="factor-icon">{assessment.factors.localizingData ? '✓' : '✗'}</span>
              <span className="factor-label">Localizing Diagnostic Data</span>
            </div>
            <div className={`factor-item ${assessment.factors.significantImpact ? 'positive' : 'negative'}`}>
              <span className="factor-icon">{assessment.factors.significantImpact ? '✓' : '✗'}</span>
              <span className="factor-label">Significant Quality of Life Impact</span>
            </div>
            <div className={`factor-item ${assessment.factors.youngAge ? 'positive' : 'neutral'}`}>
              <span className="factor-icon">{assessment.factors.youngAge ? '✓' : '○'}</span>
              <span className="factor-label">Pediatric Age Range</span>
            </div>
          </div>
        </div>
      )}

      {assessment.considerations && assessment.considerations.length > 0 && (
        <div className="considerations-section">
          <h2>Clinical Considerations</h2>
          <ul className="considerations-list">
            {assessment.considerations.map((consideration, idx) => (
              <li key={idx}>{consideration}</li>
            ))}
          </ul>
        </div>
      )}

      {assessment.surgicalOptions && assessment.surgicalOptions.length > 0 && (
        <div className="surgical-options-section">
          <h2>Potential Surgical Options</h2>
          <p className="section-intro">
            Based on the assessment, the following surgical interventions may be considered.
            Final treatment decisions require comprehensive evaluation by an epilepsy surgery team.
          </p>
          <div className="options-list">
            {assessment.surgicalOptions.map((option, idx) => (
              <div key={idx} className="option-card">
                <h3>{option.name}</h3>
                <p className="option-description">{option.description}</p>
                <div className="option-details">
                  <div className="detail-item">
                    <strong>Success Rate:</strong>
                    <span>{option.successRate}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Indication:</strong>
                    <span>{option.indication}</span>
                  </div>
                  <div className="detail-item considerations">
                    <strong>Considerations:</strong>
                    <span>{option.considerations}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {assessment.nextSteps && assessment.nextSteps.length > 0 && (
        <div className="next-steps-section">
          <h2>Recommended Next Steps</h2>
          <ol className="next-steps-list">
            {assessment.nextSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="important-notice">
        <h3>Important Medical Disclaimer</h3>
        <p>
          This assessment tool provides general guidance based on common epilepsy surgery
          candidacy criteria. It is <strong>not a substitute</strong> for comprehensive
          medical evaluation by qualified healthcare professionals. Surgical candidacy
          requires detailed review by a multidisciplinary epilepsy surgery team including
          epileptologists, neurosurgeons, neuropsychologists, and neuroradiologists.
        </p>
        <p>
          All treatment decisions should be made in consultation with your child's
          healthcare team, considering the complete clinical picture, family preferences,
          and individual circumstances.
        </p>
      </div>

      <div className="action-buttons">
        <button onClick={handlePrint} className="print-button">
          Print Results
        </button>
        <button onClick={onRestart} className="restart-button">
          Start New Assessment
        </button>
      </div>
    </div>
  )
}

export default Results
