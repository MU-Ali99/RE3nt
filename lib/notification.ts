export interface NotificationProvider { send(input: { recipient:string; kind:string; message:string }): Promise<{ providerId?:string }> }
export class DevelopmentNotificationProvider implements NotificationProvider {
  async send(input: {recipient:string;kind:string;message:string}) { console.info("[development-notification]", input); return {}; }
}
