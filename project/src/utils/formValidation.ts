import { FormData } from "../types/formTypes";

/**
 * Checks if a given tab is completed based on the form values
 * @param tabId - The ID of the tab to check
 * @param formValues - The current form values
 * @returns A boolean indicating whether the tab is completed
 */
export const checkTabCompletion = (tabId: string, formValues: Partial<FormData>): boolean => {
  switch (tabId) {
    case "tab1": // Personal Details
      return !!(
        formValues.name?.trim() &&
        formValues.gender?.trim() &&
        formValues.dob?.trim() &&
        formValues.dateOfTesting?.trim() &&
        formValues.class?.trim() &&
        formValues.informant?.trim() &&
        formValues.school?.trim()
      );
      
    case "tab2": // Test Information
      return !!(
        formValues.testsadministered?.trim() &&
        formValues.otherTest?.trim() &&
        formValues.readingAge?.toString().trim() &&
        formValues.spellingAge?.toString().trim()
      );
      
    case "tab3": // Verbal Tests
      return !!(
        formValues.information?.toString().trim() &&
        formValues.comprehension?.toString().trim() &&
        formValues.arithmetic?.toString().trim() &&
        formValues.similarities?.toString().trim() &&
        (formValues.vocabulary?.toString().trim() || formValues.digitSpan?.toString().trim())
      );
      
    case "tab4": // Performance Tests
      return !!(
        formValues.pictureCompletion?.toString().trim() &&
        formValues.blockDesign?.toString().trim() &&
        formValues.objectAssembly?.toString().trim() &&
        formValues.coding?.toString().trim() &&
        formValues.mazes?.toString().trim()
      );
      
    case "tab5": // Recommendations
      return !!(
        formValues.summary?.trim() &&
        formValues.recommendation1?.trim() &&
        formValues.recommendation2?.trim() &&
        formValues.recommendation3?.trim()
      );
      
    default:
      return false;
  }
};

/**
 * Validates that either vocabulary or digitSpan is filled, but not both
 * @param vocabulary - The vocabulary value
 * @param digitSpan - The digit span value
 * @returns An error message if validation fails, or null if validation passes
 */
export const validateVocabularyOrDigitSpan = (
  vocabulary: string | undefined,
  digitSpan: string | undefined
): string | null => {
  const hasVocabulary = !!vocabulary?.trim();
  const hasDigitSpan = !!digitSpan?.trim();
  
  if ((hasVocabulary && hasDigitSpan) || (!hasVocabulary && !hasDigitSpan)) {
    return "Please fill either Vocabulary or Digit Span (not both or none)";
  }
  
  return null;
};