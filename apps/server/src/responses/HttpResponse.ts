export class HttpResponse<T extends any = any> {
  public status: number = 200

  public data?: T

  public message: String = ''

  constructor(p: { status?: number; data?: T; message?: string }) {
    this.data = p.data
    this.status = p.status ?? 200
    this.message = p.message ?? ''
  }

  toJson() {
    return {
      status: this.status,
      data: this.data,
      message: this.message,
    }
  }
}
