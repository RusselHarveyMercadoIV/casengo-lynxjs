export const DIAGNOSTIC_QUESTIONS = {
  Freshman: {
    anatomyAndPhysiology: {
      easy: {
        multipleChoices: [
          {
            id: '1',
            question: 'What is the primary function of the respiratory system?',
            choices: {
              a: 'To pump blood',
              b: 'To exchange gases',
              c: 'To digest food',
              d: 'To filter waste',
            },
            answer: 'b',
          },
          {
            id: '2',
            question: 'What is the largest organ in the human body?',
            choices: {
              a: 'Heart',
              b: 'Brain',
              c: 'Skin',
              d: 'Liver',
            },
            answer: 'c',
          },
        ],
        sata: [],
        caseBased: [],
        sequencing: [],
      },
      medium: {
        multipleChoices: [
          {
            id: '3',
            question:
              'Which part of the brain controls balance and coordination?',
            choices: {
              a: 'Cerebrum',
              b: 'Cerebellum',
              c: 'Medulla oblongata',
              d: 'Hypothalamus',
            },
            answer: 'b',
          },
        ],
        sata: [],
        caseBased: [],
        sequencing: [],
      },
      hard: {
        multipleChoices: [
          {
            id: '4',
            question:
              'A patient has difficulty producing speech but can understand language after a stroke. Which area of the brain is likely affected?',
            choices: {
              a: "Broca's area",
              b: "Wernicke's area",
              c: 'Motor cortex',
              d: 'Sensory cortex',
            },
            answer: 'a',
          },
        ],
        sata: [],
        caseBased: [],
        sequencing: [],
      },
    },
    microbiology: {
      easy: {
        multipleChoices: [
          {
            id: '5',
            question: 'What is the shape of bacilli bacteria?',
            choices: {
              a: 'Spherical',
              b: 'Rod-shaped',
              c: 'Spiral',
              d: 'Comma-shaped',
            },
            answer: 'b',
          },
        ],
        sata: [],
        caseBased: [],
        sequencing: [],
      },
      medium: {
        multipleChoices: [
          {
            id: '6',
            question: 'Which of the following is a gram-positive bacterium?',
            choices: {
              a: 'Escherichia coli',
              b: 'Staphylococcus aureus',
              c: 'Pseudomonas aeruginosa',
              d: 'Salmonella typhi',
            },
            answer: 'b',
          },
          {
            id: '7',
            question: 'What type of microorganism is yeast?',
            choices: {
              a: 'Bacteria',
              b: 'Virus',
              c: 'Fungi',
              d: 'Protozoa',
            },
            answer: 'c',
          },
        ],
        sata: [],
        caseBased: [],
        sequencing: [],
      },
      hard: {
        multipleChoices: [],
        sata: [],
        caseBased: [],
        sequencing: [
          {
            id: '8',
            question:
              'Arrange the steps of Gram staining in the correct order:',
            choices: {
              a: 'Counterstain with safranin',
              b: 'Decolorize with alcohol',
              c: 'Stain with crystal violet',
              d: 'Apply iodine',
            },
            answer: ['c', 'd', 'b', 'a'],
          },
        ],
      },
    },
    fundamentalsOfNursing: {
      easy: {
        multipleChoices: [
          {
            id: '9',
            question: 'What is the first step in the nursing process?',
            choices: {
              a: 'Diagnosis',
              b: 'Assessment',
              c: 'Planning',
              d: 'Implementation',
            },
            answer: 'b',
          },
        ],
        sata: [],
        caseBased: [],
        sequencing: [],
      },
      medium: {
        multipleChoices: [],
        sata: [],
        caseBased: [],
        sequencing: [
          {
            id: '10',
            question: 'Arrange the steps of handwashing in the correct order:',
            choices: {
              a: 'Apply soap',
              b: 'Rinse',
              c: 'Wet hands',
              d: 'Lather and scrub',
              e: 'Dry',
            },
            answer: ['c', 'a', 'd', 'b', 'e'],
          },
        ],
      },
      hard: {
        multipleChoices: [],
        sata: [],
        caseBased: [
          {
            id: '11',
            question:
              'A nurse is caring for a patient with dysphagia. Which intervention should the nurse prioritize?',
            choices: {
              a: 'Encourage the patient to drink thin liquids',
              b: 'Position the patient upright during meals',
              c: 'Offer large bites of food',
              d: 'Allow the patient to lie down immediately after eating',
            },
            answer: 'b',
          },
          {
            id: '12',
            question:
              'A nurse is preparing to administer medication via a nasogastric tube. Which action is essential?',
            choices: {
              a: 'Crush the medication finely',
              b: 'Check tube placement',
              c: 'Administer without water',
              d: 'Elevate the foot of the bed',
            },
            answer: 'b',
          },
        ],
        sequencing: [],
      },
    },
    // pharmacology: {
    //   easy: {
    //     multipleChoices: [
    //       {
    //         id: '13',
    //         question:
    //           'What is the term for the study of how drugs affect the body?',
    //         choices: {
    //           a: 'Pharmacokinetics',
    //           b: 'Toxicology',
    //           c: 'Pharmacodynamics',
    //           d: 'Therapeutics',
    //         },
    //         answer: 'c',
    //       },
    //     ],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [],
    //   },
    //   medium: {
    //     multipleChoices: [
    //       {
    //         id: '14',
    //         question:
    //           'Which route of administration involves injection into a muscle?',
    //         choices: {
    //           a: 'Oral',
    //           b: 'Sublingual',
    //           c: 'Rectal',
    //           d: 'Intramuscular',
    //         },
    //         answer: 'd',
    //       },
    //       {
    //         id: '15',
    //         question: 'Which medication is commonly used to reduce fever?',
    //         choices: {
    //           a: 'Penicillin',
    //           b: 'Acetaminophen',
    //           c: 'Insulin',
    //           d: 'Atropine',
    //         },
    //         answer: 'b',
    //       },
    //     ],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [],
    //   },
    //   hard: {
    //     multipleChoices: [],
    //     sata: [],
    //     caseBased: [
    //       {
    //         id: '16',
    //         question:
    //           'A patient is prescribed a medication that requires monitoring of liver function. Which of the following drugs is most likely?',
    //         choices: {
    //           a: 'Acetaminophen',
    //           b: 'Ibuprofen',
    //           c: 'Aspirin',
    //           d: 'Diphenhydramine',
    //         },
    //         answer: 'a',
    //       },
    //     ],
    //     sequencing: [],
    //   },
    // },
    // communityHealthNursing: {
    //   easy: {
    //     multipleChoices: [
    //       {
    //         id: '17',
    //         question: 'What is the primary focus of community health nursing?',
    //         choices: {
    //           a: 'Individual patient care',
    //           b: 'Hospital-based care',
    //           c: 'Population health',
    //           d: 'Surgical interventions',
    //         },
    //         answer: 'c',
    //       },
    //       {
    //         id: '18',
    //         question:
    //           'What is a common method to prevent the spread of infectious diseases?',
    //         choices: {
    //           a: 'Vaccination',
    //           b: 'Surgery',
    //           c: 'Chemotherapy',
    //           d: 'Radiation',
    //         },
    //         answer: 'a',
    //       },
    //     ],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [],
    //   },
    //   medium: {
    //     multipleChoices: [
    //       {
    //         id: '19',
    //         question:
    //           'Which of the following is a core function of public health?',
    //         choices: {
    //           a: 'Diagnosis',
    //           b: 'Treatment',
    //           c: 'Prevention',
    //           d: 'Rehabilitation',
    //         },
    //         answer: 'c',
    //       },
    //     ],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [],
    //   },
    //   hard: {
    //     multipleChoices: [],
    //     sata: [],
    //     caseBased: [
    //       {
    //         id: '20',
    //         question:
    //           'A community nurse identifies an increase in dengue cases in a barangay. What should be the first step?',
    //         choices: {
    //           a: 'Administer vaccines',
    //           b: 'Conduct health education on vector control',
    //           c: 'Isolate affected individuals',
    //           d: 'Prescribe antivirals',
    //         },
    //         answer: 'b',
    //       },
    //     ],
    //     sequencing: [],
    //   },
    // },
    // maternalAndChildHealthNursing: {
    //   easy: {
    //     multipleChoices: [
    //       {
    //         id: '21',
    //         question:
    //           'During which trimester does the fetus develop most of its organs?',
    //         choices: {
    //           a: 'First',
    //           b: 'Second',
    //           c: 'Third',
    //           d: 'All trimesters equally',
    //         },
    //         answer: 'a',
    //       },
    //     ],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [],
    //   },
    //   medium: {
    //     multipleChoices: [],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [
    //       {
    //         id: '22',
    //         question: 'Arrange the stages of labor in the correct order:',
    //         choices: {
    //           a: 'Delivery of the placenta',
    //           b: 'Cervical dilation',
    //           c: 'Expulsion of the fetus',
    //         },
    //         answer: ['b', 'c', 'a'],
    //       },
    //     ],
    //   },
    //   hard: {
    //     multipleChoices: [],
    //     sata: [],
    //     caseBased: [
    //       {
    //         id: '23',
    //         question:
    //           'A postpartum mother reports heavy bleeding and abdominal pain. What should the nurse suspect?',
    //         choices: {
    //           a: 'Normal postpartum changes',
    //           b: 'Uterine atony',
    //           c: 'Perineal tear',
    //           d: 'Breast engorgement',
    //         },
    //         answer: 'b',
    //       },
    //     ],
    //     sequencing: [],
    //   },
    // },
    // medicalSurgicalNursing: {
    //   easy: {
    //     multipleChoices: [
    //       {
    //         id: '23',
    //         question: 'What is the normal range for adult blood pressure?',
    //         choices: {
    //           a: '90/60 to 120/80 mmHg',
    //           b: '120/80 to 140/90 mmHg',
    //           c: '140/90 to 160/100 mmHg',
    //           d: 'Above 160/100 mmHg',
    //         },
    //         answer: 'a',
    //       },
    //     ],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [],
    //   },
    //   medium: {
    //     multipleChoices: [
    //       {
    //         id: '24',
    //         question:
    //           'Which electrolyte is primarily responsible for cardiac muscle contraction?',
    //         choices: {
    //           a: 'Sodium',
    //           b: 'Potassium',
    //           c: 'Calcium',
    //           d: 'Magnesium',
    //         },
    //         answer: 'c',
    //       },
    //     ],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [],
    //   },
    //   hard: {
    //     multipleChoices: [],
    //     sata: [],
    //     caseBased: [
    //       {
    //         id: '25',
    //         question:
    //           'A patient with diabetes presents with fruity breath and rapid breathing. What is the likely diagnosis?',
    //         choices: {
    //           a: 'Hypoglycemia',
    //           b: 'Hyperglycemia',
    //           c: 'Diabetic ketoacidosis',
    //           d: 'Hyperosmolar hyperglycemic state',
    //         },
    //         answer: 'c',
    //       },
    //     ],
    //     sequencing: [],
    //   },
    // },
    // psychiatricNursing: {
    //   easy: {
    //     multipleChoices: [
    //       {
    //         id: '26',
    //         question: 'What is the primary goal of therapeutic communication?',
    //         choices: {
    //           a: 'To provide advice',
    //           b: 'To establish trust and rapport',
    //           c: 'To diagnose mental disorders',
    //           d: 'To prescribe medications',
    //         },
    //         answer: 'b',
    //       },
    //       {
    //         id: '27',
    //         question: 'Which organ is responsible for producing insulin?',
    //         choices: {
    //           a: 'Liver',
    //           b: 'Kidney',
    //           c: 'Spleen',
    //           d: 'Pancreas',
    //         },
    //         answer: 'd',
    //       },
    //     ],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [],
    //   },
    //   medium: {
    //     multipleChoices: [
    //       {
    //         id: '28',
    //         question:
    //           'Which of the following is a positive symptom of schizophrenia?',
    //         choices: {
    //           a: 'Flat affect',
    //           b: 'Hallucinations',
    //           c: 'Social withdrawal',
    //           d: 'Anhedonia',
    //         },
    //         answer: 'b',
    //       },
    //     ],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [],
    //   },
    //   hard: {
    //     multipleChoices: [],
    //     sata: [],
    //     caseBased: [
    //       {
    //         id: '29',
    //         question:
    //           'A patient says, "I feel like I\'m being watched all the time." What type of delusion is this?',
    //         choices: {
    //           a: 'Grandiose',
    //           b: 'Persecutory',
    //           c: 'Somatic',
    //           d: 'Nihilistic',
    //         },
    //         answer: 'b',
    //       },
    //     ],
    //     sequencing: [],
    //   },
    // },
  },
  Sophomore: {},
  Junior: {},
  Senior: {},
  'Recent Graduate': {},
};
