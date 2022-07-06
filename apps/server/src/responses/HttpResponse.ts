export class HttpResponse<T extends any = any> {
  public status?: number

  public data?: T

  public message: string | string[] = ''

  constructor(p: { status?: number; data?: T; message?: string | string[] }) {
    this.data = p.data
    this.status = p.status ?? (this.data ? 200 : undefined)
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
