export function assessSurgicalCandidacy(responses) {
  let score = 0
  let factors = {
    drugResistant: false,
    focal: false,
    lesional: false,
    localizingData: false,
    significantImpact: false,
    youngAge: false
  }
  let considerations = []
  let surgicalOptions = []
  let nextSteps = []

  // Assess drug resistance (key criterion)
  const aedTrials = responses.aedTrials
  if (aedTrials === '2' || aedTrials === '3-4' || aedTrials === '5+') {
    factors.drugResistant = true
    score += 25
    if (aedTrials === '3-4' || aedTrials === '5+') {
      score += 10
      considerations.push('Clearly drug-resistant epilepsy with multiple medication failures')
    }
  } else if (aedTrials === '0-1') {
    considerations.push('Inadequate medication trials - need to establish drug resistance with at least 2 appropriate AEDs at therapeutic doses')
  }

  // Currently seizure-free patients are not surgical candidates
  if (responses.seizureControl === 'current') {
    score -= 50
    considerations.push('Patient is currently seizure-free on medications - surgery not indicated at this time')
  }

  // Assess seizure frequency and impact
  const frequency = responses.seizureFrequency
  if (frequency === 'daily-multiple' || frequency === 'daily') {
    score += 15
    factors.significantImpact = true
  } else if (frequency === 'weekly') {
    score += 10
    factors.significantImpact = true
  } else if (frequency === 'rare') {
    score -= 10
    considerations.push('Infrequent seizures - risk/benefit ratio of surgery may be less favorable')
  }

  // Impact on quality of life
  if (responses.seizureImpact === 'severe') {
    score += 15
    factors.significantImpact = true
    considerations.push('Severe impact on quality of life strengthens surgical candidacy')
  } else if (responses.seizureImpact === 'moderate') {
    score += 10
    factors.significantImpact = true
  }

  // Assess focality
  const focality = responses.focality
  if (focality === 'consistent-focal') {
    factors.focal = true
    score += 20
    considerations.push('Consistent focal seizure onset is favorable for resective surgery')
  } else if (focality === 'multifocal') {
    score -= 10
    considerations.push('Multifocal epilepsy may require neuromodulation or palliative procedures')
    // Check for Lennox-Gastaut syndrome pattern
    if (seizureTypes.includes('atonic') || seizureTypes.includes('tonic')) {
      considerations.push('Multiple seizure types with drop attacks suggest possible Lennox-Gastaut syndrome - consider corpus callosotomy, VNS, DBS, or RNS')
    }
  } else if (focality === 'generalized') {
    score -= 15
    considerations.push('Generalized epilepsy - limited surgical options, consider neuromodulation')
  }

  // Analyze seizure types
  const seizureTypes = responses.seizureTypes || []
  const hasFocalSeizures = seizureTypes.some(t =>
    t.includes('focal') || t === 'focal-aware' || t === 'focal-impaired' || t === 'focal-to-bilateral'
  )
  const hasGeneralizedOnly = seizureTypes.every(t =>
    t.includes('generalized') || t === 'tonic' || t === 'atonic' || t === 'myoclonic'
  )

  if (hasFocalSeizures) {
    factors.focal = true
    score += 10
  }
  if (hasGeneralizedOnly && !hasFocalSeizures) {
    score -= 10
  }

  // MRI findings (critical for surgical planning)
  const mri = responses.mriFindings
  if (mri === 'focal-lesion') {
    factors.lesional = true
    score += 25
    considerations.push('Focal MRI lesion provides excellent surgical target - lesionectomy may be curative')
  } else if (mri === 'hippocampal-sclerosis') {
    factors.lesional = true
    score += 25
    considerations.push('Hippocampal sclerosis - temporal lobectomy has high success rate (~70-80%)')
  } else if (mri === 'hemispheric') {
    factors.lesional = true
    score += 20
    considerations.push('Hemispheric pathology (e.g., stroke, hemimegalencephaly, Sturge-Weber) - hemispherectomy/disconnection may be indicated')
  } else if (mri === 'normal') {
    score += 5
    considerations.push('MRI-negative epilepsy - may still be surgical candidate with concordant EEG/PET/SPECT data')
  } else if (mri === 'not-done') {
    score -= 20
    considerations.push('MRI is essential for surgical evaluation')
    nextSteps.push('Obtain high-resolution epilepsy protocol MRI (3T if available)')
  }

  // EEG findings
  const eeg = responses.eegFindings
  if (eeg === 'focal-consistent') {
    factors.localizingData = true
    score += 20
    considerations.push('Consistent focal EEG abnormalities support localized epileptogenic zone')
  } else if (eeg === 'focal-lateralized') {
    factors.localizingData = true
    score += 10
  } else if (eeg === 'multifocal' || eeg === 'generalized') {
    score -= 5
  } else if (eeg === 'not-done') {
    score -= 15
    nextSteps.push('Obtain routine and sleep-deprived EEG')
  }

  // Video-EEG monitoring
  const videoEeg = responses.videoEeg
  if (videoEeg === 'yes-localizing') {
    factors.localizingData = true
    score += 15
    considerations.push('Localizing ictal EEG is valuable for surgical planning')
  } else if (videoEeg === 'not-done' && factors.drugResistant) {
    nextSteps.push('Video-EEG monitoring to capture and characterize seizures')
  }

  // Functional imaging
  const functionalImaging = responses.functionalImaging
  if (functionalImaging === 'concordant') {
    factors.localizingData = true
    score += 10
    considerations.push('Concordant functional imaging strengthens localization')
  } else if (functionalImaging === 'discordant') {
    considerations.push('Discordant imaging findings - may need invasive monitoring')
  } else if (functionalImaging === 'not-done' && mri === 'normal' && factors.drugResistant) {
    nextSteps.push('Consider PET scan and/or ictal SPECT for MRI-negative epilepsy')
  }

  // Neuropsych testing
  if (responses.neuropsychTesting === 'not-done' && factors.drugResistant) {
    nextSteps.push('Baseline neuropsychological testing for surgical planning and risk assessment')
  }

  // Age considerations
  const age = parseInt(responses.age)
  if (age >= 2 && age <= 18) {
    factors.youngAge = true
    score += 5
    considerations.push('Early surgery in childhood may improve neurodevelopmental outcomes')
  }

  // Determine surgical candidacy level
  let candidacyLevel = 'poor'
  let candidacyDescription = ''

  if (score >= 80) {
    candidacyLevel = 'excellent'
    candidacyDescription = 'Strong surgical candidate with multiple favorable factors'
  } else if (score >= 60) {
    candidacyLevel = 'good'
    candidacyDescription = 'Good surgical candidate - comprehensive evaluation recommended'
  } else if (score >= 40) {
    candidacyLevel = 'moderate'
    candidacyDescription = 'Potential surgical candidate pending additional workup'
  } else if (score >= 20) {
    candidacyLevel = 'fair'
    candidacyDescription = 'May be surgical candidate but requires thorough evaluation'
  } else {
    candidacyLevel = 'limited'
    candidacyDescription = 'Limited surgical candidacy based on current information'
  }

  // Determine surgical options based on findings
  if (responses.seizureControl === 'current') {
    surgicalOptions = []
  } else {
    // Resective surgery options
    if (factors.lesional && factors.focal) {
      if (responses.mriFindings === 'hippocampal-sclerosis') {
        surgicalOptions.push({
          name: 'Temporal Lobectomy',
          description: 'Surgical removal of anterior temporal lobe including sclerotic hippocampus',
          successRate: '60-80%',
          indication: 'Standard treatment for mesial temporal lobe epilepsy with hippocampal sclerosis',
          considerations: 'May affect memory (especially verbal memory with dominant hemisphere)'
        })
      } else if (responses.mriFindings === 'focal-lesion') {
        surgicalOptions.push({
          name: 'Lesionectomy/Focal Cortical Resection',
          description: 'Surgical removal of identified lesion and surrounding epileptogenic tissue',
          successRate: '50-80%',
          indication: 'Well-defined structural lesion with concordant EEG data',
          considerations: 'Success depends on complete resection of epileptogenic zone'
        })
      } else if (responses.mriFindings === 'hemispheric') {
        surgicalOptions.push({
          name: 'Hemispherectomy/Hemispheric Disconnection',
          description: 'Complete functional disconnection or removal of affected hemisphere',
          successRate: '70-85%',
          indication: 'Hemispheric pathology with contralateral hemiparesis',
          considerations: 'Requires careful patient selection; profound but often acceptable deficits'
        })
      }
    }

    // Focal resection for MRI-negative if good localization
    if (factors.focal && factors.localizingData && responses.mriFindings === 'normal') {
      surgicalOptions.push({
        name: 'Focal Cortical Resection (MRI-negative)',
        description: 'Resection based on EEG, PET, SPECT, and/or invasive monitoring data',
        successRate: '40-70%',
        indication: 'MRI-negative epilepsy with concordant non-invasive or invasive data',
        considerations: 'May require invasive monitoring (SEEG or subdural grids) for localization'
      })
    }

    // Laser ablation for deep lesions
    if (factors.lesional && (responses.mriFindings === 'hippocampal-sclerosis' || responses.mriFindings === 'focal-lesion')) {
      surgicalOptions.push({
        name: 'MRI-guided Laser Interstitial Thermal Therapy (LITT)',
        description: 'Minimally invasive thermal ablation of epileptogenic tissue',
        successRate: '50-75%',
        indication: 'Deep-seated lesions, especially mesial temporal structures or small focal cortical lesions',
        considerations: 'Less invasive than open surgery but may have lower efficacy; growing evidence base'
      })
    }

    // Neuromodulation for multifocal or generalized
    if (factors.drugResistant && (focality === 'multifocal' || focality === 'generalized' || !factors.focal)) {
      surgicalOptions.push({
        name: 'Vagus Nerve Stimulation (VNS)',
        description: 'Implanted device that stimulates vagus nerve to reduce seizure frequency',
        successRate: '40-50% responders (≥50% reduction)',
        indication: 'Drug-resistant epilepsy not amenable to resective surgery',
        considerations: 'Palliative therapy; median seizure reduction ~40-50%; improves over time'
      })
    }

    // RNS for well-defined focus not amenable to resection
    if (factors.focal && factors.localizingData && factors.drugResistant) {
      surgicalOptions.push({
        name: 'Responsive Neurostimulation (RNS)',
        description: 'Implanted device that detects and responds to seizure activity with electrical stimulation',
        successRate: '50-75% responders',
        indication: 'Focal epilepsy with 1-2 well-defined foci in eloquent cortex or bilateral independent foci',
        considerations: 'Allows treatment of eloquent cortex; requires clear localization; may be used off-label for pediatric patients'
      })
    }

    // DBS for select cases
    if (factors.drugResistant && (focality === 'generalized' || seizureTypes.includes('tonic') || seizureTypes.includes('atonic'))) {
      surgicalOptions.push({
        name: 'Deep Brain Stimulation (DBS)',
        description: 'Continuous electrical stimulation of deep brain targets (thalamus or other)',
        successRate: '40-70% responders',
        indication: 'Drug-resistant epilepsy, particularly with drop attacks or multifocal/generalized',
        considerations: 'Emerging therapy; anterior nucleus thalamus (ANT) most studied target'
      })
    }

    // RNS for generalized epilepsy (off-label)
    if (factors.drugResistant && focality === 'generalized') {
      surgicalOptions.push({
        name: 'Responsive Neurostimulation (RNS) - Off-Label',
        description: 'Implanted device that detects and responds to seizure activity with electrical stimulation',
        successRate: 'Variable (off-label use)',
        indication: 'Drug-resistant generalized epilepsy when other options are limited',
        considerations: 'Off-label use for generalized epilepsy; limited data but may be considered in select cases'
      })
    }

    // Corpus callosotomy for drop attacks
    if (seizureTypes.includes('atonic') || seizureTypes.includes('tonic')) {
      surgicalOptions.push({
        name: 'Corpus Callosotomy',
        description: 'Division of corpus callosum to prevent seizure spread',
        successRate: '50-80% reduction in drop attacks',
        indication: 'Atonic or tonic seizures with falls; not a cure but prevents bilateral spread',
        considerations: 'Palliative procedure to reduce injury from drop attacks'
      })
    }

    // Always consider neuromodulation as option for drug-resistant epilepsy
    if (factors.drugResistant && surgicalOptions.length === 0) {
      surgicalOptions.push({
        name: 'Vagus Nerve Stimulation (VNS)',
        description: 'Implanted device that stimulates vagus nerve to reduce seizure frequency',
        successRate: '40-50% responders',
        indication: 'Drug-resistant epilepsy without resective options',
        considerations: 'Most accessible neuromodulation option; proven safety and efficacy'
      })
    }
  }

  // Standard next steps if not already included
  if (factors.drugResistant && surgicalOptions.length > 0 && !nextSteps.length) {
    nextSteps.push('Comprehensive evaluation at pediatric epilepsy surgery center')
    nextSteps.push('Multidisciplinary case conference with neurosurgery, neurology, neuropsychology, and neuroradiology')

    if (!factors.lesional || responses.mriFindings === 'normal') {
      nextSteps.push('Consider invasive EEG monitoring (SEEG or subdural grids) for precise localization')
    }

    nextSteps.push('Discuss risks, benefits, and expected outcomes with family')
  }

  // If inadequate workup
  if (nextSteps.length > 0 && !factors.drugResistant) {
    considerations.push('Complete diagnostic workup and establish drug resistance before surgical evaluation')
  }

  return {
    score,
    factors,
    candidacyLevel,
    candidacyDescription,
    considerations,
    surgicalOptions,
    nextSteps
  }
}
