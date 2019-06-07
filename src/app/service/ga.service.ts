import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare let gtag: any; // グローバル変数gtagを解決

@Injectable()
export class GaService {
  sendEvent(arg0: string, arg1: string, arg2: string, arg3: string) {
    throw new Error("Method not implemented.");
  }

  constructor() {}

  /**
   * GAの読み込みをチェック
   */
  private useGA(): boolean {
    return typeof gtag !== undefined;
  }

  /**
   * ページトラッキング
   * @param  {string} url URLのパス。スラッシュで始まる必要がある。
   */
  sendPageView(url: string): void {
    if (!this.useGA()) { return; }
    if (!url.startsWith('/')) { url = /${url}; };
    gtag('config', environment.analytics.id, {
      'page_path': url
    });
  }

  /**
   * イベントトラッキング
   * @param  {string} eventCategory (e.g. 'Video')
   * @param  {string} eventAction (e.g. 'play')
   * @param  {string} eventLabel (e.g. 'play campaign CM')
   */
  sendEvent(eventName: string, eventCategory: string, eventAction: string, eventLabel: any): void {
    if (!this.useGA()) { return; }
    gtag('event', eventName, {
      event_category: eventCategory,
      event_action: eventAction,
      event_label: eventLabel
    });
  }
}