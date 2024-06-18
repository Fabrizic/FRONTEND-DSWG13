export interface Pregunta {
    numeropregunta: number;
    preguntaid: number;
    testid: number;
    textopregunta: string;
  }
  
  export interface PreguntaServicio {
    data: Pregunta[];
  }