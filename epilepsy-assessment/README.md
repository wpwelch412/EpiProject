# Pediatric Epilepsy Surgery Assessment Tool

A comprehensive web application designed to help evaluate potential candidacy for epilepsy surgery in pediatric patients. This tool assesses key clinical factors including seizure characteristics, medication history, diagnostic workup, and patient demographics to provide guidance on surgical candidacy and potential treatment options.

## Features

- **Multi-Step Questionnaire**: Organized assessment across four key domains:
  - Patient Demographics
  - Seizure Characteristics
  - Medication History
  - Diagnostic Workup

- **Intelligent Assessment**: Evidence-based evaluation algorithm that considers:
  - Drug-resistance criteria
  - Seizure focality and localization
  - MRI and EEG findings
  - Quality of life impact
  - Age and developmental factors

- **Comprehensive Results**: Detailed output including:
  - Surgical candidacy level (excellent, good, moderate, fair, limited)
  - Key clinical factors summary
  - Potential surgical options with success rates
  - Recommended next steps
  - Clinical considerations

- **Privacy-Focused**: All data remains client-side - no information is stored or transmitted

- **Professional Output**: Print-friendly results that can be saved or shared with medical teams

## Surgical Options Evaluated

The tool provides information on appropriate surgical interventions based on the patient's profile:

- **Resective Surgery**
  - Temporal lobectomy
  - Lesionectomy/focal cortical resection
  - Hemispherectomy/hemispheric disconnection

- **Minimally Invasive**
  - MRI-guided Laser Interstitial Thermal Therapy (LITT)

- **Neuromodulation**
  - Vagus Nerve Stimulation (VNS)
  - Responsive Neurostimulation (RNS)
  - Deep Brain Stimulation (DBS)

- **Palliative Procedures**
  - Corpus callosotomy

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd epilepsy-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown (typically http://localhost:5173)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory and can be deployed to any static hosting service.

### Deployment

This is a static React application that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static web hosting service

## Usage

1. Click "Begin Assessment" on the welcome screen
2. Complete all four sections of the questionnaire:
   - Answer all required questions (marked with *)
   - Use the Previous/Next buttons to navigate between sections
   - Progress bar shows completion status
3. Review results showing:
   - Surgical candidacy level
   - Key clinical factors
   - Potential surgical options
   - Recommended next steps
4. Print or save results as needed
5. Start a new assessment using the "Start New Assessment" button

## Medical Disclaimer

**IMPORTANT**: This assessment tool is designed for educational and screening purposes only. It does not replace comprehensive medical evaluation by a qualified epilepsy specialist.

- Surgical candidacy requires detailed review by a multidisciplinary epilepsy surgery team
- All treatment decisions should be made in consultation with healthcare professionals
- This tool should not be used as the sole basis for clinical decision-making
- Individual patient circumstances may significantly affect surgical candidacy and outcomes

## Technical Stack

- **React**: UI framework
- **Vite**: Build tool and development server
- **CSS3**: Styling with responsive design
- **JavaScript ES6+**: Application logic

## Project Structure

```
epilepsy-assessment/
├── src/
│   ├── components/
│   │   ├── Questionnaire.jsx      # Multi-step questionnaire component
│   │   ├── Questionnaire.css
│   │   ├── Results.jsx             # Results display component
│   │   └── Results.css
│   ├── utils/
│   │   └── assessment.js           # Assessment logic and scoring
│   ├── App.jsx                     # Main application component
│   ├── App.css
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── dist/                           # Production build output
└── package.json
```

## Customization

### Modifying Questions

Questions are defined in `src/components/Questionnaire.jsx` in the `questions` array. Each question has:
- `id`: Unique identifier
- `category`: Section grouping (demographics, seizures, medications, diagnostics)
- `question`: Question text
- `type`: Input type (radio, checkbox, number)
- `options`: Available choices (for radio/checkbox)
- `required`: Whether answer is mandatory

### Adjusting Assessment Logic

The assessment algorithm is in `src/utils/assessment.js`. The `assessSurgicalCandidacy` function:
- Evaluates responses against clinical criteria
- Calculates a candidacy score
- Determines appropriate surgical options
- Generates clinical considerations and next steps

You can modify scoring weights, add new criteria, or adjust surgical option recommendations here.

### Styling

The application uses CSS with CSS custom properties. Main styles are in:
- `src/App.css`: Welcome screen and global app styles
- `src/components/Questionnaire.css`: Questionnaire styling
- `src/components/Results.css`: Results page styling

Color scheme uses a purple gradient theme that can be modified in the CSS files.

## Contributing

This tool is designed to be adapted for specific clinical programs. Consider the following when customizing:

1. Ensure all modifications are reviewed by qualified medical professionals
2. Maintain appropriate medical disclaimers
3. Keep the assessment logic evidence-based and current with clinical guidelines
4. Test thoroughly before deploying for clinical use
5. Consider HIPAA compliance if adding any data storage features

## Acknowledgments

This tool was developed for use in pediatric epilepsy surgery programs to help educate families and facilitate preliminary screening. It is based on established criteria for epilepsy surgery candidacy but should always be used in conjunction with comprehensive medical evaluation.
