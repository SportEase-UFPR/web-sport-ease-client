export class DetectarMobile {
  static isMobile(): boolean {
    const dispositivos = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return dispositivos.some((dispositivo) => {
      return navigator.userAgent.match(dispositivo);
    });
  }
}
