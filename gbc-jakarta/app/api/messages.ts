/**
 * Bilingual API messages.
 * API routes read the Accept-Language header and return the appropriate language.
 */

export type ApiLang = "en" | "id"

export function getLang(request: Request): ApiLang {
  const header = request.headers.get("accept-language") ?? ""
  return header.toLowerCase().startsWith("id") ? "id" : "en"
}

const msg = {
  en: {
    // Generic
    invalidId: "Invalid company ID",
    invalidJson: "Invalid JSON body",
    serverError: "An unexpected error occurred. Please try again.",

    // Company validation
    nameRequired: "Company name is required",
    categoryRequired: "Category is required",
    invalidStartDate: "Invalid start_date format",
    invalidEndDate: "Invalid end_date format",
    startAfterEnd: "start_date cannot be later than end_date",
    companyNotFound: "Company not found",

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
    photoUploadFailed: (name: string, detail: string) =>
      `${name}: Upload failed — ${detail}`,
    photoDbError: (name: string, detail: string) =>
      `${name}: Database error — ${detail}`,
    photoIdRequired: "photoId is required",
    photoDeleteSuccess: "Photo deleted successfully",

    // Brochure
    noBrochureProvided: "No file provided",
    brochureMustBePdf: "File must be in PDF format",
    brochureTooLarge: "PDF file size must not exceed 20 MB",
    brochureUploadSuccess: "Brochure uploaded successfully",
    brochureDeleteSuccess: "Brochure deleted successfully",

    // Company CRUD
    companyCreateSuccess: "Company created successfully",
    companyUpdateSuccess: "Company updated successfully",
    companyDeleteSuccess: "Company deleted successfully",

    // Category CRUD
    categoryNameRequired: "Category name is required",
    categoryAlreadyExists: "A category with this name already exists",
    categoryCreateSuccess: "Category created successfully",
    categoryUpdateSuccess: "Category updated successfully",
    categoryDeleteSuccess: "Category deleted successfully",
  },

  id: {
    // Generic
    invalidId: "ID perusahaan tidak valid",
    invalidJson: "Format JSON tidak valid",
    serverError: "Terjadi kesalahan. Silakan coba lagi.",

    // Company validation
    nameRequired: "Nama perusahaan wajib diisi",
    categoryRequired: "Kategori wajib diisi",
    invalidStartDate: "Format start_date tidak valid",
    invalidEndDate: "Format end_date tidak valid",
    startAfterEnd: "start_date tidak boleh lebih besar dari end_date",
    companyNotFound: "Perusahaan tidak ditemukan",

    // Logo
    noLogoProvided: "Logo tidak ditemukan",
    logoMustBePng: "Logo harus berformat PNG",
    logoTooLarge: "Ukuran logo maksimal 10 MB",
    logoUploadSuccess: "Logo berhasil diupload",
    logoDeleteSuccess: "Logo berhasil dihapus",

    // Photos
    noPhotosProvided: "Tidak ada foto yang dikirim",
    photoNotImage: (name: string) => `${name}: File bukan gambar`,
    photoTooLarge: (name: string) => `${name}: Ukuran file melebihi 10 MB`,
    photoUploadFailed: (name: string, detail: string) =>
      `${name}: Upload gagal — ${detail}`,
    photoDbError: (name: string, detail: string) =>
      `${name}: Kesalahan database — ${detail}`,
    photoIdRequired: "photoId wajib disertakan",
    photoDeleteSuccess: "Foto berhasil dihapus",

    // Brochure
    noBrochureProvided: "File tidak ditemukan",
    brochureMustBePdf: "File harus berformat PDF",
    brochureTooLarge: "Ukuran file PDF maksimal 20 MB",
    brochureUploadSuccess: "Brosur berhasil diupload",
    brochureDeleteSuccess: "Brosur berhasil dihapus",

    // Company CRUD
    companyCreateSuccess: "Perusahaan berhasil dibuat",
    companyUpdateSuccess: "Perusahaan berhasil diperbarui",
    companyDeleteSuccess: "Perusahaan berhasil dihapus",

    // Category CRUD
    categoryNameRequired: "Nama kategori wajib diisi",
    categoryAlreadyExists: "Kategori dengan nama ini sudah ada",
    categoryCreateSuccess: "Kategori berhasil dibuat",
    categoryUpdateSuccess: "Kategori berhasil diperbarui",
    categoryDeleteSuccess: "Kategori berhasil dihapus",
  },
} as const

export function getMsg(lang: ApiLang) {
  return msg[lang]
}
