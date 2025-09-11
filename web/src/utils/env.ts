interface EnvConfig {
  END_POINT: string;
  ENVIRONMENT: string;
}

const env: EnvConfig = {
  END_POINT: import.meta.env.VITE_END_POINT,
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
};

export default env;