export interface FormData {
  // Personal Details
  name: string;
  gender: string;
  dob: string;
  age?: number;
  dateOfTesting: string;
  class: string;
  informant: string;
  school: string;
  
  // Test Information
  testsadministered: string;
  otherTest: string;
  readingAge: string;
  spellingAge: string;
  
  // Verbal Tests
  information: string;
  comprehension: string;
  arithmetic: string;
  similarities: string;
  vocabulary: string;
  digitSpan: string;
  
  // Performance Tests
  pictureCompletion: string;
  blockDesign: string;
  objectAssembly: string;
  coding: string;
  mazes: string;
  
  // Recommendations
  summary: string;
  recommendation1: string;
  recommendation2: string;
  recommendation3: string;
}