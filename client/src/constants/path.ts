import icons from './icons.js';

export const SUBJECT_PATHS = [
  {
    id: '1ap',
    subject: 'Anatomy/Physiology',
    re: 'Anatomy & Physiology',
    description: 'Master the Anatomy & Physiology subject essential in nursing',
    chapters: [
      {
        id: 1,
        title: 'An Introduction to the Human Body',
        attribution:
          'https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction',
        icon: icons.human,
        totalNodes: 10,
        completedNodes: 0,
        isCompleted: false,
        subChapters: [
          // {
          //   id: '-1',
          //   sub: '1.0',
          //   title: '',
          //   objectives: [],
          //   figures: [
          //     {
          //       id: '1.2a',
          //       caption: 'Gross and Microscopic Anatomy',
          //       description: 'Photo A shows an entire human brain...',
          //       image: '',
          //     },
          //   ],
          //   paragraph: [],
          // },
          {
            id: '0',
            sub: '1.0',
            title: 'Introduction',
            objectives: [
              'Distinguish between anatomy and physiology, and identify several branches of each',
              'Describe the structure of the body, from simplest to most complex, in terms of the six levels of organization',
              'Identify the functional characteristics of human life',
              'Identify the four requirements for human survival',
              'Define homeostasis and explain its importance to normal human functioning',
              'Use appropriate anatomical terminology to identify key body structures, body regions, and directions in the body',
              'Compare and contrast at least four medical imaging techniques in terms of their function and use in medicine',
            ],
            paragraph: [
              {
                title: null,
                text: `Though you may approach a course in anatomy and physiology strictly as a requirement for your field of study, the knowledge you gain in this course will serve you well in many aspects of your life. An understanding of anatomy and physiology is not only fundamental to any career in the health professions, but it can also benefit your own health. Familiarity with the human body can help you make healthful choices and prompt you to take appropriate action when signs of illness arise. Your knowledge in this field will help you understand news about nutrition, medications, medical devices, and procedures and help you understand genetic or infectious diseases. At some point, everyone will have a problem with some aspect of their body and your knowledge can help you to be a better parent, spouse, partner, friend, colleague, or caregiver.
        
        This chapter begins with an overview of anatomy and physiology and a preview of the body regions and functions. It then covers the characteristics of life and how the body works to maintain stable conditions. It introduces a set of standard terms for body structures and for planes and positions in the body that will serve as a foundation for more comprehensive information covered later in the text. It ends with examples of medical imaging used to see inside the living body.`,
                figure: null,
              },
            ],
          },
          {
            id: '1',
            sub: '1.1',
            title: 'Overview of Anatomy & Physiology',
            objectives: [
              'Compare and contrast anatomy and physiology, including their specializations and methods of study',
              'Discuss the fundamental relationship between anatomy and physiology',
            ],
            figures: [
              {
                id: '1.2a',
                caption: 'Gross and Microscopic Anatomy',
                description:
                  'Gross anatomy considers large structures such as the brain.',
                image: '',
              },
              {
                id: '1.2b',
                caption: 'Microscopic Anatomy',
                description:
                  'Microscopic anatomy can deal with the same structures, though at a different scale.',
                image: '',
              },
            ],
            paragraph: [
              {
                title: null,
                text: `Human anatomy is the scientific study of the body’s structures. Some of these structures are very small and can only be observed and analyzed with the assistance of a microscope. Other larger structures can readily be seen, manipulated, measured, and weighed. The word “anatomy” comes from a Greek root that means “to cut apart.” Human anatomy was first studied by observing the exterior of the body and observing the wounds of soldiers and other injuries. Later, physicians were allowed to dissect bodies of the dead to augment their knowledge. When a body is dissected, its structures are cut apart in order to observe their physical attributes and their relationships to one another. Dissection is still used in medical schools, anatomy courses, and in pathology labs. In order to observe structures in living people, however, a number of imaging techniques have been developed. These techniques allow clinicians to visualize structures inside the living body such as a cancerous tumor or a fractured bone.
        
        Like most scientific disciplines, anatomy has areas of specialization. Gross anatomy is the study of the larger structures of the body, those visible without the aid of magnification (Figure 1.2 a). Macro- means “large,” thus, gross anatomy is also referred to as macroscopic anatomy. In contrast, micro- means “small,” and microscopic anatomy is the study of structures that can be observed only with the use of a microscope or other magnification devices (Figure 1.2 b). Microscopic anatomy includes cytology, the study of cells and histology, the study of tissues. As the technology of microscopes has advanced, anatomists have been able to observe smaller and smaller structures of the body, from slices of large structures like the heart, to the three-dimensional structures of large molecules in the body.`,
                sub: [],
                figure: null,
              },
              {
                title: null,
                text: null,
                sub: [],
                figure: '1.2a',
              },
              {
                title: null,
                text: null,
                sub: [],
                figure: '1.2b',
              },
              {
                title: null,
                text: `Anatomists take two general approaches to the study of the body’s structures: regional and systemic. Regional anatomy is the study of the interrelationships of all of the structures in a specific body region, such as the abdomen. Studying regional anatomy helps us appreciate the interrelationships of body structures, such as how muscles, nerves, blood vessels, and other structures work together to serve a particular body region. In contrast, systemic anatomy is the study of the structures that make up a discrete body system—that is, a group of structures that work together to perform a unique body function. For example, a systemic anatomical study of the muscular system would consider all of the skeletal muscles of the body.
        
        Whereas anatomy is about structure, physiology is about function. Human physiology is the scientific study of the chemistry and physics of the structures of the body and the ways in which they work together to support the functions of life. Much of the study of physiology centers on the body’s tendency toward homeostasis. Homeostasis is the state of steady internal conditions maintained by living things. The study of physiology certainly includes observation, both with the naked eye and with microscopes, as well as manipulations and measurements. However, current advances in physiology usually depend on carefully designed laboratory experiments that reveal the functions of the many structures and chemical compounds that make up the human body.
        
        Like anatomists, physiologists typically specialize in a particular branch of physiology. For example, neurophysiology is the study of the brain, spinal cord, and nerves and how these work together to perform functions as complex and diverse as vision, movement, and thinking. Physiologists may work from the organ level (exploring, for example, what different parts of the brain do) to the molecular level (such as exploring how an electrochemical signal travels along nerves).
        
        Form is closely related to function in all living things. For example, the thin flap of your eyelid can snap down to clear away dust particles and almost instantaneously slide back up to allow you to see again. At the microscopic level, the arrangement and function of the nerves and muscles that serve the eyelid allow for its quick action and retreat. At a smaller level of analysis, the function of these nerves and muscles likewise relies on the interactions of specific molecules and ions. Even the three-dimensional structure of certain molecules is essential to their function.
        
        Your study of anatomy and physiology will make more sense if you continually relate the form of the structures you are studying to their function. In fact, it can be somewhat frustrating to attempt to study anatomy without an understanding of the physiology that a body structure supports. Imagine, for example, trying to appreciate the unique arrangement of the bones of the human hand if you had no conception of the function of the hand. Fortunately, your understanding of how the human hand manipulates tools—from pens to cell phones—helps you appreciate the unique alignment of the thumb in opposition to the four fingers, making your hand a structure that allows you to pinch and grasp objects and type text messages.`,
                sub: [],
                figure: null,
              },
            ],
          },
          {
            id: '2',
            sub: '1.2',
            title: 'Structural Organization of the Human Body',
            objectives: [
              'Describe the structure of the human body in terms of six levels of organization',
              'List the eleven organ systems of the human body and identify at least one organ and one major function of each',
            ],
            figures: [
              {
                id: '1.3',
                caption: 'Levels of Structural Organization of the Human Body',
                description:
                  'The organization of the body often is discussed in terms of six distinct levels of increasing complexity, from the smallest chemical building blocks to a unique human organism.',
                image: '',
              },
              {
                id: '1.4',
                caption: 'Organ Systems of the Human Body',
                description:
                  'Organs that work together are grouped into organ systems.',
                image: '',
              },
              {
                id: '1.5',
                caption: 'Organ Systems of the Human Body (continued)',
                description:
                  'Organs that work together are grouped into organ systems.',
                image: '',
              },
            ],
            paragraph: [
              {
                title: null,
                text: 'Before you begin to study the different structures and functions of the human body, it is helpful to consider its basic architecture; that is, how its smallest parts are assembled into larger structures. It is convenient to consider the structures of the body in terms of fundamental levels of organization that increase in complexity: subatomic particles, atoms, molecules, organelles, cells, tissues, organs, organ systems, organisms and biosphere (Figure 1.3).',
                sub: [],
                figure: null,
              },
              {
                title: null,
                text: null,
                sub: [],
                figure: '1.3',
              },
              {
                title: 'The Levels of Organization',
                text: `To study the chemical level of organization, scientists consider the simplest building blocks of matter: subatomic particles, atoms and molecules. All matter in the universe is composed of one or more unique pure substances called elements, familiar examples of which are hydrogen, oxygen, carbon, nitrogen, calcium, and iron. The smallest unit of any of these pure substances (elements) is an atom. Atoms are made up of subatomic particles such as the proton, electron and neutron. Two or more atoms combine to form a molecule, such as the water molecules, proteins, and sugars found in living things. Molecules are the chemical building blocks of all body structures.
        
        A cell is the smallest independently functioning unit of a living organism. Even bacteria, which are extremely small, independently-living organisms, have a cellular structure. Each bacterium is a single cell. All living structures of human anatomy contain cells, and almost all functions of human physiology are performed in cells or are initiated by cells.
        
        A human cell typically consists of flexible membranes that enclose cytoplasm, a water-based cellular fluid together with a variety of tiny functioning units called organelles. In humans, as in all organisms, cells perform all functions of life. A tissue is a group of many similar cells (though sometimes composed of a few related types) that work together to perform a specific function. An organ is an anatomically distinct structure of the body composed of two or more tissue types. Each organ performs one or more specific physiological functions. An organ system is a group of organs that work together to perform major functions or meet physiological needs of the body.
        
        This book covers eleven distinct organ systems in the human body (Figure 1.4 and Figure 1.5). Assigning organs to organ systems can be imprecise since organs that “belong” to one system can also have functions integral to another system. In fact, most organs contribute to more than one system.
        
        In this book and throughout your studies of biological sciences, you will often read descriptions related to similarities and differences among biological structures, processes, and health related to a person's biological sex. People often use the words "female" and "male" to describe two different concepts: our sense of gender identity, and our biological sex as determined by our chromosomes, hormones, organs, and other physical characteristics. For some people, gender identity is different from biological sex or their sex assigned at birth. Throughout this book, "female" and "male" refer to sex only, and the typical anatomy and physiology of XX and XY individuals is discussed.`,
                sub: [],
                figure: null,
              },
              {
                title: null,
                text: null,
                sub: [],
                figure: '1.4',
              },
              {
                title: null,
                text: null,
                sub: [],
                figure: '1.5',
              },
              {
                title: null,
                text: 'The organism level is the highest level of organization. An organism is a living being that has a cellular structure and that can independently perform all physiologic functions necessary for life. In multicellular organisms, including humans, all cells, tissues, organs, and organ systems of the body work together to maintain the life and health of the organism.',
                sub: [],
                figure: null,
              },
            ],
          },
          {
            id: '3',
            sub: '1.3',
            title: 'Functions of Human LIfe',
            objectives: [
              'Explain the importance of organization to the function of the human organism',
              'Distinguish between metabolism, anabolism, and catabolism',
              'Provide at least two examples of human responsiveness and human movement',
              'Compare and contrast growth, differentiation, and reproduction',
            ],
            figures: [
              {
                id: '1.6',
                caption: 'Metabolism ',
                description:
                  'Anabolic reactions are building reactions, and they consume energy. Catabolic reactions break materials down and release energy. Metabolism includes both anabolic and catabolic reactions.',
                image: '',
              },
              {
                id: '1.7',
                caption: 'Marathon Runners ',
                description:
                  'Runners demonstrate two characteristics of living humans—responsiveness and movement. Anatomic structures and physiological processes allow runners to coordinate the action of muscle groups and sweat in response to rising internal body temperature. (credit: Phil Roeder/flickr)',
                image: '',
              },
            ],
            paragraph: [
              {
                title: null,
                text: 'The different organ systems each have different functions and therefore unique roles to perform in physiology. These many functions can be summarized in terms of a few that we might consider definitive of human life: organization, metabolism, responsiveness, movement, development, and reproduction.',
                sub: [],
                figure: null,
              },
              {
                title: 'Organization',
                text: `A human body consists of trillions of cells organized in a way that maintains distinct internal compartments. These compartments keep body cells separated from external environmental threats and keep the cells moist and nourished. They also separate internal body fluids from the countless microorganisms that grow on body surfaces, including the lining of certain passageways that connect to the outer surface of the body. The intestinal tract, for example, is home to more bacterial cells than the total of all human cells in the body, yet these bacteria are outside the body and cannot be allowed to circulate freely inside the body.
            
            Cells, for example, have a cell membrane (also referred to as the plasma membrane) that keeps the intracellular environment—the fluids and organelles—separate from the extracellular environment. Blood vessels keep blood inside a closed circulatory system, and nerves and muscles are wrapped in connective tissue sheaths that separate them from surrounding structures. In the chest and abdomen, a variety of internal membranes keep major organs such as the lungs, heart, and kidneys separate from others.
            
            The body’s largest organ system is the integumentary system, which includes the skin and its associated structures, such as hair and nails. The surface tissue of skin is a barrier that protects internal structures and fluids from potentially harmful microorganisms and other toxins.`,
                sub: [],
                figure: null,
              },
              {
                title: 'Metabolism',
                text: `The first law of thermodynamics holds that energy can neither be created nor destroyed—it can only change form. Your basic function as an organism is to consume (ingest) energy and molecules in the foods you eat, convert some of it into fuel for movement, sustain your body functions, and build and maintain your body structures. There are two types of reactions that accomplish this: anabolism and catabolism.`,
                sub: [
                  {
                    title: 'Anabolism',
                    text: `is the process whereby smaller, simpler molecules are combined into larger, more complex substances. Your body can assemble, by utilizing energy, the complex chemicals it needs by combining small molecules derived from the foods you eat`,
                  },
                  {
                    title: 'Catabolism',
                    text: `is the process by which larger more complex substances are broken down into smaller simpler molecules. Catabolism releases energy. The complex molecules found in foods are broken down so the body can use their parts to assemble the structures and substances needed for life.`,
                  },
                ],
                figure: null,
              },
              {
                title: null,
                text: `Taken together, these two processes are called metabolism. Metabolism is the sum of all anabolic and catabolic reactions that take place in the body (Figure 1.6). Both anabolism and catabolism occur simultaneously and continuously to keep you alive.`,
                sub: [],
                figure: null,
              },
              {
                title: null,
                text: null,
                sub: [],
                figure: '1.6',
              },
              {
                title: null,
                text: `Every cell in your body makes use of a chemical compound, adenosine triphosphate (ATP), to store and release energy. The cell stores energy in the synthesis (anabolism) of ATP, then moves the ATP molecules to the location where energy is needed to fuel cellular activities. Then the ATP is broken down (catabolism) and a controlled amount of energy is released, which is used by the cell to perform a particular job.`,
                sub: [],
                figure: null,
              },
              {
                title: 'Responsiveness',
                text: `Responsiveness is the ability of an organism to adjust to changes in its internal and external environments. An example of responsiveness to external stimuli could include moving toward sources of food and water and away from perceived dangers. Changes in an organism’s internal environment, such as increased body temperature, can cause the responses of sweating and the dilation of blood vessels in the skin in order to decrease body temperature, as shown by the runners in Figure 1.7.`,
                sub: [],
                figure: null,
              },
              {
                title: 'Movement',
                text: `Human movement includes not only actions at the joints of the body, but also the motion of individual organs and even individual cells. As you read these words, red and white blood cells are moving throughout your body, muscle cells are contracting and relaxing to maintain your posture and to focus your vision, and glands are secreting chemicals to regulate body functions. Your body is coordinating the action of entire muscle groups to enable you to move air into and out of your lungs, to push blood throughout your body, and to propel the food you have eaten through your digestive tract. Consciously, of course, you contract your skeletal muscles to move the bones of your skeleton to get from one place to another (as the runners are doing in Figure 1.7), and to carry out all of the activities of your daily life.`,
                sub: [],
                figure: null,
              },
              {
                title: null,
                text: null,
                sub: [],
                figure: '1.7',
              },
              {
                title: 'Development, growth and reproduction',
                text: `Development is all of the changes the body goes through in life. Development includes the process of differentiation, in which unspecialized cells become specialized in structure and function to perform certain tasks in the body. Development also includes the processes of growth and repair, both of which involve cell differentiation.
        
        Growth is the increase in body size. Humans, like all multicellular organisms, grow by increasing the number of existing cells, increasing the amount of non-cellular material around cells (such as mineral deposits in bone), and, within very narrow limits, increasing the size of existing cells.
        
        Reproduction is the formation of a new organism from parent organisms. In humans, reproduction is carried out by the male and female reproductive systems. Because death will come to all complex organisms, without reproduction, the line of organisms would end.`,
                sub: [],
                figure: null,
              },
            ],
          },
        ],
      },
    ],
  },
];
