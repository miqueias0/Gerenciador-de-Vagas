import { environment } from 'src/environments/environment';
export const baseUrl = environment.production ? window.location.origin : 'http://localhost:8084/';
