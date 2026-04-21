export const electionData = {
  en: {
    dashboardStats: {
      totalVoters: "969.2M",
      pollingStations: "1.05M",
      voterTurnout: [
        { year: '2004', turnout: 58.07 },
        { year: '2009', turnout: 58.19 },
        { year: '2014', turnout: 66.44 },
        { year: '2019', turnout: 67.40 },
        { year: '2024', turnout: 66.33 }
      ],
      genderDistribution: [
        { name: 'Male', value: 497.0 },
        { name: 'Female', value: 471.0 },
        { name: 'Third Gender', value: 0.048 }
      ],
      ageGroups: [
        { group: '18-29', percentage: 22 },
        { group: '30-49', percentage: 41 },
        { group: '50-69', percentage: 28 },
        { group: '70+', percentage: 9 }
      ]
    },
    title: "ElectoLearn AI",
    tagline: "Empowering Every Citizen with Knowledge of the World's Largest Democracy",
    process: [
      {
        id: "announcement",
        title: "Announcement",
        description: "The Election Commission of India (ECI) announces the election schedule via a press conference.",
        details: "Immediately upon announcement, the Model Code of Conduct (MCC) comes into force, preventing the ruling government from using official resources for campaigning.",
        action: "Check the official ECI website for your constituency's polling date."
      },
      {
        id: "notification",
        title: "Official Notification",
        description: "Formal notification is issued by the President for Lok Sabha or Governor for State Assemblies.",
        details: "This marks the start of the nomination window (usually 7-8 days).",
        action: "Interested candidates begin preparing their legal affidavits."
      },
      {
        id: "nomination",
        title: "Nomination & Scrutiny",
        description: "Candidates file nomination papers and a security deposit. Returning Officers (RO) then scrutinize documents.",
        details: "Affidavits must disclose assets, criminal records, and education. If any major discrepancy is found, the nomination is rejected.",
        action: "Voters can view these affidavits on the 'Know Your Candidate' (KYC) app."
      },
      {
        id: "campaigning",
        title: "Political Campaigning",
        description: "Parties and candidates appeal to voters through rallies, door-to-door visits, and digital media.",
        details: "Campaigning must stop 48 hours before the end of polling (the 'Silence Period') to allow voters to think calmly.",
        action: "Listen to all candidates fairly to make an informed choice."
      },
      {
        id: "polling",
        title: "Polling Day",
        description: "The main event. Registered voters visit their assigned polling stations to cast their secret ballot.",
        details: "EVMs (Electronic Voting Machines) and VVPATs (Voter Verifiable Paper Audit Trail) are used to ensure accuracy and transparency.",
        action: "Carry your EPIC card or one of the 12 alternative government IDs."
      },
      {
        id: "counting",
        title: "Counting of Votes",
        description: "Standardized counting happens at designated centers under strict security and CCTV surveillance.",
        details: "Party agents are present to oversee every round of counting. VVPAT slips from randomly selected booths are also verified.",
        action: "Watch the results live on official channels or the ECI Results portal."
      },
      {
        id: "certification",
        title: "Certification",
        description: "The ECI issues a certificate of election to the winner and constitutes the new House.",
        details: "The winning candidate is officially declared the Member of Parliament (MP) or Member of Legislative Assembly (MLA).",
        action: "Congratulations! You've participated in the festival of democracy."
      }
    ],
    timeline: [
      {
        year: "1951",
        event: "The First Experiment",
        description: "India's first general election was a massive challenge with 173 million voters, 85% of whom were illiterate.",
        impact: "Proved that democracy could work in a developing nation."
      },
      {
        year: "1977",
        event: "Democracy Restored",
        description: "Elections held after the 21-month Emergency period.",
        impact: "A landmark moment for civil liberties and democratic resilience."
      },
      {
        year: "1991",
        event: "Economic Shifts",
        description: "Elections held during major economic liberalization and the Mandal Commission era.",
        impact: "Transformed the social and economic landscape of the country."
      },
      {
        year: "1998",
        event: "EVM Debut",
        description: "Electronic Voting Machines were used for the first time in select constituencies.",
        impact: "Marked the beginning of the end for the paper ballot era."
      },
      {
        year: "2013",
        event: "NOTA Introduced",
        description: "The Supreme Court mandated the inclusion of 'None of the Above' option.",
        impact: "Empowered voters to express dissatisfaction with candidates."
      },
      {
        year: "2019",
        event: "VVPAT for All",
        description: "First general election where all polling booths used VVPAT machines.",
        impact: "Increased transparency by providing a physical audit trail."
      },
      {
        year: "2024",
        event: "The Billion Milestone",
        description: "Nearly 970 million people registered to vote, making it the largest democratic exercise in history.",
        impact: "Setting a world record for logistics and citizen participation."
      }
    ],
    quiz: [
      {
        question: "What is the minimum age to vote in India?",
        options: ["16 Years", "18 Years", "21 Years", "25 Years"],
        answer: 1,
        explanation: "The 61st Amendment Act (1988) reduced the voting age from 21 to 18 years, effective from March 1989."
      },
      {
        question: "What does VVPAT stand for in the voting process?",
        options: [
          "Voter Verified Paper Account Tool",
          "Voter Verifiable Paper Audit Trail",
          "Visual Voter Paper Action Task",
          "Verified Voting Paper Audit Team"
        ],
        answer: 1,
        explanation: "VVPAT allows a voter to see a slip for 7 seconds indicating which candidate they voted for, before it falls into a sealed box."
      },
      {
        question: "Who was the first Chief Election Commissioner of India?",
        options: ["K.V.K. Sundaram", "Sukumar Sen", "S.P. Sen Verma", "T.N. Seshan"],
        answer: 1,
        explanation: "Sukumar Sen served from 1950 to 1958 and oversaw the first two general elections of independent India."
      },
      {
        question: "How long is the term of a Lok Sabha member?",
        options: ["4 Years", "5 Years", "6 Years", "Permanent"],
        answer: 1,
        explanation: "A Lok Sabha member is elected for a term of 5 years, unless the house is dissolved earlier."
      },
      {
        question: "Which article of the Constitution establishes the Election Commission?",
        options: ["Article 324", "Article 370", "Article 15", "Article 110"],
        answer: 0,
        explanation: "Article 324 provides the ECI with the power of superintendence, direction, and control of elections."
      },
      {
        question: "What is the maximum number of candidates an EVM can support?",
        options: ["16", "32", "64", "Limited only by memory"],
        answer: 2,
        explanation: "A single EVM (M3 model) can support up to 384 candidates by connecting multiple Balloting Units."
      },
      {
        question: "Which chemical is used in the 'Indelible Ink' put on a voter's finger?",
        options: ["Lead Nitrate", "Silver Nitrate", "Copper Sulfate", "Sodium Chloride"],
        answer: 1,
        explanation: "Silver nitrate reacts with the skin to form silver chloride, which is not soluble in water and stays for weeks."
      },
      {
        question: "In which year were EVMs used for the first time in all constituencies of a General Election?",
        options: ["1999", "2004", "2009", "2014"],
        answer: 1,
        explanation: "The 2004 General Election was the first where EVMs were used across all booths in the country."
      },
      {
        question: "What is the security deposit for a candidate contesting Lok Sabha elections?",
        options: ["₹10,000", "₹15,000", "₹25,000", "₹50,000"],
        answer: 2,
        explanation: "General candidates must deposit ₹25,000, while SC/ST candidates deposit ₹12,500."
      }
    ],
    simulator: {
      voter: {
        intro: "Step into the shoes of a voter and experience the polling day journey.",
        phases: [
          {
            id: "id_check",
            title: "Entry & Identity Check",
            text: "You have arrived at the Polling Booth. The First Polling Officer checks your name in the electoral roll and asks for your ID.",
            options: [
              { text: "Show Voter ID (EPIC)", next: "ink_mark", feedback: "Correct! EPIC is the primary document." },
              { text: "Show Aadhaar Card", next: "ink_mark", feedback: "Valid! ECI allows 12 alternative documents including Aadhaar." },
              { text: "I forgot my ID", next: "fail", feedback: "Sorry, you cannot vote without a valid government ID verify." }
            ]
          },
          {
            id: "ink_mark",
            title: "Inking and Registry",
            text: "The Second Polling Officer marks your left forefinger with indelible ink and asks you to sign the register.",
            options: [
              { text: "Sign and get inked", next: "ballot_unit", feedback: "The ink is a mark of pride and prevents double voting." },
              { text: "Refuse ink", next: "fail", feedback: "Voting is not permitted if the voter refuses the application of indelible ink." }
            ]
          },
          {
            id: "ballot_unit",
            title: "Inside the Voting Compartment",
            text: "You are now alone with the EVM and VVPAT. You see the list of candidates and their symbols.",
            options: [
              { text: "Press blue button next to candidate", next: "vvpat_check", feedback: "A red lamp glows, and a long beep is heard." },
              { text: "Press multiple buttons", next: "ballot_unit", feedback: "The EVM only records the first button pressed until reset by the officer." }
            ]
          },
          {
            id: "vvpat_check",
            title: "VVPAT Verification",
            text: "Look at the VVPAT glass window. A slip is visible for 7 seconds.",
            options: [
              { text: "Verify candidate/symbol on slip", next: "success", feedback: "The slip is visible for 7 seconds before falling into the box." }
            ]
          },
          {
            id: "success",
            title: "Successful Voting",
            text: "You have cast your vote successfully! You exit the booth with a marked finger.",
            options: []
          },
          {
            id: "fail",
            title: "Unable to Vote",
            text: "Unfortunately, you couldn't complete the process this time. Remember: No ID = No Vote. Ink Refusal = No Vote.",
            options: [
              { text: "Try Again", next: "id_check" }
            ]
          }
        ]
      }
    },
    learn: {
      basics: {
        title: "Democratic Foundation",
        items: [
          {
            title: "What is a Republic?",
            desc: "India is a Sovereign Socialist Secular Democratic Republic.",
            details: "This means the head of state (President) is elected, not a hereditary monarch."
          },
          {
            title: "The Three Pillars",
            desc: "Legislature, Executive, and Judiciary.",
            details: "Our elections primarily choose the 'Legislature', which then forms the 'Executive'."
          },
          {
            title: "First-Past-The-Post",
            desc: "The electoral system used in India.",
            details: "The candidate with the highest number of votes wins, even if they don't have an absolute majority."
          }
        ]
      },
      tech: {
        title: "Secure Technology",
        items: [
          {
            title: "EVM Security",
            desc: "Standalone machines with no internet connectivity.",
            details: "EVMs cannot be hacked remotely as they have no wireless receivers and use one-time programmable chips."
          },
          {
            title: "How VVPAT Works",
            desc: "The 'Double Check' system for every voter.",
            details: "If there's a dispute, the physical paper slips can be counted to match the electronic results."
          },
          {
            title: "Binary Logic",
            desc: "EVMs use simple binary logic for counting.",
            details: "This prevents complex software errors and ensures high reliability."
          }
        ]
      },
      rights: {
        title: "Voter's Rights",
        items: [
          {
            title: "Right to Secrecy",
            desc: "No one can force you to reveal who you voted for.",
            details: "The voting compartment is designed to ensure no one sees your choice. It's a punishable offense to violate secrecy."
          },
          {
            title: "NOTA (None Of The Above)",
            desc: "The right to register a protest vote.",
            details: "Introduced in 2013, NOTA allows voters to express dissatisfaction with all contesting candidates."
          },
          {
            title: "Tendered Vote",
            desc: "If someone else has already voted in your name.",
            details: "You can still cast a 'Tendered Vote' after providing proof of identity to the Presiding Officer."
          }
        ]
      },
      eci: {
        title: "The Commission",
        items: [
          {
            title: "Independence",
            desc: "ECI is a constitutional body independent of the government.",
            details: "Commissioners have security of tenure similar to Supreme Court judges."
          },
          {
            title: "Powers",
            desc: "Superintendence, direction, and control of elections.",
            details: "ECI can transfer officials and suspend police officers during election duty."
          }
        ]
      }
    }
  },
  hi: {
    dashboardStats: {
      totalVoters: "969.2M",
      pollingStations: "1.05M",
      voterTurnout: [
        { year: '2004', turnout: 58.07 },
        { year: '2009', turnout: 58.19 },
        { year: '2014', turnout: 66.44 },
        { year: '2019', turnout: 67.40 },
        { year: '2024', turnout: 66.33 }
      ],
      genderDistribution: [
        { name: 'पुरुष', value: 497.0 },
        { name: 'महिला', value: 471.0 },
        { name: 'अन्य', value: 0.048 }
      ],
      ageGroups: [
        { group: '18-29', percentage: 22 },
        { group: '30-49', percentage: 41 },
        { group: '50-69', percentage: 28 },
        { group: '70+', percentage: 9 }
      ]
    },
    title: "इलेक्टोलर्न AI",
    tagline: "दुनिया के सबसे बड़े लोकतंत्र के ज्ञान के साथ हर नागरिक को सशक्त बनाना",
    process: [
      {
        id: "announcement",
        title: "घोषणा",
        description: "भारत निर्वाचन आयोग (ECI) एक प्रेस कॉन्फ्रेंस के माध्यम से चुनाव कार्यक्रम की घोषणा करता है।",
        details: "घोषणा के तुरंत बाद, आदर्श चुनाव आचार संहिता (MCC) लागू हो जाती है।",
        action: "अपने निर्वाचन क्षेत्र की मतदान तिथि के लिए आधिकारिक ECI वेबसाइट देखें।"
      },
      {
        id: "notification",
        title: "आधिकारिक अधिसूचना",
        description: "लोकसभा के लिए राष्ट्रपति द्वारा औपचारिक अधिसूचना जारी की जाती है।",
        details: "यह नामांकन अवधि की शुरुआत का प्रतीक है।",
        action: "इच्छुक उम्मीदवार अपने कानूनी शपथ पत्र तैयार करना शुरू करते हैं।"
      },
      {
        id: "nomination",
        title: "नामांकन और जांच",
        description: "उम्मीदवार नामांकन पत्र दाखिल करते हैं। रिटर्निंग ऑफिसर फिर दस्तावेजों की जांच करते हैं।",
        details: "शपथ पत्र में संपत्ति और आपराधिक रिकॉर्ड का खुलासा करना अनिवार्य है।",
        action: "मतदाता 'नो योर कैंडिडेट' (KYC) ऐप पर इन हलफनामों को देख सकते हैं।"
      },
      {
        id: "campaigning",
        title: "चुनाव प्रचार",
        description: "पार्टियां और उम्मीदवार रैलियों के माध्यम से मतदाताओं से अपील करते हैं।",
        details: "मतदान समाप्त होने से 48 घंटे पहले चुनाव प्रचार बंद होना चाहिए।",
        action: "एक सूचित विकल्प चुनने के लिए सभी उम्मीदवारों को निष्पक्ष रूप से सुनें।"
      },
      {
        id: "polling",
        title: "मतदान का दिन",
        description: "मुख्य कार्यक्रम। पंजीकृत मतदाता अपने निर्धारित मतदान केंद्रों पर जाते हैं।",
        details: "सटीकता सुनिश्चित करने के लिए EVM और VVPAT का उपयोग किया जाता है।",
        action: "अपना EPIC कार्ड या अन्य वैध आईडी साथ रखें।"
      },
      {
        id: "counting",
        title: "मतों की गिनती",
        description: "मानकीकृत गिनती कड़ी सुरक्षा में निर्दिष्ट केंद्रों पर होती है।",
        details: "गिनती के हर दौर की निगरानी के लिए पार्टियों के प्रतिनिधि मौजूद रहते हैं।",
        action: "आधिकारिक चैनलों पर लाइव परिणाम देखें।"
      },
      {
        id: "certification",
        title: "प्रमाणन",
        description: "ECI विजेता को चुनाव का प्रमाण पत्र जारी करता है।",
        details: "विजेता उम्मीदवार को आधिकारिक तौर पर सांसद घोषित किया जाता है।",
        action: "बधाई हो! आपने लोकतंत्र के उत्सव में भाग लिया है।"
      }
    ],
    timeline: [
      {
        year: "1951",
        event: "पहला प्रयोग",
        description: "भारत का पहला आम चुनाव एक बड़ी चुनौती था जिसमें 173 मिलियन मतदाता थे।",
        impact: "साबित कर दिया कि लोकतंत्र एक विकासशील देश में काम कर सकता है।"
      },
      {
        year: "1977",
        event: "लोकतंत्र की बहाली",
        description: "आपातकाल के बाद हुए इन चुनावों ने लोकतंत्र को पुनर्जीवित किया।",
        impact: "नागरिक स्वतंत्रता के लिए एक ऐतिहासिक क्षण।"
      },
      {
        year: "1998",
        event: "EVM की शुरुआत",
        description: "पहली बार चुनिंदा निर्वाचन क्षेत्रों में इलेक्ट्रॉनिक वोटिंग मशीनों का उपयोग किया गया।",
        impact: "कागज मतपत्र युग के अंत की शुरुआत।"
      },
      {
        year: "2013",
        event: "नोटा की शुरुआत",
        description: "सुप्रीम कोर्ट ने 'नोटा' विकल्प शामिल करने का आदेश दिया।",
        impact: "उम्मीदवारों से असंतोष व्यक्त करने के लिए मतदाताओं को सशक्त बनाया।"
      },
      {
        year: "2019",
        event: "VVPAT का पूर्ण उपयोग",
        description: "हर मतदान केंद्र पर VVPAT मशीनों का पहली बार पूर्ण उपयोग किया गया।",
        impact: "पारदर्शिता और भरोसे में वृद्धि।"
      },
      {
        year: "2024",
        event: "ऐतिहासिक आंकड़ा",
        description: "लगभग 97 करोड़ पंजीकृत मतदाताओं के साथ दुनिया का सबसे बड़ा चुनाव।",
        impact: "लॉजिस्टिक्स और सहभागिता का एक विश्व रिकॉर्ड।"
      }
    ],
    quiz: [
      {
        question: "भारत में मतदान की न्यूनतम आयु क्या है?",
        options: ["16 वर्ष", "18 वर्ष", "21 वर्ष", "25 वर्ष"],
        answer: 1,
        explanation: "61वें संशोधन अधिनियम (1988) ने मतदान की आयु 21 से घटाकर 18 वर्ष कर दी।"
      },
      {
        question: "EVM के साथ इस्तेमाल होने वाले VVPAT का पूर्ण रूप क्या है?",
        options: [
          "Voter Verified Paper Account Tool",
          "Voter Verifiable Paper Audit Trail",
          "Visual Voter Paper Action Task",
          "Verified Voting Paper Audit Team"
        ],
        answer: 1,
        explanation: "VVPAT एक मतदाता को 7 सेकंड के लिए एक पर्ची देखने की अनुमति देता है।"
      }
    ],
    simulator: {
      voter: {
        intro: "एक मतदाता की भूमिका में कदम रखें और मतदान के दिन की यात्रा का अनुभव करें।",
        phases: [
          {
            id: "id_check",
            title: "प्रवेश और पहचान की जाँच",
            text: "आप मतदान केंद्र पर पहुँच गए हैं। अधिकारी आपकी आईडी मांगते हैं।",
            options: [
              { text: "वोटर आईडी (EPIC) दिखाएं", next: "ink_mark", feedback: "सही! EPIC प्राथमिक दस्तावेज है।" },
              { text: "आधार कार्ड दिखाएं", next: "ink_mark", feedback: "मान्य! आधार भी एक स्वीकार्य दस्तावेज है।" },
              { text: "मैं आईडी भूल गया", next: "fail", feedback: "बिना आईडी के मतदान संभव नहीं है।" }
            ]
          },
          {
            id: "ink_mark",
            title: "स्याही और पंजीकरण",
            text: "अधिकारी आपकी उंगली पर अमिट स्याही लगाते हैं।",
            options: [
              { text: "हस्ताक्षर करें और स्याही लगवाएं", next: "ballot_unit", feedback: "यह आपकी लोकतांत्रिक भागीदारी का निशान है।" },
              { text: "स्याही से मना करें", next: "fail", feedback: "स्याही लगवाना अनिवार्य है।" }
            ]
          },
          {
            id: "ballot_unit",
            title: "वोटिंग कंपार्टमेंट के अंदर",
            text: "आप EVM के पास हैं। अपना पसंदीदा उम्मीदवार चुनें।",
            options: [
              { text: "नीला बटन दबाएं", next: "vvpat_check", feedback: "बीप की आवाज सुनाई देती है।" }
            ]
          },
          {
            id: "vvpat_check",
            title: "VVPAT सत्यापन",
            text: "VVPAT स्क्रीन पर पर्ची देखें।",
            options: [
              { text: "सत्यापित करें", next: "success", feedback: "वोट दर्ज हो गया है।" }
            ]
          }
        ]
      }
    },
    learn: {
      basics: {
        title: "लोकतांत्रिक नींव",
        items: [
          {
            title: "गणराज्य क्या है?",
            desc: "वह देश जहाँ राष्ट्र प्रमुख निर्वाचित होता है।",
            details: "भारत का राष्ट्रपति निर्वाचित होता है, इसलिए भारत एक गणराज्य है।"
          },
          {
            title: "तीन स्तंभ",
            desc: "विधायिका, कार्यपालिका और न्यायपालिका।",
            details: "चुनावों के माध्यम से हम विधायिका को चुनते हैं।"
          }
        ]
      },
      tech: {
        title: "सुरक्षित तकनीक",
        items: [
          {
            title: "EVM सुरक्षा",
            desc: "ये मशीनें इंटरनेट से नहीं जुड़ी होतीं।",
            details: "इन्हें हैक नहीं किया जा सकता क्योंकि इनमें कोई वायरलेस संचार नहीं होता।"
          }
        ]
      }
    }
  }
};
