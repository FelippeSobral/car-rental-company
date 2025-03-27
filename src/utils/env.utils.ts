export const getEnv = (key: string, defaultValue: string): string => {
    const value = process.env[key];
    if (value === undefined) {
      if (process.env.NODE_ENV !== 'test') {
        console.warn(`Variável de ambiente ${key} não definida. Usando padrão: ${defaultValue}`);
      }
      return defaultValue;
    }
    return value;
  };
  
  // Versão com tipagem forte para valores específicos
  export const getEnvNumber = (key: string, defaultValue: number): number => {
    const value = getEnv(key, defaultValue.toString());
    return parseInt(value, 10);
  };
  
  export const getEnvBoolean = (key: string, defaultValue: boolean): boolean => {
    const value = getEnv(key, defaultValue.toString());
    return value === 'true';
  };