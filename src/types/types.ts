export interface BaseBoltData {
  title: string;
  url: string;
  text: string;
  icon: string;
  dateAdded?: string;
}

export interface RewriteCardData extends BaseBoltData {
  dataType: "rewrite";
}

export interface FlashCard {
  [key: string]: string;
}

export interface FlashCardData extends BaseBoltData {
  dataType: "flashcard";
  flashCards: FlashCard[];
}

export interface RealityCheckCardData extends BaseBoltData {
  dataType: "realitycheck";
  "Logical Fallacies": string[];
  "Biased Statements": string[];
  "Unsupported Arguments": string[];
  "Questions for Further Exploration": string[];
}
