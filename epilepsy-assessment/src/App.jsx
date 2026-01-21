import { useState } from 'react'
import './App.css'
import Questionnaire from './components/Questionnaire'
import Results from './components/Results'
import { assessSurgicalCandidacy } from './utils/assessment'

function App() {
  const [step, setStep] = useState('welcome') // 'welcome', 'questionnaire', 'results'
  const [responses, setResponses] = useState({})
  const [assessment, setAssessment] = useState(null)

  const handleStartAssessment = () => {
    setStep('questionnaire')
  }

  const handleCompleteQuestionnaire = (finalResponses) => {
    setResponses(finalResponses)
    const assessmentResult = assessSurgicalCandidacy(finalResponses)
    setAssessment(assessmentResult)
    setStep('results')
  }

  const handleRestart = () => {
    setStep('welcome')
    setResponses({})
    setAssessment(null)
  }

  return (
    <div className="app">
      {step === 'welcome' && (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1>Pediatric Epilepsy Surgery Assessment</h1>
            <div className="welcome-intro">
              <p>
                This tool helps evaluate potential candidacy for epilepsy surgery
                in pediatric patients. It assesses key factors including seizure
                characteristics, medication history, diagnostic workup, and patient
                demographics.
              </p>
              <div className="disclaimer">
                <h3>Important Notice</h3>
                <p>
                  This assessment tool is designed for educational and screening
                  purposes only. It does not replace comprehensive medical evaluation
                  by a qualified epilepsy specialist. All treatment decisions should
                  be made in consultation with your healthcare team.
                </p>
                <p>
                  <strong>Privacy:</strong> No data entered into this tool is stored
                  or transmitted. All information remains on your device.
                </p>
              </div>
              <button className="start-button" onClick={handleStartAssessment}>
                Begin Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'questionnaire' && (
        <Questionnaire onComplete={handleCompleteQuestionnaire} />
      )}

      {step === 'results' && assessment && (
        <Results
          assessment={assessment}
          responses={responses}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

export default App
