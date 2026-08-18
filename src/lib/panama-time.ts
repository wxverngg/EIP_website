/**
 * Lógica de cálculo y estado en tiempo real para la Hora Oficial de Panamá (UTC-5 / America/Panama).
 * Utilizado para alternar automáticamente entre el Video Día (06:00 AM - 05:59 PM) y Video Noche (06:00 PM - 05:59 AM).
 */

export interface PanamaTimeState {
  isDaytime: boolean;
  formattedTime: string;
  panamaHour: number;
  panamaMinute: number;
  videoTitle: string;
}

/**
 * Obtiene la hora actual en la zona horaria oficial de Panamá (America/Panama).
 */
export function getPanamaTime(): PanamaTimeState {
  const now = new Date();
  
  // Formatear en zona horaria de Panamá
  const panamaDateStr = now.toLocaleString("en-US", {
    timeZone: "America/Panama",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = panamaDateStr.split(":");
  const panamaHour = parseInt(parts[0], 10) || 0;
  const panamaMinute = parseInt(parts[1], 10) || 0;

  // Criterio del cliente:
  // 06:00 AM (06:00) a 05:59 PM (17:59) -> Día (isDaytime = true)
  // 06:00 PM (18:00) a 05:59 AM (05:59) -> Noche (isDaytime = false)
  const isDaytime = panamaHour >= 6 && panamaHour < 18;

  const formattedTime = now.toLocaleTimeString("en-US", {
    timeZone: "America/Panama",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {
    isDaytime,
    formattedTime: `${formattedTime} (EST/Panama)`,
    panamaHour,
    panamaMinute,
    videoTitle: isDaytime ? "VIDEO HERO DEL CLIENTE (MODO DÍA)" : "VIDEO HERO DEL CLIENTE (MODO NOCHE)",
  };
}
