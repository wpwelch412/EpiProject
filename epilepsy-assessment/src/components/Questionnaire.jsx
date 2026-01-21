import { useState } from 'react'
import './Questionnaire.css'

const questions = [
  // Patient Demographics
  {
    id: 'age',
    category: 'demographics',
    question: 'What is the patient\'s current age?',
    type: 'number',
    unit: 'years',
    required: true
  },
  {
    id: 'seizureOnsetAge',
    category: 'demographics',
    question: 'At what age did seizures begin?',
    type: 'number',
    unit: 'years',
    required: true
  },
  {
    id: 'developmentalStatus',
    category: 'demographics',
    question: 'What is the patient\'s developmental status?',
    type: 'radio',
    options: [
      { value: 'normal', label: 'Age-appropriate development' },
      { value: 'mild-delay', label: 'Mild developmental delay' },
      { value: 'moderate-delay', label: 'Moderate developmental delay' },
      { value: 'severe-delay', label: 'Severe developmental delay' }
    ],
    required: true
  },
  {
    id: 'comorbidities',
    category: 'demographics',
    question: 'Does the patient have significant medical comorbidities?',
    type: 'checkbox',
    options: [
      { value: 'none', label: 'None' },
      { value: 'intellectual-disability', label: 'Intellectual disability' },
      { value: 'autism', label: 'Autism spectrum disorder' },
      { value: 'cerebral-palsy', label: 'Cerebral palsy' },
      { value: 'genetic-syndrome', label: 'Genetic syndrome' },
      { value: 'other', label: 'Other significant comorbidity' }
    ],
    required: true
  },

  // Seizure Characteristics
  {
    id: 'seizureFrequency',
    category: 'seizures',
    question: 'What is the current seizure frequency?',
    type: 'radio',
    options: [
      { value: 'daily-multiple', label: 'Multiple times per day' },
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'rare', label: 'Less than monthly' }
    ],
    required: true
  },
  {
    id: 'seizureTypes',
    category: 'seizures',
    question: 'What types of seizures does the patient experience? (Select all that apply)',
    type: 'checkbox',
    options: [
      { value: 'focal-aware', label: 'Focal aware (simple partial)' },
      { value: 'focal-impaired', label: 'Focal with impaired awareness (complex partial)' },
      { value: 'focal-to-bilateral', label: 'Focal to bilateral tonic-clonic' },
      { value: 'generalized-absence', label: 'Generalized absence' },
      { value: 'generalized-tonic-clonic', label: 'Generalized tonic-clonic' },
      { value: 'tonic', label: 'Tonic' },
      { value: 'atonic', label: 'Atonic (drop attacks)' },
      { value: 'myoclonic', label: 'Myoclonic' },
      { value: 'spasms', label: 'Epileptic spasms' }
    ],
    required: true
  },
  {
    id: 'focality',
    category: 'seizures',
    question: 'Do seizures appear to start from a consistent location?',
    type: 'radio',
    options: [
      { value: 'consistent-focal', label: 'Yes, consistently from the same region' },
      { value: 'multifocal', label: 'Multiple different regions' },
      { value: 'generalized', label: 'Appear generalized from onset' },
      { value: 'unknown', label: 'Unclear/unknown' }
    ],
    required: true
  },
  {
    id: 'seizureImpact',
    category: 'seizures',
    question: 'How significantly do seizures impact daily functioning?',
    type: 'radio',
    options: [
      { value: 'severe', label: 'Severe - frequent injuries, inability to attend school, constant supervision required' },
      { value: 'moderate', label: 'Moderate - limits activities, occasional injuries, needs supervision' },
      { value: 'mild', label: 'Mild - minimal impact on daily activities' }
    ],
    required: true
  },

  // Medication History
  {
    id: 'aedTrials',
    category: 'medications',
    question: 'How many appropriate antiepileptic medications have been tried at adequate doses?',
    type: 'radio',
    options: [
      { value: '0-1', label: '0-1 medications' },
      { value: '2', label: '2 medications' },
      { value: '3-4', label: '3-4 medications' },
      { value: '5+', label: '5 or more medications' }
    ],
    required: true
  },
  {
    id: 'currentAeds',
    category: 'medications',
    question: 'How many antiepileptic medications is the patient currently taking?',
    type: 'number',
    min: 0,
    max: 10,
    required: true
  },
  {
    id: 'seizureControl',
    category: 'medications',
    question: 'Have medications ever achieved complete seizure control?',
    type: 'radio',
    options: [
      { value: 'never', label: 'Never seizure-free on medications' },
      { value: 'brief', label: 'Brief periods of seizure freedom (less than 6 months)' },
      { value: 'extended', label: 'Extended seizure freedom (6+ months) but seizures returned' },
      { value: 'current', label: 'Currently seizure-free on medications' }
    ],
    required: true
  },
  {
    id: 'medicationSideEffects',
    category: 'medications',
    question: 'Does the patient experience significant medication side effects?',
    type: 'radio',
    options: [
      { value: 'severe', label: 'Severe side effects limiting quality of life' },
      { value: 'moderate', label: 'Moderate but tolerable side effects' },
      { value: 'mild', label: 'Mild or no significant side effects' }
    ],
    required: true
  },

  // Diagnostic Workup
  {
    id: 'eegFindings',
    category: 'diagnostics',
    question: 'What do EEG studies show?',
    type: 'radio',
    options: [
      { value: 'focal-consistent', label: 'Consistent focal epileptiform activity from single region' },
      { value: 'focal-lateralized', label: 'Focal but variable within one hemisphere' },
      { value: 'multifocal', label: 'Multifocal independent epileptiform activity' },
      { value: 'generalized', label: 'Generalized epileptiform activity' },
      { value: 'non-localizing', label: 'Non-localizing or normal' },
      { value: 'not-done', label: 'EEG not yet performed' }
    ],
    required: true
  },
  {
    id: 'videoEeg',
    category: 'diagnostics',
    question: 'Has video-EEG monitoring captured typical seizures?',
    type: 'radio',
    options: [
      { value: 'yes-localizing', label: 'Yes, with localizing findings' },
      { value: 'yes-non-localizing', label: 'Yes, but non-localizing' },
      { value: 'no', label: 'No seizures captured yet' },
      { value: 'not-done', label: 'Video-EEG not performed' }
    ],
    required: true
  },
  {
    id: 'mriFindings',
    category: 'diagnostics',
    question: 'What are the MRI findings?',
    type: 'radio',
    options: [
      { value: 'focal-lesion', label: 'Focal lesion identified (e.g., cortical dysplasia, tumor, cavernoma)' },
      { value: 'hippocampal-sclerosis', label: 'Hippocampal sclerosis/mesial temporal sclerosis' },
      { value: 'hemispheric', label: 'Hemispheric abnormality (e.g., stroke, hemimegalencephaly, Sturge-Weber)' },
      { value: 'nonspecific', label: 'Nonspecific findings' },
      { value: 'normal', label: 'Normal MRI (MRI-negative)' },
      { value: 'not-done', label: 'MRI not yet performed or contraindicated' }
    ],
    required: true
  },
  {
    id: 'functionalImaging',
    category: 'diagnostics',
    question: 'Have functional imaging studies been performed? (PET, SPECT, fMRI)',
    type: 'radio',
    options: [
      { value: 'concordant', label: 'Yes, findings concordant with other data' },
      { value: 'discordant', label: 'Yes, but discordant findings' },
      { value: 'not-done', label: 'Not yet performed' }
    ],
    required: true
  },
  {
    id: 'neuropsychTesting',
    category: 'diagnostics',
    question: 'Has neuropsychological testing been completed?',
    type: 'radio',
    options: [
      { value: 'yes-lateralizing', label: 'Yes, with lateralizing findings' },
      { value: 'yes-non-lateralizing', label: 'Yes, but non-lateralizing' },
      { value: 'not-done', label: 'Not yet performed' }
    ],
    required: true
  }
]

