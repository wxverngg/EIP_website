/**
 * Módulo de reseñas de Google Business Profile para EIP & Associates
 * Re-exporta la utilidad oficial server-side de Google Places API.
 * NO contiene testimonios ficticios ni datos hardcodeados.
 */

export {
  getGoogleReviews,
  type GoogleReview,
  type GooglePlacesResponseData,
} from "./google-reviews";
