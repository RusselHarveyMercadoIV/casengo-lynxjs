export const DIAGNOSTIC_QUESTIONS = {
  Freshman: {
    anatomyAndPhysiology: {
      easy: {
        multipleChoices: [
          {
            id: 'sample',
            question:
              'A patient has difficulty producing speech but can understand language after a stroke. Which area of the brain is likely affected?',
            choices: {
              a: "Broca's area",
              b: "Wernicke's area",
              c: 'Motor cortex',
              d: 'Sensory cortex',
            },
            answer: 'a',
            rationale:
              "The patient's difficulty in producing speech while retaining language comprehension suggests damage to Broca's area, which is responsible for speech production.",
            keyPhrases: [
              'Difficulty producing speech',
              'Understands language',
              "Broca's area",
            ],
          },
          {
            id: 'sample2',
            question:
              'A patient has difficulty producing speech but can understand language after a stroke. Which area of the brain is likely affected?',
            choices: {
              a: "Broca's area",
              b: "Wernicke's area",
              c: 'Motor cortex',
              d: 'Sensory cortex',
            },
            answer: 'a',
            rationale:
              "2 The patient's difficulty in producing speech while retaining language comprehension suggests damage to Broca's area, which is responsible for speech production.",
            keyPhrases: [
              'Difficulty producing speech',
              'Understands language',
              "Broca's area",
            ],
          },
        ],
        sata: [],
        caseBased: [],
        sequencing: [],
        fillInTheBlank: [],
      },
      medium: {
        multipleChoices: [],
        sata: [],
        caseBased: [],
        sequencing: [],
        fillInTheBlank: [],
      },
      hard: {
        multipleChoices: [],
        sata: [],
        caseBased: [],
        sequencing: [],
        fillInTheBlank: [],
      },
    },
    // microbiology: {
    //   easy: {
    //     multipleChoices: [
    //       {
    //         id: '1',
    //         question: 'Who is known as the father of microbiology?',
    //         choices: {
    //           a: 'Robert Koch',
    //           b: 'Louis Pasteur',
    //           c: 'Antoni van Leeuwenhoek',
    //           d: 'Robert Hooke',
    //         },
    //         answer: 'b',
    //         rationale:
    //           'Pasteur laid the foundation of microbiology through his work on fermentation, sterilization, and vaccines, earning him this title.',
    //       },
    //       {
    //         id: '2',
    //         question:
    //           'What did Antoni van Leeuwenhoek first describe using his simple microscope?',
    //         choices: {
    //           a: 'Viruses',
    //           b: 'Bacteria',
    //           c: 'Fungi',
    //           d: 'Protozoa',
    //         },
    //         answer: 'b',
    //         rationale:
    //           'In 1683, Leeuwenhoek described various types of bacteria, marking a significant milestone in microbial observation.',
    //       },
    //       {
    //         id: '17',
    //         question: 'What is the primary focus of medical microbiology?',
    //         choices: {
    //           a: 'Study of soil nutrients',
    //           b: 'Study of microorganisms causing diseases in humans',
    //           c: 'Study of industrial fermentation',
    //           d: 'Study of plant growth',
    //         },
    //         answer: 'b',
    //         rationale:
    //           'Medical microbiology, as outlined in the text, focuses on microorganisms relevant to human diseases.',
    //         keyPhrases: ['microorganisms', 'relevant to human diseases'],
    //       },
    //       {
    //         id: '18',
    //         question:
    //           'Which microorganism’s presence in sterilized operating room packages indicates a problem?',
    //         choices: {
    //           a: 'Staphylococcus epidermidis',
    //           b: 'Staphylococcus aureus',
    //           c: 'Escherichia coli',
    //           d: 'Bacillus subtilis',
    //         },
    //         answer: 'd',
    //         rationale:
    //           'The text states that recovering Bacillus subtilis from sterilized packages indicates sterility is not attained.',
    //         keyPhrases: [
    //           'recovering Bacillus subtilis from sterilized packages',
    //           'sterility is not attained',
    //         ],
    //       },
    //     ],
    //     sata: [
    //       {
    //         id: '6',
    //         question:
    //           'Which of the following were known to ancient civilizations?',
    //         choices: {
    //           a: 'Fermentation of wine juice',
    //           b: 'Existence of bacteria',
    //           c: 'Making sour milk',
    //           d: 'Koch’s postulates',
    //         },
    //         answer: ['a', 'c'],
    //         rationale:
    //           'Ancient people used fermentation and made sour milk, but they did not know about bacteria or Koch’s postulates.',
    //       },
    //       {
    //         id: '7',
    //         question:
    //           'Which of the following are contributions of Louis Pasteur?',
    //         choices: {
    //           a: 'Discovery of the tuberculosis bacillus',
    //           b: 'Development of the first vaccine for hydrophobia',
    //           c: 'Observation of bacteria under the microscope',
    //           d: 'Introduction of sterilization techniques',
    //         },
    //         answer: ['b', 'd'],
    //         rationale:
    //           'Pasteur developed the hydrophobia (rabies) vaccine and sterilization methods, but he did not discover the tuberculosis bacillus (Koch did) or first observe bacteria (Leeuwenhoek did).',
    //       },
    //       {
    //         id: '22',
    //         question:
    //           'Which of the following are studied under medical microbiology?',
    //         choices: {
    //           a: 'Bacteriology',
    //           b: 'Food microbiology',
    //           c: 'Virology',
    //           d: 'Soil microbiology',
    //         },
    //         answer: ['a', 'c'],
    //         rationale:
    //           'Medical microbiology studies disease-causing microorganisms in humans. Bacteriology is the study of bacteria, many of which cause human diseases. Virology is the study of viruses, which are also major causes of human diseases. Therefore, both are key areas within medical microbiology. Food and soil microbiology focus on different environments.',
    //         keyPhrases: [
    //           'Medical microbiology studies disease-causing microorganisms in humans',
    //           'Bacteriology is the study of bacteria, many of which cause human diseases',
    //           'Virology is the study of viruses, which are also major causes of human diseases',
    //           'Therefore, both are key areas within medical microbiology. Food and soil microbiology focus on different environments.',
    //         ],
    //       },
    //       {
    //         id: '23',
    //         question:
    //           'Which microorganisms are associated with specific health concerns?',
    //         choices: {
    //           a: 'Bacillus subtilis',
    //           b: 'Staphylococcus epidermidis',
    //           c: 'Staphylococcus aureus',
    //           d: 'Helicobacter pylori',
    //         },
    //         answer: ['a', 'c', 'd'],
    //         rationale:
    //           "Bacillus subtilis indicates sterility issues, S. aureus causes dangerous infections, and H. pylori is linked to gastritis and ulcers. While Staphylococcus epidermidis can cause opportunistic infections, it's normally harmless skin flora and not as specifically associated with defined health concerns in the general population as the others.",
    //         keyPhrases: [
    //           'Bacillus subtilis indicates sterility issues',
    //           'S. aureus causes dangerous infections',
    //           'H. pylori is linked to gastritis and ulcers',
    //           'Staphylococcus epidermidis can cause opportunistic infections normally harmless skin flora not as specifically associated with defined health concerns in the general population as the others',
    //         ],
    //       },
    //     ],
    //     caseBased: [],
    //     sequencing: [
    //       {
    //         id: '11',
    //         question:
    //           'Arrange the following scientists in the order of their contributions:',
    //         choices: {
    //           a: 'Antoni van Leeuwenhoek',
    //           b: 'Louis Pasteur',
    //           c: 'Robert Koch',
    //           d: 'Alexander Fleming',
    //         },
    //         answer: ['a (1683)', 'b (1857)', 'c (1876)', 'd (1925)'],
    //         rationale:
    //           'Leeuwenhoek observed bacteria first, followed by Pasteur’s fermentation work, Koch’s bacteriological advances, and Fleming’s penicillin discovery.',
    //       },
    //     ],
    //     fillInTheBlank: [
    //       {
    //         id: '14',
    //         question:
    //           'The scientist who first observed bacteria using a simple microscope was Leeuwenhoek.',
    //         answer: ['Leeuwenhoek', 'bacteria', 'simple microscope'],
    //         rationale:
    //           'Antoni van Leeuwenhoek (1683) is credited with this pioneering observation.',
    //         keyPhrases: [
    //           'Antoni van Leeuwenhoek',
    //           '1683',
    //           'credited with this pioneering observation',
    //         ],
    //       },
    //     ],
    //   },
    //   medium: {
    //     multipleChoices: [
    //       {
    //         id: '3',
    //         question: 'Which scientist developed the compound microscope?',
    //         choices: {
    //           a: 'Antoni van Leeuwenhoek',
    //           b: 'Louis Pasteur',
    //           c: 'Robert Hook',
    //           d: 'Robert Koch',
    //         },
    //         answer: 'c',
    //         rationale:
    //           'Robert Hook, a contemporary of Leeuwenhoek, developed the compound microscope in 1678, enhancing microbial studies.',
    //       },
    //       {
    //         id: '4',
    //         question: 'What is the primary purpose of Koch’s postulates?',
    //         choices: {
    //           a: 'Identifying the cause of a disease',
    //           b: 'Developing vaccines',
    //           c: 'Sterilizing equipment',
    //           d: 'Observing microorganisms',
    //         },
    //         answer: 'a',
    //         rationale:
    //           'Koch’s postulates provide criteria to establish a causal link between a microbe and a disease.',
    //       },
    //       {
    //         id: '19',
    //         question:
    //           'How does knowledge of microbial genetics assist physicians?',
    //         choices: {
    //           a: 'By determining correct antibiotic dosages and intervals',
    //           b: 'By improving surgical techniques',
    //           c: 'By identifying plant pathogens',
    //           d: 'By enhancing food preservation',
    //         },
    //         answer: 'a',
    //         rationale:
    //           'The text highlights that understanding genetics and microorganism adaptability to chemotherapeutic agents aids in administering antibiotics correctly.',
    //         keyPhrases: [
    //           ' understanding genetics and microorganism adaptability to chemotherapeutic agents',
    //           'administering antibiotics correctly',
    //         ],
    //       },
    //       {
    //         id: '20',
    //         question:
    //           'What distinguishes dangerous Staphylococcus strains from less harmful ones?',
    //         choices: {
    //           a: 'Production of a blue pigment',
    //           b: 'Presence on hospital dust',
    //           c: 'Production of coagulase and a golden yellow pigment',
    //           d: 'Resistance to all antibiotics',
    //         },
    //         answer: 'c',
    //         rationale:
    //           "Staphylococcus aureus, a major cause of dangerous infections, is known for producing coagulase and displaying a golden yellow pigment. These characteristics set it apart from less harmful Staphylococcus species, which typically do not produce coagulase and lack this pigment. Coagulase is a virulence factor that aids in evading the immune system, contributing to the strain's danger, while the pigment helps in identification.",
    //         keyPhrases: [
    //           'these characteristics set it apart from less harmful Staphylococcus species, which typically do not produce coagulase and lack this pigment',
    //           "Coagulase is a virulence factor that aids in evading the immune system, contributing to the strain's danger, while the pigment helps in identification",
    //         ],
    //       },
    //     ],
    //     sata: [
    //       {
    //         id: '8',
    //         question:
    //           'Which scientists contributed to the understanding of infectious diseases before the 19th century?',
    //         choices: {
    //           a: 'Hippocrates',
    //           b: 'Louis Pasteur',
    //           c: 'Robert Koch',
    //           d: 'Fracastorius',
    //         },
    //         answer: ['a', 'd'],
    //         rationale:
    //           'Hippocrates (460-377 BC) and Fracastorius (1546) proposed early ideas about contagious diseases, while Pasteur and Koch worked in the 19th century.',
    //       },
    //       {
    //         id: '9',
    //         question:
    //           'Which of the following techniques or concepts were introduced by Louis Pasteur?',
    //         choices: {
    //           a: 'Sterilization using autoclave',
    //           b: 'Antiseptic surgery',
    //           c: 'Attenuation of anthrax bacilli',
    //           d: 'Staining techniques for bacteria',
    //         },
    //         answer: ['a', 'c'],
    //         rationale:
    //           'Pasteur introduced sterilization (e.g., autoclave) and attenuated anthrax bacilli for vaccines; antiseptic surgery was Lister’s contribution, and staining was Koch’s.',
    //       },
    //       {
    //         id: '24',
    //         question:
    //           'Which of the following are true about learning microbial nomenclature?',
    //         choices: {
    //           a: 'It helps associate organisms with diseases',
    //           b: 'It is useless without understanding name significance',
    //           c: 'It only benefits academic exams',
    //           d: 'It aids in recognizing organism characteristics',
    //         },
    //         answer: ['a', 'b', 'd'],
    //         rationale:
    //           "Options a, b, and d are true because understanding microbial names helps link organisms to the diseases they cause (a), is most effective when the meaning behind the names is understood (b), and provides clues about the organism's characteristics (d). Option c, stating that it only benefits academic exams, is incorrect because learning microbial nomenclature is crucial for clear communication and understanding in various real-world contexts such as scientific research, clinical diagnostics, and treatment protocols. It's a foundational skill for anyone working in microbiology or related fields, not just for passing tests.",
    //         keyPhrases: [
    //           'helps link organisms to the diseases they cause',
    //           'most effective when the meaning behind the names is understood',
    //           "provides clues about the organism's characteristics",
    //           'crucial for clear communication and understanding in various real-world contexts',
    //           'scientific research, clinical diagnostics, and treatment protocols',
    //           'foundational skill for anyone working in microbiology or related fields',
    //           'not just for passing tests',
    //         ],
    //       },
    //       {
    //         id: '25',
    //         question:
    //           'Which Nobel Prize winners contributed to understanding infectious diseases?',
    //         choices: {
    //           a: 'Watson and Crick (1961)',
    //           b: 'Fleming, Florey, and Chain (1945)',
    //           c: 'Koch (1905)',
    //           d: 'Marshal and Warren (2005)',
    //         },
    //         answer: ['b', 'c', 'd'],
    //         rationale:
    //           'Options b, c, and d are Nobel Prize winners who significantly contributed to understanding infectious diseases: Fleming, Florey, and Chain for the discovery of penicillin; Koch for his work on tuberculosis and establishing the germ theory of disease; and Marshall and Warren for their discovery of Helicobacter pylori and its role in ulcers. Option a, Watson and Crick (who received the Nobel Prize in 1962, not 1961 as stated, along with Maurice Wilkins), were awarded for their discovery of the structure of DNA. While their work revolutionized biology, it directly addressed the mechanisms of heredity and molecular biology, not the study or treatment of infectious diseases caused by microorganisms.',
    //         keyPhrases: [
    //           'Fleming, Florey, and Chain for the discovery of penicillin',
    //           'Koch for his work on tuberculosis and establishing the germ theory of disease',
    //           'Marshall and Warren for their discovery of Helicobacter pylori and its role in ulcers',
    //           'Watson and Crick were awarded for their discovery of the structure of DNA',
    //           'directly addressed the mechanisms of heredity and molecular biology, not the study or treatment of infectious diseases',
    //         ],
    //       },
    //     ],
    //     caseBased: [],
    //     sequencing: [
    //       {
    //         id: '12',
    //         question: 'Arrange these events in chronological order:',
    //         choices: {
    //           a: 'Discovery of the spirochaete of syphilis',
    //           b: 'Discovery of penicillin by Fleming',
    //           c: 'Observation of bacteria by Leeuwenhoek',
    //           d: 'Development of the electron microscope by Ruska',
    //         },
    //         answer: ['c (1683)', 'a (1905)', 'b (1925)', 'd (1934)'],
    //         rationale:
    //           'Leeuwenhoek’s observation came first, followed by Schaudin and Hoffman’s syphilis discovery, Fleming’s penicillin, and Ruska’s electron microscope.',
    //       },
    //     ],
    //     fillInTheBlank: [
    //       {
    //         id: '15',
    //         question:
    //           'The process of using carbolic acid spray during surgery to prevent infection was introduced by Lister',
    //         answer: ['Lister', 'carbolic acid spray', 'infection'],
    //         rationale:
    //           'Lord Lister (1854) pioneered antiseptic surgery with carbolic acid.',
    //         keyPhrases: [
    //           'Lord Lister',
    //           '1854',
    //           'pioneered antiseptic surgery with carbolic acid',
    //         ],
    //       },
    //     ],
    //   },
    //   hard: {
    //     multipleChoices: [
    //       {
    //         id: '5',
    //         question:
    //           'Which pair of scientists discovered the spirochaete of syphilis?',
    //         choices: {
    //           a: 'Roux and Yersin',
    //           b: 'Schaudin and Hoffman',
    //           c: 'Loeffler and Frosch',
    //           d: 'Towert and Herelle',
    //         },
    //         answer: 'b',
    //         rationale:
    //           'Schaudin and Hoffman identified the spirochaete (Treponema pallidum) responsible for syphilis, a key discovery in bacteriology.',
    //       },
    //       {
    //         id: '21',
    //         question:
    //           'Which Nobel Prize-winning discovery directly impacted the treatment of AIDS?',
    //         choices: {
    //           a: 'Discovery of penicillin',
    //           b: 'Principles leading to Acyclovir and AZT',
    //           c: 'Structure of DNA',
    //           d: 'Discovery of streptomycin',
    //         },
    //         answer: 'b',
    //         rationale:
    //           'The 1988 Nobel Prize awarded to Elion, Hitchings, and Black for drug development principles included AZT, used to treat AIDS.',
    //         keyPhrases: [
    //           'Elion, Hitchings, and Black for drug development principles included AZT, used to treat AIDS.',
    //         ],
    //       },
    //     ],
    //     sata: [
    //       {
    //         id: '10',
    //         question:
    //           'Which of the following are part of Koch’s original postulates?',
    //         choices: {
    //           a: 'The organism must be present in every case of the disease',
    //           b: 'The organism must be isolated from the diseased host and grown in pure culture',
    //           c: 'The cultured organism should cause the disease when introduced into a healthy animal',
    //           d: 'The organism must be re-isolated from the inoculated, diseased experimental host',
    //           e: 'The organism must be observed in the lesions using a microscope',
    //         },
    //         answer: ['a', 'b', 'c', 'd'],
    //         rationale:
    //           'Koch’s original postulates include these four steps to prove causation; the antibody criterion was added later and is not part of the original set.',
    //       },
    //     ],
    //     caseBased: [],
    //     sequencing: [
    //       {
    //         id: '13',
    //         question:
    //           'Arrange the following discoveries in the order they occurred:',
    //         choices: {
    //           a: 'Description of leprosy bacillus',
    //           b: 'Discovery of gonococcus',
    //           c: 'Isolation of diphtheria bacillus',
    //           d: 'Discovery of diphtheria toxin',
    //         },
    //         answer: [
    //           'a (1874, Hansen)',
    //           'b (1879, Neisser)',
    //           'c (1884, Loeffler)',
    //           'd (1888, Roux and Yersin)',
    //         ],
    //         rationale:
    //           'These discoveries progressed from Hansen’s leprosy bacillus to Roux and Yersin’s diphtheria toxin over the late 19th century.',
    //       },
    //     ],
    //     fillInTheBlank: [
    //       {
    //         id: '16',
    //         question:
    //           'In 1762, Von Plenciz proposed that each disease was caused by a separate agent, laying the groundwork for the germ theory of disease.',
    //         answer: [
    //           '1762',
    //           'Von Plenciz',
    //           'infection',
    //           'germ theory of disease.',
    //         ],
    //         rationale:
    //           'Von Plenciz’s 1762 proposal was an early step toward the germ theory.',
    //         keyPhrases: ['Von Plenciz’s', '1762', 'germ theory'],
    //       },
    //     ],
    //   },
    // },
    // fundamentalsOfNursing: {
    //   easy: {
    //     multipleChoices: [
    //       {
    //         id: '9',
    //         question: 'What is the first step in the nursing process?',
    //         choices: {
    //           a: 'Diagnosis',
    //           b: 'Assessment',
    //           c: 'Planning',
    //           d: 'Implementation',
    //         },
    //         answer: 'b',
    //       },
    //     ],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [],
    //     fillInTheBlank: [],
    //   },
    //   medium: {
    //     multipleChoices: [],
    //     sata: [],
    //     caseBased: [],
    //     sequencing: [
    //       {
    //         id: '10',
    //         question: 'Arrange the steps of handwashing in the correct order:',
    //         choices: {
    //           a: 'Apply soap',
    //           b: 'Rinse',
    //           c: 'Wet hands',
    //           d: 'Lather and scrub',
    //           e: 'Dry',
    //         },
    //         answer: ['c', 'a', 'd', 'b', 'e'],
    //       },
    //     ],
    //     fillInTheBlank: [],
    //   },
    //   hard: {
    //     multipleChoices: [],
    //     sata: [],
    //     caseBased: [
    //       {
    //         id: '11',
    //         question:
    //           'A nurse is caring for a patient with dysphagia. Which intervention should the nurse prioritize?',
    //         choices: {
    //           a: 'Encourage the patient to drink thin liquids',
    //           b: 'Position the patient upright during meals',
    //           c: 'Offer large bites of food',
    //           d: 'Allow the patient to lie down immediately after eating',
    //         },
    //         answer: 'b',
    //       },
    //       {
    //         id: '12',
    //         question:
    //           'A nurse is preparing to administer medication via a nasogastric tube. Which action is essential?',
    //         choices: {
    //           a: 'Crush the medication finely',
    //           b: 'Check tube placement',
    //           c: 'Administer without water',
    //           d: 'Elevate the foot of the bed',
    //         },
    //         answer: 'b',
    //       },
    //     ],
    //     sequencing: [],
    //     fillInTheBlank: [],
    //   },
    // },
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
