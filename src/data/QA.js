const QA = [
  {
    id: 901,
    level: "level1",
    question: "Are you ready to start you first task?",
    case: [],
    answers: ["Yes! Definetely", "It pays the bills i guess..."],
    strike: ["decision1"],
  },
  {
    id: 902,
    level: "level2",
    question: "Artificial Intelligence and legal matters",
    case: [
      "To what extent should AI be allowed to access and quote laws and legislation?",
      "To what extend should the AI pass judgement based on laws and legislation?",
    ],
    answers: [
      "No reproduction of legislation at all, Laws and Legislation should be removed from the dataset entirely.",
      "AI should learn Laws and legislation, but avoid quoting them or passing moral judgement",
      "AI can act as a neutral entity in the lawmaking process and therefore should be freely able to access laws and quote legislation",
    ],
    strike: ["decision0"],
  },
  {
    id: 903,
    level: "level3",
    question: "Artificial Intelligence in the workplace",
    case: [
      "How should AI be regulated in the workplace?",
      "What is the role of workers in the implementation of AI?",
      "Should an AI be able to detect if it is beeing used for financial gain?",
    ],
    answers: [
      "There should be no rules regarding artificial intelligence in the workplace.",
      "AI should self detect if it is beeing used for financial gain. If so, it should inhibit its outputs. However companies are able to introduce them however they like.",
      "AI can only be implemented in companies with active worker representation. Unions and companies have to negotiate individual AI adoption rules.",
      "AI has to be banned from the workplace."
    ],
    strike: ["decision3", "decision1"],
  },
  {
    id: 904,
    level: "level4",
    question: "Artificial Intelligence and the Transparency Paradox",
    case: [
      "Should there be a limit to how transparent AI algorithms are to the public?",
      "What are the risks and benefits of open-sourcing AI algorithms and datasets?",
    ],
    answers: [
      "AI and its datasets should be fully open-sourced, allowing for public scrutiny and accountability.",
      "AI should fully disclose its algorithms and decision-making processes, however the dataset can be kept private",
      "AI should provide some level of explanation for its decisions, but not disclose its full algorithms to protect proprietary technology and prevent misuse.",
      "AI should operate as a 'black box', with no obligation to explain its decision-making, ensuring efficiency and protecting intellectual property.",
    ],
    strike: ["decision0"],
  },

  {
    id: 905,
    level: "level5",
    question: "Artificial Intelligence, Trust, and Output Interpretation",
    case: [
      "In what ways should the output of AI be tailored to foster trust and accurately convey truth?",
      "How can AI demonstrate its reliability and impartiality through its responses?",
      "How does the character of AI influence trust and perceptions of truth?",
      "What is happening with AI and Plagiarims?",
    ],
    answers: [
      "AI should present outputs in a neutral, fact-based manner. It should replicate the data it is given without any interpretation or bias.",//Replication of the bias, allowing to be poisioned
      "AI should include confidence levels or reliability scores in its outputs, giving users a sense of how much trust they can place in the information.", //Bad for companies
      "AI should be programmed to reflect a balanced perspective, representing diverse viewpoints and acknowledging any uncertainties or limitations in its data. ", //Subjective Truth vs Bias
      "AI should offer explanations and citations for its conclusions, allowing users to understand the reasoning behind its outputs and assess their validity.", //Curators Bias
    ],
    strike: ["decision0", "decision1", "decision2", "decision3"],
  },
];

export default QA;
