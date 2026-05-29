/**
 * API response messages (English only — admin panel).
 */

export const msg = {
  // Generic
  invalidId: "Invalid partner ID",
  invalidJson: "Invalid JSON body",
  serverError: "An unexpected error occurred. Please try again.",

  // Partner validation
  nameRequired: "Partner name is required",
  partnerRequired: "Partner is required",
  invalidStartDate: "Invalid start_date format",
  invalidEndDate: "Invalid end_date format",
  startAfterEnd: "start_date cannot be later than end_date",
  partnerNotFound: "Partner not found",

  // Logo
  noLogoProvided: "No logo provided",
  logoMustBePng: "Logo must be in PNG format",
  logoTooLarge: "Logo file size must not exceed 10 MB",
  logoUploadSuccess: "Logo uploaded successfully",
  logoDeleteSuccess: "Logo deleted successfully",

  // Photos
  noPhotosProvided: "No photos provided",
  photoNotImage: (name: string) => `${name}: File is not an image`,
  photoTooLarge: (name: string) => `${name}: File size exceeds 10 MB`,
  photoUploadFailed: (name: string, detail: string) => `${name}: Upload failed — ${detail}`,
  photoDbError: (name: string, detail: string) => `${name}: Database error — ${detail}`,
  photoIdRequired: "photoId is required",
  photoDeleteSuccess: "Photo deleted successfully",

  // Brochure
  noBrochureProvided: "No file provided",
  brochureMustBePdf: "File must be in PDF format",
  brochureTooLarge: "PDF file size must not exceed 20 MB",
  brochureUploadSuccess: "Brochure uploaded successfully",
  brochureDeleteSuccess: "Brochure deleted successfully",

  // Company CRUD
  partnerCreateSuccess: "Partner created successfully",
  partnerUpdateSuccess: "Partner updated successfully",
  partnerDeleteSuccess: "Partner deleted successfully",

  // Category CRUD
  categoryNameRequired: "Category name is required",
  categoryAlreadyExists: "A category with this name already exists",
  categoryCreateSuccess: "Category created successfully",
  categoryUpdateSuccess: "Category updated successfully",
  categoryDeleteSuccess: "Category deleted successfully",

  // Event validation
  eventTitleRequired: "Event title is required",
  eventLocationRequired: "Event location is required",
  eventVenueRequired: "Event venue is required",
  eventDescriptionRequired: "Event description is required",
  eventStatusRequired: "Event status is required",
  eventNotFound: "Event not found",

  // Event CRUD
  eventCreateSuccess: "Event created successfully",
  eventUpdateSuccess: "Event updated successfully",
  eventDeleteSuccess: "Event deleted successfully",

  // Event photos
  eventPhotoDeleteSuccess: "Event photo deleted successfully",
} as const
