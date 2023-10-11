export interface BaseBoltData {
  title: string;
  url: string;
  text?: string;
  icon: string;
  dateAdded?: string;
}

export interface RewriteCardData extends BaseBoltData {
  dataType: "rewrite";
  writingStyle: WritingStyle;
  lengthOption: LengthOption;
  preexistingKnowledge?: PreexistingKnowledge;
}

export interface FlashCard {
  term: string;
  definition: string;
}

export interface FlashCardData extends BaseBoltData {
  dataType: "flashcard";
  flashCards: FlashCard[];
  id?: string;
}

export interface RealityCheckCardData extends BaseBoltData {
  dataType: "realitycheck";
  "Logical Fallacies": string[];
  "Biased Statements": string[];
  "Unsupported Arguments": string[];
  "Questions for Further Exploration": string[];
}

export interface BoltUserPrefs {
  password: string;
}

export interface FlashCardProgress {
  cardIndex: number;
  passed: boolean;
}

export interface FlashCardTestProgressData {
  flashCardGroupIndex: number;
  currentFlashCardIndex: number;
  flashCardProgress: FlashCardProgress[];
}

export interface WritingStyle {
  text: string;
}
export interface LengthOption {
  text: string;
}
export interface PreexistingKnowledge {
  text: string;
}