function Questionnaire({ onComplete }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [responses, setResponses] = useState({})

  const sections = [
    {
      name: 'Patient Demographics',
      category: 'demographics',
      description: 'Basic information about the patient'
    },
    {
      name: 'Seizure Characteristics',
      category: 'seizures',
      description: 'Details about seizure types, frequency, and impact'
    },
    {
      name: 'Medication History',
      category: 'medications',
      description: 'Information about antiepileptic medication trials and response'
    },
    {
      name: 'Diagnostic Workup',
      category: 'diagnostics',
      description: 'Results from EEG, imaging, and other diagnostic tests'
    }
  ]

  const currentCategory = sections[currentSection].category
  const sectionQuestions = questions.filter(q => q.category === currentCategory)

  const handleInputChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleCheckboxChange = (questionId, value, checked) => {
    setResponses(prev => {
      const currentValues = prev[questionId] || []
      if (checked) {
        return { ...prev, [questionId]: [...currentValues, value] }
      } else {
        return { ...prev, [questionId]: currentValues.filter(v => v !== value) }
      }
    })
  }

  const isSectionComplete = () => {
    return sectionQuestions.every(q => {
      const response = responses[q.id]
      if (!q.required) return true
      if (q.type === 'checkbox') return response && response.length > 0
      return response !== undefined && response !== ''
    })
  }

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1)
    } else {
      onComplete(responses)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
    }
  }

  const progressPercentage = ((currentSection + 1) / sections.length) * 100

  return (
    <div className="questionnaire">
      <div className="questionnaire-header">
        <h2>Epilepsy Surgery Assessment</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="section-info">
          <h3>{sections[currentSection].name}</h3>
          <p>{sections[currentSection].description}</p>
          <span className="section-counter">
            Section {currentSection + 1} of {sections.length}
          </span>
        </div>
      </div>

      <div className="questions-container">
        {sectionQuestions.map((question, idx) => (
          <div key={question.id} className="question-block">
            <label className="question-label">
              {idx + 1}. {question.question}
              {question.required && <span className="required">*</span>}
            </label>

            {question.type === 'number' && (
              <div className="number-input">
                <input
                  type="number"
                  min={question.min}
                  max={question.max}
                  value={responses[question.id] || ''}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  required={question.required}
                />
                {question.unit && <span className="unit">{question.unit}</span>}
              </div>
            )}

            {question.type === 'radio' && (
              <div className="radio-group">
                {question.options.map(option => (
                  <label key={option.value} className="radio-option">
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={responses[question.id] === option.value}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === 'checkbox' && (
              <div className="checkbox-group">
                {question.options.map(option => (
                  <label key={option.value} className="checkbox-option">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={(responses[question.id] || []).includes(option.value)}
                      onChange={(e) => handleCheckboxChange(question.id, option.value, e.target.checked)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button
          onClick={handlePrevious}
          disabled={currentSection === 0}
          className="nav-button prev-button"
        >
          Previous Section
        </button>
        <button
          onClick={handleNext}
          disabled={!isSectionComplete()}
          className="nav-button next-button"
        >
          {currentSection === sections.length - 1 ? 'View Results' : 'Next Section'}
        </button>
      </div>
    </div>
  )
}

export default Questionnaire
